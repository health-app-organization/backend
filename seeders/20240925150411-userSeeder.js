'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
      firstName: 'Denen',
      lastName: 'Awar',
      email: 'awardenen@gmail.com',
      password: '12345',
      birthDate: '1999-09-25',
      createdAt: new Date(),
      gender: 'male'
    },
    {
      firstName: 'Babayomi',
      lastName: 'Yomzeew',
      email: 'yomizeew@gmail.com',
      password: '12345',
      birthDate: '1990-10-09',
      createdAt: new Date(),
      gender: 'male'
    }
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
