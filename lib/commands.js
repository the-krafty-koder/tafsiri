const argv = require("minimist")(process.argv.slice(2));

/**
 * listUserCommands() -> Dictionary
 *
 * Returns a dictionary containing list of command-line arguments
 **/
function listUserCommands(){
	console.log(argv);
	return argv;
};

module.exports = { listUserCommands };