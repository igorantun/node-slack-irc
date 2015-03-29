Node.JS Slack + IRC Integration
===============================
[![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/node-slack-irc.svg)](https://github.com/IgorAntun/node-slack-irc/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/node-slack-irc.svg)](https://github.com/IgorAntun/node-slack-irc/issues) [![Current Version](https://img.shields.io/badge/version-0.3.6-green.svg)](https://github.com/IgorAntun/node-chat)

As the name says, this is a solution to integrate any IRC chat to your Slack team. Both messages sent on IRC get sent to Slack, and messages from Slack get sent to IRC as well, creating a full integration between both channels.


## Commands
- !say [message] - Sends your message from Slack to IRC
- !info - Shows basic info about the app, including version, uptime and messages sent/received.

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

#### Slack
 - Go to your [Slack Integrations](slack.com/services/new) page and set up a *Bot*
 - Now go to `main.js` and replace *YOUR SLACK TOKEN* with your Bot Token
 - Replace *SLACK CHANNEL ID* with the *Channel ID* of the Slack channel you're going to use

#### IRC
Also on `main.js`, you need to replace:
 - *IRC SERVER* with your IRC server URL
 - *IRC USERNAME* with the username you want
 - *IRC REAL NAME* with the real name you want
 - *IRC CHANNEL* with the IRC channel to connect


## Usage
Once set up, you just need to run `node main.js` to start the application and you're good to go.
All messages sent on IRC will show up on your Slack channel.
Use !say [message] in the Slack channel you chose to send a message from Slack to IRC.
