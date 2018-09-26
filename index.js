const  { RTMClient, WebClient }  = require('@slack/client');
const CLIENT_EVENTS = require('@slack/client');
const key = require('./keys');
const rtm = new RTMClient(key.token);
const web = new WebClient(key.token);
rtm.start();
rtm.on('message', (message) => {
    game = 0;
    user1: String;
    user2: String;

    // For structure of `event`, see https://api.slack.com/events/message
  
    // Skip messages that are from a bot or my own user ID
    if ( (message.subtype && message.subtype === 'bot_message') ||
         (!message.subtype && message.user === rtm.activeUserId) ) {
      return;
    }
  
    // Log the message
if (message.text.toLowerCase() == 'hi') {
    rtm.sendMessage('Hello <@' + message.user + '>' , message.channel)
    // Returns a promise that resolves when the message is sent
    .then((msg) => console.log(`Message sent to channel ${message.channel} with ts:${msg.ts}`))
    .catch(console.error);
} else if (message.text.toLowerCase() == 'how are you?') {
    rtm.sendMessage('Doing well and you <@' + message.user + '>?' , message.channel)
    // Returns a promise that resolves when the message is sent
    .then((msg) => console.log(`Message sent to channel ${message.channel} with ts:${msg.ts}`))
    .catch(console.error);
} else if (message.text.toLowerCase() == 'say hello' && message.user == 'UB5FHHXPV') {
    rtm.sendMessage('Hello <!channel>' , message.channel)
    // Returns a promise that resolves when the message is sent
    .then((msg) => console.log(`Message sent to channel ${message.channel} with ts:${msg.ts}`))
    .catch(console.error);
} else if (message.text.toLowerCase() == 'start game' && message.user == 'UB5FHHXPV') {
    rtm.sendMessage('Let the games begin.' , message.channel)
    // Returns a promise that resolves when the message is sent
    .then((msg) => console.log(`Message sent to channel ${message.channel} with ts:${msg.ts}`))
    .catch(console.error);
} 



    console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  });


