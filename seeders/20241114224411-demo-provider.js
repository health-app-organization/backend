'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('providers', [
      {
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'Michael',
        email: 'johndoe@example.com',
        category: 'doctor',
        profilePic: 'https://example.com/profile/johndoe.jpg',
        phoneNumber: '+1234567890',
        specializationId: 1,  // Assuming this references an existing specialization ID
        departmentId: 1,      // Assuming this references an existing department ID
        sector: 'Healthcare',
        gender: 'male',
        age: 45,
        address: '123 Main St, Anytown',
        password: '$2b$10$saltsaltsaltsalt',  // Use hashed password in a real app
        isVerified: 1,
        yearsOfExperience: 20,
        aboutMe: 'Experienced doctor specializing in general medicine.',
        dateOfBirth: '1979-05-15',
        city: 'Anytown',
        country: 'Countryland',
        createdAt: new Date(),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        middleName: 'Ann',
        email: 'janesmith@example.com',
        category: 'nurse',
        profilePic: 'https://example.com/profile/janesmith.jpg',
        phoneNumber: '+0987654321',
        specializationId: 2,
        departmentId: 2,
        sector: 'Healthcare',
        gender: 'female',
        age: 30,
        address: '456 Side St, Anytown',
        password: '$2b$10$saltsaltsaltsalt',  // Use hashed password in a real app
        isVerified: 0,
        yearsOfExperience: 8,
        aboutMe: 'Passionate nurse with a focus on patient care.',
        dateOfBirth: '1994-08-10',
        city: 'Anytown',
        country: 'Countryland',
        createdAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('providers', null, {});
  }
};
