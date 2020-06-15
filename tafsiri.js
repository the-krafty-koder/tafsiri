const chalk = require("chalk")
//const clear = require("clear");
const { listUserCommands } = require("./lib/commands");

class Main {

	constructor(){
		this.initialize_screen();
		this.commands_array = this.getUserCommands();
	};

	/**
	 * initializeScreen() -> Void
	 * Writes welcome message, creates ASCII art from text
	 **/
	initializeScreen(){ 

		console.log(chalk.red("TAFSIRI"));
	}; 

	/**
	 * getUserCommands() -> Array
	 * Retrieves command-line arguments from user
	 * Returns an array of strings
	 **/
	getUserCommands(){
		// 

		return listUserCommands()._;
	};


	/**
	 * downloadSubtitles() -> Void
	 * Downloads subtitles from relevant sites
	 **/
	downloadSubtitles(){
		return null
	};

	/**
	 * fetchInfo() -> Array
	 * Determines sites where subtitles are available,
	 * returns array of sites if found,error prompt if none.
	 **/
	fetchInfo(){
		/*  */

		return null;
	};

	/**
	 * run() -> Void
	 * Runs the whole thing :-)
	 **/
	run(){
		
		return null;
	};

}

const tafsiri = Main();
tafsiri.run();
