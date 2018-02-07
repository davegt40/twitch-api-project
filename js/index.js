// Default Twitch users to query
var twitchUsers = ['summit1g', 'shroud', 'freecodecamp',
                    'GeekandSundry', 'FeliciaDay'];

var twitchData = [];

function createStreamURL(username) {
  return 'https://wind-bow.gomix.me/twitch-api/streams/' + username + '?callback=?';
}

function createChannelURL(username) {
  return 'https://wind-bow.gomix.me/twitch-api/channels/' + username + '?callback=?';
}

function createAlert(username) {
  var alertDiv = document.createElement('div');
  alertDiv.setAttribute('class', 'alert alert-success');
  alertDiv.setAttribute('role', 'alert');
  var alertText = document.createTextNode(username + ' added');
  alertDiv.append(alertText);
  document.getElementById('user-input-group').append(alertDiv);
}

function getChannelInfo() {
  twitchUsers.forEach(function(user) {
    $.getJSON(createChannelURL(user), function(data) {
      var channel = {
        'display_name': '',
        'game': '',
        'status': '',
        'url': '',
        'stream_type': '',
        'stream_preview_url': ''
      }

      channel.display_name = data.display_name;
      channel.game = data.game;
      channel.status = data.status;
      channel.url = data.url;

      $.getJSON(createStreamURL(user), function(data) {
        console.log(data);
        channel.stream_type = data.stream;
      });
      twitchData.push(channel);
    });
  });
};

function buildUserList() {
  // wait for objects to be built
  setTimeout(function() {
    for (var i = 0; i < twitchData.length; i++) {
      var tableRow = document.createElement('tr');
      var usernameCell = document.createElement('td');
      var usernameText = twitchData[i].display_name;
      usernameCell.append(usernameText);
      tableRow.append(usernameCell);

      var gameCell = document.createElement('td');
      gameCell.append(twitchData[i].game);
      tableRow.append(gameCell);

      var statusCell = document.createElement('td');
      statusCell.append(twitchData[i].status);
      tableRow.append(statusCell);

      var streamOnlineCell = document.createElement('td');
      if (twitchData[i].stream_type) {
        streamOnlineCell.append(twitchData[i].stream_type);
      } else {
        streamOnlineCell.append('Offline');
      }
      tableRow.append(streamOnlineCell);

      var watchCell = document.createElement('td');
      var watchLink = document.createElement('a');
      watchLink.setAttribute('href', twitchData[i].url);
      watchLink.append('Watch');
      watchCell.append(watchLink);
      tableRow.append(watchCell);

      document.getElementById('user-list').append(tableRow);
    }
  }, 500);
}

$(document).ready(function() {

  $('#add-user').on('click', function() {
    twitchUsers.push(document.getElementById('username').value);
    createAlert(document.getElementById('username').value);
    document.getElementById('username').value = null;
  });

  getChannelInfo()
  buildUserList();
  console.log(twitchData);
});
