import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import ora from "ora";
import { listUserCommands, validateFlags } from "./lib/commands.js";
import { searchInOpen } from "./lib/fetcher/fetch.js";

const MINIMUM_ARGUMENT_LENGTH = 4;
const boundary = "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+";

const log = console.log;


class Main {

	constructor(){
		this.initializeScreen();
		[ this.film,this.season,this.episode,this.language ] = this.getUserCommands();
		
	};

	/**
	 * initializeScreen() -> Void
	 * Writes welcome message, creates ASCII art from text
	 **/
	initializeScreen(){

		log(
			chalk.red(figlet.textSync("TAFSIRI!",{ horizontalLayout: 'full' }))
		);
	};

	/**
	 * getUserCommands() -> Array
	 * Retrieves command-line arguments from user
	 * Returns an list of strings
	 **/
	getUserCommands(){
		//

		let user_commands = listUserCommands();
		let flags = Object.keys(user_commands).slice(1);
 
		const arg_length = flags.length + user_commands._.length;
		const arg_index = {f:0,s:1,e:2,l:3};

		if(validateFlags(flags))  {

			let difference = Object.keys(arg_index).filter(x => flags.includes(x));

			for(let flag of difference){
				 user_commands._.splice(arg_index[flag],0,user_commands[flag]);
			};

		};
	
		return user_commands._

	};

	/**
	 * fetchInfo() -> Array
	 * Determines sites where subtitles are available,
	 * returns array of sites if found,error prompt if none.
	 **/
	async fetchInfo(){
		/*  */
		for await (let [ name,link ] of searchInOpen(this.film,this.season,this.episode,"spa")) {
				log(`\n${name}`);
				log(link);
				log(chalk.green((boundary)));
		}
	};

	/**
	 * downloadSubtitles() -> Void
	 * Downloads subtitles from relevant sites
	 **/
	downloadSubtitles(){
		return null
	};

	/**
	 * run() -> Void
	 * Runs the whole thing :-)
	 **/
	run(){
		log(chalk.cyan(figlet.textSync("Searching...")));
		let spinner  = ora().start();

		this.fetchInfo().then(setTimeout(()=>{
			spinner.succeed();
		},2000));
	};

}

const tafsiri = new Main();
tafsiri.run();
