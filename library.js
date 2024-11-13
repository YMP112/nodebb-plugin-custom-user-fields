'use strict';

const user = require.main.require('./src/user');

module.exports = {
  init: function (params, callback) {
    console.log('Custom User Fields Plugin Initialized');
    callback();
  },

  // Function to add a custom field to a user profile
  addCustomField: function (uid, fieldName, fieldValue, callback) {
    user.getUserData(uid, (err, userData) => {
      if (err) {
        return callback(err);
      }
      
      // Create a customFields object if it doesn't exist
      userData.customFields = userData.customFields || {};
      userData.customFields[fieldName] = fieldValue;

      user.updateUserData(uid, userData, callback);
    });
  }
};
