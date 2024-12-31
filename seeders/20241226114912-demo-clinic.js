'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert seed data into the Clinics table
    await queryInterface.bulkInsert('Clinics', [
      {
        name: 'Healthy Life Clinic',
        email: 'contact@healthylife.com',
        website: 'https://healthylife.com',
        phone: '+1234567890',
        address: '123 Wellness Street, Fit City',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Care First Medical',
        email: 'info@carefirstmedical.com',
        website: 'https://carefirstmedical.com',
        phone: '+0987654321',
        address: '456 Health Ave, MedTown',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hope & Healing Center',
        email: 'support@hopehealing.com',
        website: 'https://hopehealing.com',
        phone: '+1122334455',
        address: '789 Recovery Lane, Healville',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove all data from the Clinics table
    await queryInterface.bulkDelete('Clinics', null, {});
  },
};
