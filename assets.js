'use strict';

(function($) {
  // When the page loads, show the custom fields
  $(document).ready(function() {
    var uid = $('.user-profile').data('uid');  // Get the user's UID

    // Fetch custom fields data using AJAX
    $.get('/api/user/' + uid + '/custom-fields', function(data) {
      if (data.customFields) {
        // Append custom fields to the user profile page
        var customFieldsHtml = '';
        for (var field in data.customFields) {
          if (data.customFields.hasOwnProperty(field)) {
            customFieldsHtml += '<div class="custom-field"><strong>' + field + ':</strong> ' + data.customFields[field] + '</div>';
          }
        }
        $('.profile-fields').append(customFieldsHtml);
      }
    });
  });
})(jQuery);
