'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('appointments', [
      {
        userId: 1,  // Assuming there is a user with ID 1 in the `providers` table
        dateTime: '2024-11-20 10:00:00',
        durationMins: 30,
        status: 'upcoming',
        urgency: 'low',
        location: 'Clinic A',
        consultationType: 'clinic',
        providerId: 1,  // Assuming there is a provider with ID 2 in the `providers` table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,  // Assuming there is a user with ID 2 in the `providers` table
        dateTime: '2024-11-21 14:00:00',
        durationMins: 45,
        status: 'completed',
        urgency: 'high',
        location: 'Clinic B',
        consultationType: 'home',
        providerId: 2,  // Assuming there is a provider with ID 3 in the `providers` table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,  // Assuming there is a user with ID 3 in the `providers` table
        dateTime: '2024-11-22 16:00:00',
        durationMins: 60,
        status: 'cancelled',
        urgency: 'low',
        location: 'Clinic C',
        consultationType: 'video',
        providerId: 2,  // Assuming there is a provider with ID 1 in the `providers` table
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('appointments', null, {});
  }
};
