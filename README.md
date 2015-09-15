Node.JS Slack + IRC Integration
===============================
[![GitHub Stars](https://img.shields.io/github/stars/IgorAntun/node-slack-irc.svg?style=flat-square)](https://github.com/IgorAntun/node-slack-irc/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/IgorAntun/node-slack-irc.svg?style=flat-square)](https://github.com/IgorAntun/node-slack-irc/issues) [![Current Version](https://img.shields.io/badge/version-0.6.4-green.svg?style=flat-square)](https://github.com/IgorAntun/node-chat)

Node-Slack-IRC is a bridge to integrate IRC channels to your Slack team. Both messages sent on IRC and on Slack get sent to each other, creating a symmetric integration between both channels.


## Commands
- !say [message] - Sends your message from Slack to IRC (also !s)
- !status - Shows basic info about the app, including version, uptime and messages sent/received.

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

#### Slack
On `config.json`, do the following:
 - Go to your [Slack Integrations](slack.com/services/new) page and set up a *Bot*
 - Now go back to `config.json` and replace *your-slack-token* with your Bot Token
 - Replace *your-slack-channel* with the *Channel ID* of the Slack channel you're going to use

#### IRC
Also on `config.json`, you need to replace:
 - *server* with your IRC server URL
 - *username* with the username you want
 - *realname* with the real name you want
 - *channel* with the IRC channel to connect


## Usage
Once set up, you just need to run `node main.js` to start the application and you're good to go.
All messages sent on IRC will show up on your Slack channel.
Use !say [message] in the Slack channel you chose to send a message from Slack to IRC.

