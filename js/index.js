// Default Twitch users to query
var twitchUsers = ['cunningmoose', 'summit1g', 'shroud', 'freecodecamp',
                    'GeekandSundry', 'FeliciaDay'];

function addUser(username) {
  twitchUsers.push(username);
}

$(document).ready(function() {
  $('#add-user').on('click', function() {
    addUser(document.getElementById('username').value);
    document.getElementById('username').value = null;
  });
});
