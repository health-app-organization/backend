'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('experiences', [
      {
        institution: 'City Hospital',
        startDate: '2018-01',
        endDate: '2020-12',
        position: 'Resident Doctor',
        providerId: 1, // Assuming there is a provider with ID 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        institution: 'Global Health Clinic',
        startDate: '2021-01',
        endDate: '2023-06',
        position: 'Senior Surgeon',
        providerId: 2, // Assuming there is a provider with ID 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        institution: 'Wellness Center',
        startDate: '2015-03',
        endDate: '2017-08',
        position: 'Nurse Practitioner',
        providerId: 2, // Assuming there is a provider with ID 3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        institution: 'MedLife Labs',
        startDate: '2019-05',
        endDate: '2021-11',
        position: 'Lab Technician',
        providerId: 1, // Assuming there is a provider with ID 4
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('experiences', null, {});
  }
};
