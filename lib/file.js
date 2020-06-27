const proccess = require("process");
const path = require("path");
const fs = require("fs");

/**
 * getCurrentDirectory() -> String
 * Gets path of current working directory
 *
 * Returns current directory as path
 **/
function getCurrentDirectory(){
	return proccess.cwd();
};

/**
 * checkIfDirectoryExists(filepath) -> Boolean
 * - filepath(String): a directory's path
 *
 * Returns a truthy value if directory exists or not
 **/
function checkIfDirectoryExists(filepath){
	try{
		return fs.statSync(filepath).isDirectory();
	}catch(err){
		return false;
	};
};

export { getCurrentDirectory,checkIfDirectoryExists };