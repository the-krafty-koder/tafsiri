const argv = require("minimist")(process.argv.slice(2));
const { FILM,SEASON,EPISODE,LANGUAGE } = require("./fetcher/constants");

/**
 * listUserCommands() -> Dictionary
 *
 * Returns a dictionary containing list of command-line arguments
 **/
function listUserCommands(){
	
	return argv;
};

function validateFlags(arguments_list){
	let flags = [FILM,SEASON,EPISODE,LANGUAGE];

	for(flag of arguments_list){
		if(!flags.includes(flag)) throw new Error(`Invalid flag:${flag}`);
	}

	if (!arguments_list.includes(SEASON)){ throw new Error('Season has to be entered:type ssn="mov" if a movie')};

	return true;

}

module.exports = { listUserCommands,validateFlags };