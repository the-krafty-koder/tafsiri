import  { FILM,SEASON,EPISODE,LANGUAGE } from "./fetcher/constants.js";
import { languages } from "./common_languages.js";

import minimist from "minimist"
const argv = minimist(process.argv.slice(2));

/**
 * listUserCommands() -> Dictionary
 *
 * Returns a dictionary containing list of command-line arguments
 **/
function listUserCommands(){
	
	return argv;
};

/**
 * validateFlags -> Boolean
 *
 * arguments_list: List
 * Returns a truthy value if all flags are valid
 **/
function validateFlags(arguments_list){
	let flags = [FILM,SEASON,EPISODE,LANGUAGE];

	for(let flag of arguments_list){
		if(!flags.includes(flag)) throw new Error(`Invalid flag:${flag}`);
	}

	if (!arguments_list.includes(SEASON)){ throw new Error('Season has to be entered:type ssn="mov" if a movie')};

	return true;

}

/**
 * validateFlags -> Boolean
 *
 * Returns a truthy value if llanguage is valid
 **/
function validateLanguage(language){
	language = `${language.charAt(0).toUpperCase()}${language.slice(1)}`; // capitalize string

	if(!Object.keys(languages).includes(language)){       // checks if language is part of languages object
		throw new Error(`${language}: Language is currenty not supported`)
	}; 
	return true;
}

export { listUserCommands,validateFlags,validateLanguage };