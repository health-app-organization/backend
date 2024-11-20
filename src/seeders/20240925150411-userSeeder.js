'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phoneNumber: '+1234567890',
        birthDate: '1985-06-15',
        gender: 'male',
        bloodGroup: 'O',
        height: 175.5,
        weight: 72.5,
        activityLevel: 'moderatelyActive',
        foodPreferences: 'nonVegetarian',
        occupation: 'Engineer',
        password: '$2b$10$saltsaltsaltsalt', // Hashed password in a real application
        role: 'user',
        createdAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'janesmith@example.com',
        phoneNumber: '+0987654321',
        birthDate: '1992-03-22',
        gender: 'female',
        bloodGroup: 'A',
        height: 160.0,
        weight: 55.0,
        activityLevel: 'lightlyActive',
        foodPreferences: 'vegetarian',
        occupation: 'Teacher',
        password: '$2b$10$saltsaltsaltsalt', // Hashed password in a real application
        role: 'admin',
        createdAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
