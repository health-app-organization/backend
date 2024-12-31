'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed data for medicines
    await queryInterface.bulkInsert('medicines', [
      {
        name: 'Paracetamol',
        dose: '500mg',
        startDate: new Date(),
        userId: 1,
      },
      {
        name: 'Ibuprofen',
        dose: '200mg',
        startDate: new Date(),
        userId: 2,
      },
      {
        name: 'Aspirin',
        dose: '75mg',
        startDate: new Date(),
        userId: 6,
      },
      {
        name: 'Amoxicillin',
        dose: '250mg',
        startDate: new Date(),
        userId: 1,
      },
      {
        name: 'Metformin',
        dose: '500mg',
        startDate: new Date(),
        userId: 2,
      },
    ]);

    // Fetch medicine IDs for reminders
    const medicines = await queryInterface.sequelize.query(
      `SELECT id FROM medicines;`
    );

    const medicineRows = medicines[0];

    // Seed data for reminders
    await queryInterface.bulkInsert('reminders', [
      {
        time: new Date(new Date().setHours(9, 0, 0)),
        status: 'pending',
        medicineId: medicineRows[0].id,
      },
      {
        time: new Date(new Date().setHours(12, 0, 0)),
        status: 'sent',
        medicineId: medicineRows[1].id,
      },
      {
        time: new Date(new Date().setHours(18, 0, 0)),
        status: 'pending',
        medicineId: medicineRows[2].id,
      },
      {
        time: new Date(new Date().setHours(8, 30, 0)),
        status: 'pending',
        medicineId: medicineRows[3].id,
      },
      {
        time: new Date(new Date().setHours(22, 0, 0)),
        status: 'sent',
        medicineId: medicineRows[4].id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('reminders', null, {});
    await queryInterface.bulkDelete('medicines', null, {});
  },
};
