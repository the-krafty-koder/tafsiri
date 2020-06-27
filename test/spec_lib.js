const { getCurrentDirectory,checkIfDirectoryExists } = require("../lib/file");
const { listUserCommands,validateLanguage } = require("../lib/commands");

const assert = require("assert");
const mocha  = require("mocha");

describe("Files",()=>{

	it("tests if current working directory is found",()=>{
		assert(getCurrentDirectory() === '/home/weezy/Documents/tafsiri');
		console.log(getCurrentDirectory());

	});

	it("tests if filepath passed is a valid directory",()=>{
		assert(checkIfDirectoryExists('/lib')==true);
	});

	/*
	it("tests if entered command-line-arguments are displayed",()=>{
		assert(listUserCommands()._.pop() === 'test/spec_lib');
	});*/
	
});

describe("Validation",()=>{

	it("tests if rightly entered language returns true",()=>{
		assert(validateLanguage("Urdu")===true);
	});

	/*
	it("tests if wrongly entered language throws Error",()=>{
		assert(validateLanguage("Urdo")===true);
	});*/
})