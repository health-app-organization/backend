const cron = require("node-cron");
const Reminder = require("../models/users/reminderModel");
const Medicine = require("../models/users/medicineModel");
const { sendMail } = require("../services/email.service");

// Function to simulate sending notification
const sendNotification = (reminder) => {
    console.log(
        `🔔 Reminder: It's time to take your medicine '${reminder.medicine.name}' (Dose: ${reminder.medicine.dose}).`
    );
};

// Schedule job: Check for reminders every minute
cron.schedule("* * * * *", async () => {
    console.log("🔍 Checking for due reminders...");
    const now = new Date();

    // Find all reminders where time is due and status is pending
    const dueReminders = await Reminder.findAll({
        where: {
            time: { [require("sequelize").Op.lte]: now },
            status: "pending",
        },
        include: [
            {
                model: Medicine,
                as: "medicine",
                attributes: ["name", "dose"],
            }
        ]
    });

    console.log(`🔔 ${dueReminders.length} due reminders found.`);

    //Send notifications and update the status
    for (const reminder of dueReminders) {
        sendNotification(reminder);
        reminder.status = "sent";
        await reminder.save();
    }
});
