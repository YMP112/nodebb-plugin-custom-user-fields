'use strict';

const user = require.main.require('./src/user');
const db = require.main.require('./src/database');

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
  },

  // API route to get custom fields for a user
  getCustomFields: function (req, res, next) {
    const uid = req.params.uid;

    user.getUserData(uid, (err, userData) => {
      if (err) {
        return res.status(500).send({ error: 'Could not retrieve user data' });
      }

      // Return the custom fields if they exist
      const customFields = userData.customFields || {};
      res.json({ customFields: customFields });
    });
  }
};
