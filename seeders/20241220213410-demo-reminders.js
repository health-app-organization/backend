'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('reminders', [
      {
        time: new Date(new Date().setHours(8, 0, 0)),
        status: 'ongoing',
        recurrence: 'daily',
        medicineId: 1,
      },
      {
        time: new Date(new Date().setHours(12, 0, 0)),
        status: 'cancelled',
        recurrence: 'oneoff',
        medicineId: 2,
      },
      {
        time: new Date(new Date().setHours(18, 0, 0)),
        status: 'ongoing',
        recurrence: 'daily',
        medicineId: 3,
      },
      {
        time: new Date(new Date().setHours(6, 30, 0)),
        status: 'ongoing',
        recurrence: 'oneoff',
        medicineId: 4,
      },
      {
        time: new Date(new Date().setHours(22, 0, 0)),
        status: 'cancelled',
        recurrence: 'daily',
        medicineId: 5,
      },
      {
        time: new Date(new Date().setHours(10, 0, 0)),
        status: 'ongoing',
        recurrence: 'oneoff',
        medicineId: 9,
      },
      {
        time: new Date(new Date().setHours(14, 0, 0)),
        status: 'ongoing',
        recurrence: 'daily',
        medicineId: 1,
      },
      {
        time: new Date(new Date().setHours(20, 30, 0)),
        status: 'cancelled',
        recurrence: 'oneoff',
        medicineId: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reminders', null, {});
  },
};
