const http = require("https");
const jsdom = require("jsdom");

function downloadPageFromUrl(url,callback){
	const request = http.get(url,(response) => {

	});

	request.end();
}