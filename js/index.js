// Default Twitch users to query
var twitchUsers = ['summit1g', 'shroud', 'freecodecamp',
                    'GeekandSundry', 'FeliciaDay'];
var channelData = [];

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
  for (var i = 0; i < twitchUsers.length; i++) {
    var channelURL = 'https://wind-bow.gomix.me/twitch-api/channels/';
    channelURL = channelURL + twitchUsers[i]+ '?callback=?';

    $.getJSON(channelURL, function(data) {
      var channel = {
        "display_name": data.display_name,
        "game": data.game,
        "status": data.status,
        "url": data.url
      }
      channelData.push(channel);
    });
  }
  console.log(channelData);
}

function buildUserList() {
  // wait for objects to be built
  setTimeout(function() {
    for (var i = 0; i < channelData.length; i++) {
      var tableRow = document.createElement('tr');
      var usernameCell = document.createElement('td');
      var usernameText = channelData[i].display_name;
      usernameCell.append(usernameText);
      tableRow.append(usernameCell);

      var gameCell = document.createElement('td');
      gameCell.append(channelData[i].game);
      tableRow.append(gameCell);
      var statusCell = document.createElement('td');
      statusCell.append(channelData[i].status);
      tableRow.append(statusCell);

      var watchCell = document.createElement('td');
      var watchLink = document.createElement('a');
      watchLink.setAttribute('href', channelData[i].url);
      watchLink.append('Watch');
      watchCell.append(watchLink);
      tableRow.append(watchCell);
      
      document.getElementById('user-list').append(tableRow);
    }
  }, 500);
}

$(document).ready(function() {
  $('#add-user').on('click', function() {
    addUser(document.getElementById('username').value);
    createAlert(document.getElementById('username').value);
    document.getElementById('username').value = null;
  });

  getUserData();
  buildUserList();
});
