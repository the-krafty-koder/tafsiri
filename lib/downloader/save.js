import fs from "fs";
import got from "got";
import stream from "stream";
import { promisify } from "util";
import OS from "opensubtitles-api";
import zlib from "zlib";

// create an opensub api client
const openSubs = new OS({
    useragent:'UserAgent',
    ssl: true
});

const pipeline = promisify(stream.pipeline); //turn the stream pipeline to a promise.

/**
 * getURL(name,season,episode,language) => List<String>
 * Retrieves subtitle download url from Opensubs
 * Returns list of url and name
**/
async function getURL(name,season,episode,language){
	const url = await openSubs.search({
		sublanguageid: language,       
		season: season,
		episode: episode,
		extensions: ['srt', 'vtt'], 
		limit: 'best',   
		query:name,                         
		gzip: true                  
	});

	return [url.es.url,url.es.filename];
}

/**
 * getURL(filename,url) => Boolean
 * Retrieves subtitle file from download url via a stream and saves to  file.
**/
async function getFile(filename,url){
	let downloaded = false;

	let getfile = await pipeline(
		  got.stream(url),                    // gets subtitle file as stream from url
		  fs.createWriteStream(filename)      // writes to file via a writestream
		)
	    .then(result => downloaded = true)
	    .catch(e => console.log(e));

	return downloaded;
}


export { getFile,getURL };

