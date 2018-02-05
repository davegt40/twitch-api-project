// Default Twitch users to query
var channelData = [];

function createAlert(username) {
  var alertDiv = document.createElement('div');
  alertDiv.setAttribute('class', 'alert alert-success');
  alertDiv.setAttribute('role', 'alert');
  var alertText = document.createTextNode(username + ' added');
  alertDiv.append(alertText);
  document.getElementById('user-input-group').append(alertDiv);
}

function getUserData(users) {
  for (var i = 0; i < users.length; i++) {
    var channelURL = 'https://wind-bow.gomix.me/twitch-api/channels/';
    channelURL += users[i] + '?callback=?';

    // Get Channel data for usernames
    $.getJSON(channelURL, function(data) {
      var channel = {
        'display_name': data.display_name,
        'game': data.game,
        'status': data.status,
        'url': data.url,
        'stream_type': '',
        'stream_preview_url': ''
      }

      setTimeout(function() {
        console.log(users);
        var streamURL = 'https://wind-bow.gomix.me/twitch-api/streams/';
        streamURL += users[i] + '?callback=?';
        $.getJSON(streamURL, function(data) {
          console.log(data);
          channel.stream_type = data.stream_type;
        });
      }, 500);

      channelData.push(channel);
    });
  }
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

      var streamTypeCell = document.createElement('td');
      streamTypeCell.append(channelData[i].stream_type);
      tableRow.append(streamTypeCell);

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
  var twitchUsers = ['summit1g', 'shroud', 'freecodecamp',
                      'GeekandSundry', 'FeliciaDay'];

  $('#add-user').on('click', function() {
    twitchUsers.push(document.getElementById('username').value);
    createAlert(document.getElementById('username').value);
    document.getElementById('username').value = null;
  });

  getUserData(twitchUsers);
  buildUserList();
});
