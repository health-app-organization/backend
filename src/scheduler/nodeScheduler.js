const schedule = require("node-schedule");
const User = require("../models/users/userModel");
const Reminder = require("../models/users/reminderModel");
const { Op } = require("sequelize");
const Medicine = require("../models/users/medicineModel");
const { sendNotification } = require('../controllers/notificationController');
const { pushNotification } = require("../services/pushNotification");
const Notification = require("../models/shared/notificationModel");

const scheduleReminder = (reminder) => {
    const date = new Date(reminder.time);

    let payload = {
        title: "Medication Reminder",
        body: `You are supposed to take ${reminder.medicine.dose} of ${reminder.medicine.name} now.`,
        icon: '/images/ason-logo.jpg'
    }



    if (reminder.recurrence === 'daily') {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        schedule.scheduleJob(`*/${minutes} ${hours} * * *`, () => sendNotification('user', reminder.medicine.user.id, payload));

    } else if (reminder.recurrence === 'oneoff') {
        schedule.scheduleJob(date, () => sendNotification('user', reminder.medicine.user.id, payload));
    }
    // console.log(reminder.medicine.dose, reminder.medicine.name, reminder.recurrence, reminder.status, );
};

exports.initializeReminders = async () => {
    const now = new Date();
    const reminders = await Reminder.findAll({
        where: {
            [Op.or]: [
                {
                    [Op.and]: [{
                        status: "ongoing",
                        recurrence: "daily",
                    }]
                },
                {
                    [Op.and]: [{
                        recurrence: "oneoff",
                        time: { [require("sequelize").Op.gte]: now }
                    }]
                }
            ],
        },
        include: [
            {
                model: Medicine,
                as: "medicine",
                attributes: ["name", "dose"],
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "email", "phoneNumber"]
                    }
                ]
            }
        ]
    });

    reminders.forEach(scheduleReminder);
};

exports.addReminders = async (id) => {
    const now = new Date();
    const reminder = await Reminder.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: Medicine,
                as: "medicine",
                attributes: ["name", "dose"],
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "email", "phoneNumber"]
                    }
                ]
            }
        ]
    });

    scheduleReminder(reminder);
};

//module.exports = { scheduleReminder, initializeReminders };


