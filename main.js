// Requires
var irc = require('irc');
var chalk = require('chalk');
var slackAPI = require('slackbotapi');
var pack = require("./package.json");


// Configuration
var ircConfig = {
	server: 'IRC SERVER',
    userName: 'IRC USERNAME',
    realName: 'IRC REAL NAME',
	channels: ['IRC CHANNEL'],
    autoConnect: true,
    autoRejoin: true,
    secure: true,
    port: 6697
};

var slackConfig = {
	'token': 'YOUR SLACK TOKEN',
	'logging': false,
	channel: 'SLACK CHANNEL ID'
};

var appConfig = {
	logging: true
};


// Connection
var client = new irc.Client(ircConfig.server, ircConfig.userName, ircConfig);
var slack = new slackAPI(slackConfig);


// Variables
var logInfo    = chalk.bold.blue('[Info] ');
var logError   = chalk.bold.red.dim('[Error] ');
var logStop	   = chalk.bold.green.dim('[Stop] ');
var logStart   = chalk.bold.green.dim('[Start] ');
var logMessage = chalk.bold.cyan.dim('[Message] ');

var messageFlux = 0;
var appVersion = pack.version;


// Utilities
function getTime() {
    var now = new Date(),
        time = [now.getHours(), now.getMinutes(), now.getSeconds()];
 
    for(var i = 0; i < 3; i++) {
        if(time[i] < 10)
            time[i] = "0" + time[i];
    }
 
    return time.join(":");
}

function consoleLog(type, message) {
	if(appConfig.logging === true)
		console.log('[' + getTime() + '] ' + type + message);
}


// Callbacks
client.addListener('message', function (from, to, message) {
    slack.sendMsg(slackConfig.channel, '[IRC] *' + from + ':* ' + message);
    consoleLog(logMessage, '[IRC] ' + from + ': ' + message);
    messageFlux++;
});

client.addListener('error', function(message) {
    consoleLog(logError, message);
});

client.addListener('registered', function(message) {
    consoleLog(logStart, 'Connected to IRC channel');
});

slack.on('message', function(data) {
	if(typeof data.text == 'undefined') return;

	if(data.text.charAt(0) === '!' && data.channel === slackConfig.channel) {
		var command = data.text.substring(1).split(' ');
		var user = slack.getUser(data.user).name;

		switch (command[0].toLowerCase()) {
			case "say":
    			messageFlux++;
				var message = data.text.substring(5);
    			consoleLog(logMessage, '[Slack] ' + user + ': ' + message);
				client.say(ircConfig.channels, '[Slack] ' + user + ': ' + message);
    			slack.sendMsg(slackConfig.channel, '[Slack] *' + user + ':* ' + message);
			break;

			case "status":
				consoleLog(logInfo, '[' + user + '] - Version: ' + appVersion + ' | Uptime: ' + process.uptime() + ' | Messages sent/received: ' + messageFlux);
				slack.sendMsg(slackConfig.channel, '@' + user + ' *- Version:* ' + appVersion + ' *| Uptime:* ' + process.uptime() + 's *| Messages sent/received:* ' + messageFlux);
			break;
		}
	}
});

process.on('exit', function(code) {
	consoleLog(stop, 'About to exit with code: ' + code);
});

consoleLog(start, 'Initializing...');