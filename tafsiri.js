const chalk = require("chalk")
const clear = require("clear");
const figlet = require("figlet");
const { listUserCommands, validateFlags } = require("./lib/commands");

const MINIMUM_ARGUMENT_LENGTH = 4;


class Main {

	constructor(){
		this.initializeScreen();
		[ this.film,this.season,this.episode,this.language ] = this.getUserCommands();
		console.log(this.film + this.season);
		
	};

	/**
	 * initializeScreen() -> Void
	 * Writes welcome message, creates ASCII art from text
	 **/
	initializeScreen(){

		console.log(
			chalk.red(figlet.textSync("TAFSIRI",{ horizontalLayout: 'full' }))
		);
	};

	/**
	 * getUserCommands() -> Array
	 * Retrieves command-line arguments from user
	 * Returns an array of strings
	 **/
	getUserCommands(){
		//

		let user_commands = listUserCommands();
		let flags = Object.keys(user_commands).slice(1);
		console.log(user_commands);
 
		const arg_length = flags.length + user_commands._.length;
		const arg_index = {f:0,s:1,e:2,l:3};

		if(validateFlags(flags))  {

			let difference = Object.keys(arg_index).filter(x => flags.includes(x));

			for(flag of difference){
				 user_commands._.splice(arg_index[flag],0,user_commands[flag]);
			};

		};
	
		return user_commands._

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

const tafsiri = new Main();
tafsiri.run();
