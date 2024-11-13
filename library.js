'use strict';

const user = require.main.require('./src/user');
const meta = require.main.require('./src/meta');
const db = require.main.require('./src/database');

module.exports = {

  // פונקציה שמאתחלת את התוסף
  init: function (params, callback) {
    console.log('Custom User Fields Plugin Initialized');
    callback();
  },

  // פונקציה להוספת שדה מותאם אישית לפרופיל המשתמש
  addCustomField: function (uid, fieldName, fieldValue, callback) {
    user.getUserData(uid, (err, userData) => {
      if (err) {
        return callback(err);
      }
      
      // אם אין שדות מותאמים אישית, ניצור אובייקט customFields
      userData.customFields = userData.customFields || {};
      userData.customFields[fieldName] = fieldValue;

      user.updateUserData(uid, userData, callback);
    });
  },

  // API לשליפת שדות מותאמים אישית של משתמש
  getCustomFields: function (req, res, next) {
    const uid = req.params.uid;

    user.getUserData(uid, (err, userData) => {
      if (err) {
        return res.status(500).send({ error: 'Could not retrieve user data' });
      }

      const customFields = userData.customFields || {};
      res.json({ customFields: customFields });
    });
  },

  // הוספת אפשרות למנהל בפאנל הניהול
  addAdminMenu: function (header) {
    header.plugins.push({
      "route": '/plugins/custom-user-fields',
      "icon": 'fa-cogs',
      "name": 'Custom User Fields'
    });
    return header;
  },

  // הצגת ההגדרות בממשק הניהול של NodeBB
  getAdminSettings: function (req, res, next) {
    meta.settings.get('custom-user-fields', function (err, settings) {
      res.render('admin/plugins/custom-user-fields', {
        settings: settings || {}
      });
    });
  },

  // שמירת הגדרות השדות המותאמים אישית בממשק הניהול
  saveAdminSettings: function (req, res, next) {
    const settings = req.body;
    meta.settings.set('custom-user-fields', settings, function () {
      res.redirect('/admin/plugins/custom-user-fields');
    });
  }
};
