'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [
      {
        review: 'The consultation was excellent. The provider was very attentive and professional.',
        rating: 5,
        userId: 1, // Assuming there is a user with ID 1
        providerId: 1, // Provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: 'The experience was good, but the waiting time was longer than expected.',
        rating: 4,
        userId: 2, // Assuming there is a user with ID 2
        providerId: 2, // Provider with ID 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: 'The provider was knowledgeable, but the location was a bit inconvenient.',
        rating: 3,
        userId: 1, // Assuming there is a user with ID 3
        providerId: 1, // Provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: 'Amazing service and very compassionate staff.',
        rating: 5,
        userId: 2, // Assuming there is a user with ID 4
        providerId: 2, // Provider with ID 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        review: 'Decent experience, but there is room for improvement in follow-up services.',
        rating: 3,
        userId: 1, // Assuming there is a user with ID 5
        providerId: 1, // Provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
