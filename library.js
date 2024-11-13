'use strict';

const user = require.main.require('./src/user');

module.exports = {
  init: function (params, callback) {
    // כאן תוכל להוסיף את הלוגיקה שלך
    console.log('Custom Fields Plugin Initialized');
    callback();
  },

  // פונקציה להוספת שדה מותאם אישית
  addCustomField: function (uid, fieldName, fieldValue, callback) {
    user.getUserData(uid, (err, userData) => {
      if (err) {
        return callback(err);
      }
      // הוסף את השדה המותאם אישית למידע של המשתמש
      userData.customFields = userData.customFields || {};
      userData.customFields[fieldName] = fieldValue;

      user.updateUserData(uid, userData, callback);
    });
  }
};
