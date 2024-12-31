'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('specializations', [
      { name: 'General doctor' },
      { name: 'Nurse' },
      { name: 'Massage Therapist' },
      { name: 'Optometrist' },
      { name: 'Gynecologists' },
      { name: 'Cardiologist' },
      { name: 'Pharmacist' },
      { name: 'Surgeon' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('specializations', null, {});
  }
};
