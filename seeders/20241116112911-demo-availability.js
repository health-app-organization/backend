'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('availabilities', [
      {
        dayOfWeek: 'Mondays',
        startTime: '09:00:00',
        endTime: '17:00:00',
        service: 'Consultation',
        providerId: 1, // Assuming there is a provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayOfWeek: 'Tuesdays',
        startTime: '10:00:00',
        endTime: '16:00:00',
        service: 'Consultation',
        providerId: 2, // Assuming there is a provider with ID 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayOfWeek: 'Wednesdays',
        startTime: '08:00:00',
        endTime: '14:00:00',
        service: 'Visitation',
        providerId: 1, // Assuming there is a provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayOfWeek: 'Fridays',
        startTime: '12:00:00',
        endTime: '20:00:00',
        service: 'Consultation',
        providerId: 2, // Assuming there is a provider with ID 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayOfWeek: 'Saturdays',
        startTime: '10:00:00',
        endTime: '18:00:00',
        service: 'Visitation',
        providerId: 1, // Assuming there is a provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('availabilities', null, {});
  }
};
