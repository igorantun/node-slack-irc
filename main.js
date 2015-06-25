// Requires
var chalk = require('chalk');
var Slack = require('slack-client');
var IRC = require('irc');

var pack = require("./package.json");
var config = require("./config.json");
var consoleLog = require("./lib/log.js");


// Connection
var irc = new IRC.Client(config.irc.server, config.irc.userName, config.irc);
var slack = new Slack(config.slack.token, false, false);
var channel;


// Variables
var status = {
    name: config.irc.userName,
    messages: 0,
    connected: false
};


// Listeners
irc.addListener('message', function(from, to, message) {
    channel.postMessage({channel: config.slack.channel, text: message, username: from, icon_url: 'http://api.adorable.io/avatars/48/' + from});
    consoleLog('message', '[IRC] ' + from + ': ' + message);
    status.messages++;
});

irc.addListener('error', function(message) {
    consoleLog('error', message);
});

irc.addListener('registered', function(message) {
    consoleLog('start', 'Connected to IRC channel');
    status.connected = true;
});


// Callbacks
slack.on('open', function() {
    channel = slack.getChannelGroupOrDMByID(config.slack.channel);
});

slack.on('message', function(message) {
    if(typeof message.text == 'undefined') return;

    var user = slack.getUserByID(message.user);
    var command = message.text.substring(1).split(' ');

    if(message.text.charAt(0) === '!' && message.channel === config.slack.channel && status.connected) {
        switch(command[0].toLowerCase()) {
            case 'say': case 's':
                var message = message.text.substring(5);

                status.messages++;

                client.whois(user.name, function(info) {
                    if(info && info.nick === user.name && status.name !== user.name) {
                        user.name = user.name + '_';
                    }

                    status.name = user.name;
                    irc.send('NICK', user.name);
                    irc.say(config.irc.channels, message);
                });

                consoleLog('message', '[Slack] ' + user.name + ': ' + message);
            break;

            case 'status':
                consoleLog('info', '[' + user.name + '] - Version: ' + pack.version + ' | Uptime: ' + process.uptime() + 's | Messages sent/received: ' + status.messages);
                channel.postMessage({channel: config.slack.channel, text: '<@' + message.user + '> *- Version:* ' + pack.version + ' *| Uptime:* ' + process.uptime() + 's *| Messages sent/received:* ' + status.messages, username: 'status', icon_url: 'http://api.adorable.io/avatars/48/info'});
            break;
        }
    }
});


// Intern
consoleLog('start', 'Initializing...');
slack.login();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    console.log('Stack trace: ' + err.stack);
});