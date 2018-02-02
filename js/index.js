// Default Twitch users to query
var twitchUsers = ['cunningmoose', 'summit1g', 'shroud', 'freecodecamp',
                    'GeekandSundry', 'FeliciaDay'];

function addUser(username) {
  twitchUsers.push(username);
}

function createAlert(username) {
  var alertDiv = document.createElement('div');
  alertDiv.setAttribute('class', 'alert alert-success');
  alertDiv.setAttribute('role', 'alert');
  var alertText = document.createTextNode(username + ' added');
  alertDiv.append(alertText);
  document.getElementById('user-input-group').append(alertDiv);
}

$(document).ready(function() {
  $('#add-user').on('click', function() {
    addUser(document.getElementById('username').value);
    createAlert(document.getElementById('username').value);
    document.getElementById('username').value = null;
  });
});
