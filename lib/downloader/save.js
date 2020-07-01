import fs from "fs";
import got from "got";
import stream from "stream";
import { promisify } from "util";
import OS from "opensubtitles-api";
import zlib from "zlib";

const openSubs = new OS({
    useragent:'UserAgent',
    ssl: true
});

const pipeline = promisify(stream.pipeline);

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

async function getFile(filename,url){
	let downloaded = false;

	let getfile = await pipeline(
		  got.stream(url),
		  fs.createWriteStream(filename)
		)
	    .then(result => downloaded = true)
	    .catch(e => console.log(e));

	return downloaded;
}


export { getFile,getURL };

