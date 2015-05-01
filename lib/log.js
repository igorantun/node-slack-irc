// Requires
var chalk = require('chalk');


// Utilities
function getTime() {
	var now = new Date(),
		time = [now.getHours(), now.getMinutes(), now.getSeconds()];

	for(var i = 0; i < 3; i++) {
		if(time[i] < 10)
			time[i] = "0" + time[i];
	}

	return '[' + time.join(":") + '] ';
}


// Exports
module.exports = function(type, message) {
	switch(type) {
		case 'start':
			type = chalk.bold.green.dim('[START] ');
			break;

		case 'stop':
			type = chalk.bold.red.dim('[STOP] ');
			break;

		case 'error':
			type = chalk.bold.red.dim('[ERROR] ');
			break;

		case 'info':
			type = chalk.bold.blue('[INFO] ');
			break;

		case 'message':
			type = chalk.bold.cyan.dim('[MESSAGE] ');
			break;
	}

	console.log(getTime() + type + message);
}