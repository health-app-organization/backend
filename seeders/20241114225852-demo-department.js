'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('departments', [
      { name: 'Haematology, Sickle cell and blood diseases' },
      { name: 'Paediatrics, Child health' },
      { name: 'Cardiology, heart and blood pressure' },
      { name: 'General Practice and medical care' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('departments', null, {});
  }
};
