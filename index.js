const { RTMClient, WebClient } = require("@slack/client");
const CLIENT_EVENTS = require("@slack/client");
const key = require("./keys");
const rtm = new RTMClient(key.token);
const web = new WebClient(key.token);
let a = ['   ', '   ', '   '];
let b = ['   ', '   ', '   '];
let c = ['   ', '   ', '   '];
let game = 0;
let user1 = '';
let user2 = '';
let activeUser = '';
let hi = ['hi', 'hello', 'hola', 'que tal', 'morning']
rtm.start();
rtm.on("message", msg => {
  
  // Skip messages that are from a bot or my own user ID
  if ((msg.subtype && msg.subtype === "bot_message") || (!msg.subtype && msg.user === rtm.activeUserId)) {
    return;
  }

    // Convert the message to lowercase
    msg.text = msg.text.toLowerCase()
  
    if (hi.indexOf(msg.text) != -1) {
        send("Hi <@" + msg.user + ">", msg.channel);
    } else if (msg.text.slice(0,11) == "how are you") {
        send("Doing well and you <@" + msg.user + ">?",msg.channel);
    } else if ( msg.text == "say hello" && msg.user == "UB5FHHXPV") {
        send("Hello <!channel>", msg.channel);
    }  else if ( msg.text.slice(msg.text.length - 2,2 ) == "??") {
        send("What's wrong with you <@" + msg.user + ">?", msg.channel);
    } else if ( msg.text.charAt(msg.text.length - 1) == "?") {
        send("I don't have money <@" + msg.user + ">", msg.channel);
    } else if ( msg.text == "grr" && msg.user == "UB5FHHXPV") {
        send("GGGGGRRRRRRRRR!!!!!!!!", msg.channel);
    } else if ( msg.text == "start game" && game == 0) {
        game = 1;
        send('Let the games begin, who want to play tic tac toe? (Responde: me)', msg.channel);  
    }
    game == 1 && msg.user == 'UB5FHHXPV' && msg.text == "end game" ? endGame() : null;
    game == 1 && user1 != '' && user2 != '' && activeUser == msg.user ? updateGame(msg.text.charAt(0), msg.text.charAt(1), msg.channel) : null;
    game == 1 && (user1 == '' || user2 == '') ? addPlayer(msg.text, msg.user, msg.channel) : null;
});

send = (info, channel) => {
    rtm
      .sendMessage(info, channel)
      // Returns a promise that resolves when the message is sent
      .then(msg => {}
     
      )
      .catch(console.error);
  }

  someWin = () => {
    if ((a[0] == a[1] && a[1] == a[2] && a[0] != '   ') || (c[0] == c[1] && c[1] == c[2] && c[0] != '   ') || (((a[0] == b[1] && b[1] == c[2]) || (a[2] == b[1] && b[1] == c[0]) || (b[0] == b[1] && b[1] == b[2])) && b[1] != '   ')) {
        return activeUser;
    } else {
        return false;
    }
}

endGame = () => {
    a = ['   ', '   ', '   '];
    b = ['   ', '   ', '   '];
    c = ['   ', '   ', '   '];
    game = 0;
    user1 = '';
    user2 = '';
}

updateGame = (position, index,channel) => {
    let value = activeUser == user1 ? 'X' : 'O';
    let tempPosition = ['a', 'b', 'c'];

    if (tempPosition.indexOf(position) != -1 && index >= 1 && index <= 3) {
        if(position == 'a' && a[index - 1] == '   ') {
            a[index -1] = value;
            return showResult(channel);
        }
        if(position == 'b' && b[index - 1] == '   ') {
            b[index -1] = value;
            return showResult(channel);
        }
        if(position == 'c' && c[index - 1] == '   ') {
            c[index -1] = value;
            return showResult(channel);
        }
        send('<@' + activeUser + '> That value is already taken, select another one.',channel)
    } else {
        send('<@' + activeUser + '> Sintax error, please try again typing letter "A, B or C" and numbers 1, 2 or 3',channel);
    }
}

showResult = (channel) => {
    send('A:  ' + a[0] + '|' + a[1] + '|' + a[2], channel);
    send('B:  ' + b[0] + '|' + b[1] + '|' + b[2], channel);
    send('C:  ' + c[0] + '|' + c[1] + '|' + c[2], channel);
    if (someWin() != false ) {
        send('<@' + activeUser + '> Wins',channel);
        return endGame();
    }
    activeUser = activeUser == user1 ? user2 :user1;
}

addPlayer = (text, user, channel) => {
    if (game == 1) {
        // console.log(user1, user2)
        if (text.toLowerCase() == 'me' && user1 == '') {
            user1 = user;
            send('User1: <@' + user + '>', channel);
            activeUser = user1;
        } else if (text.toLowerCase() == 'me' && user2 == '' && user1 != '' && user1 != user) {
            user2 = user;
            send('User2: <@' + user + '>', channel);
            updateGame(channel);
        } else if (text.toLowerCase() == 'me' && user1 == user && user1 != '' && user2 == '') {
            send('User1 must be different to User2', channel);
        }
    }
}