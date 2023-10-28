import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import { listUserCommands, validateFlags, validateLanguage } from "./lib/commands.js";
import { searchInOpen } from "./lib/fetcher/fetch.js";
import { getFile,getURL } from "./lib/downloader/save.js";
import { languages } from "./lib/common_languages.js";

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
	 * getLanguageCode() -> Str,
	 * Returns a language code if supported,error prompt if none.
	 **/
	getLanguageCode(){

		const isValid = validateLanguage(this.language);
		if(isValid){
			return languages[this.language]
		}	
	};

	/**
	 * fetchInfo() -> Array
	 * Determines sites where subtitles are available,
	 * returns array of sites if found,error prompt if none.
	 **/
	async fetchInfo(){
		this.languageCode = this.getLanguageCode(this.language)
		for await (let [ name,link ] of searchInOpen(this.film,this.season,this.episode,this.languageCode)) {
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
		getURL(this.film,this.season,this.episode,this.languageCode).then((args) => {
			let [url,filename] = args;
			getFile(`${filename}.zip`,url).then(_ => log("Download Done"));
		}).catch(error => {
			if(error instanceof TypeError){
				log('Subtitles not available at this time');
			}
		});
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

		this.downloadSubtitles();
	};

}

const tafsiri = new Main();
tafsiri.run();
