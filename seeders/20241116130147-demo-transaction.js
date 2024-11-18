'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactions', [
      {
        amount: 100.00,
        type: 'credit',
        date: new Date(),
        description: 'Payment received for services rendered',
        userId: 1, // Assuming there is a user with ID 1
      },
      {
        amount: 50.00,
        type: 'debit',
        date: new Date(),
        description: 'Payment for consultation fee',
        userId: 2, // Assuming there is a user with ID 2
      },
      {
        amount: 200.00,
        type: 'credit',
        date: new Date(),
        description: 'Refund issued for overpayment',
        userId: 1, // Assuming there is a user with ID 1
      },
      {
        amount: 75.00,
        type: 'debit',
        date: new Date(),
        description: 'Payment for medical supplies',
        userId: 2, // Assuming there is a user with ID 2
      },
      {
        amount: 120.00,
        type: 'credit',
        date: new Date(),
        description: 'Payment for services rendered',
        userId: 1, // Assuming there is a user with ID 1
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
