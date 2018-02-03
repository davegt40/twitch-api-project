// Default Twitch users to query
var twitchUsers = ['summit1g', 'shroud', 'freecodecamp',
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

function getUserData() {
  var channelData = [];
  for (var i = 0; i < twitchUsers.length; i++) {
    var channelURL = 'https://wind-bow.gomix.me/twitch-api/channels/';
    channelURL = channelURL + twitchUsers[i]+ '?callback=?';

    $.getJSON(channelURL, function(data) {
      console.log(data);
      channelData.push(data);
    });
  }
  console.log(channelData);

}

$(document).ready(function() {
  $('#add-user').on('click', function() {
    addUser(document.getElementById('username').value);
    createAlert(document.getElementById('username').value);
    document.getElementById('username').value = null;
  });

  getUserData();
});
