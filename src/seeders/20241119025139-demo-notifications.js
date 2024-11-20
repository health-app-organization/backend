'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('notifications', [
      {
        subject: 'Welcome to the platform!',
        message: 'We are excited to have you onboard. Explore our services now.',
        read: 0,
        userId: 1,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'Appointment Confirmation',
        message: 'Your appointment with Dr. Smith has been confirmed for tomorrow at 10:00 AM.',
        read: 1,
        userId: 2,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'New Provider Alert',
        message: 'A new specialist in cardiology is now available for bookings.',
        read: 0,
        userId: 1,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'Payment Receipt',
        message: 'Your payment of $100 has been successfully processed.',
        read: 1,
        userId: 2,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'Weekly Summary',
        message: 'You have completed 3 appointments this week.',
        read: 0,
        userId: 1,
        type: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'New Booking Request',
        message: 'You have a new booking request for an appointment on Friday at 3:00 PM.',
        read: 0,
        userId: 2,
        type: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'System Maintenance Notice',
        message: 'Our system will undergo maintenance on Saturday from 12:00 AM to 4:00 AM.',
        read: 1,
        userId: 1,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'Profile Update Success',
        message: 'Your profile has been successfully updated.',
        read: 0,
        userId: 2,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'Feedback Request',
        message: 'Please take a moment to provide feedback on your recent appointment.',
        read: 0,
        userId: 1,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject: 'Account Verification',
        message: 'Please verify your email address to complete your registration.',
        read: 1,
        userId: 2,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notifications', null, {});
  }
};
