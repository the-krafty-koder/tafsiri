import fs, { exists, mkdirSync } from "fs";
import got from "got";
import stream from "stream";
import { promisify } from "util";
import { homedir } from 'os';
import OS from "opensubtitles-api";

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
	const response = await openSubs.search({
		sublanguageid: language,       
		season: season,
		episode: episode,
		extensions: ['srt', 'vtt'], 
		limit: 'best',   
		query:name,                         
		gzip: true                  
	});
	const [url] = Object.values(response)

	return [url.url,url.filename];
}

/**
 * getURL(filename,url) => Boolean
 * Retrieves subtitle file from download url via a stream and saves to  file.
**/
async function getFile(filename,url){
	const rootDir = homedir();
	const subtitlesDirectory = `${rootDir}/Downloads/Tafsiri`;
	const path = `${rootDir}/Downloads/Tafsiri/${filename}`;

	await exists(subtitlesDirectory, (exists) => {
		exists ? null : mkdirSync(`${rootDir}/Downloads/Tafsiri`)
	});

	await fs.writeFile(path, '', () => {
		pipeline(
			got.stream(url),   			// gets subtitle file as stream from url                 
			fs.createWriteStream(path)      // writes to file via a writestream
		)
		.then((result) => {
			return true
		})
		.catch(e => console.log(e));
	})

	return false;
}


export { getFile,getURL };

