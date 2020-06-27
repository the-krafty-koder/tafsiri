/*
subscene
opensubtitles
tvsubtitles
yifx
*/

import got from 'got';
import cheerio from 'cheerio';
import jsdom from "jsdom";
const { JSDOM } = jsdom;

import querystring from "querystring";

/**
  * searchInOpen* -> List
  * name,season,episode,language : String
  *
  * Returns a list containing name and links to each subtitle file
**/
async function* searchInOpen(name,season,episode,language){
	
	const link = `https://www.opensubtitles.org/en/search/sublanguageid-${language}/
	              season-${season}/episode-${episode}/moviename-${name}`;

	const response = await got(link);
	
	const dom = new JSDOM(response.body);
	const rows = [...dom.window.document.querySelectorAll("#search_results tbody tr")]  // gets rows and filters
	                .filter(row=>row.innerHTML.includes(`S0${season}E0${episode}`))     // those relevant 
	                .filter(row=>row.outerHTML.includes("change"));

	for(let row of rows){
		let $$ = cheerio.load(row.innerHTML);
		
		const name = $$.text().split("Watch")[0];  // obtains name
		const link = $$("a").attr("href");         // obtains link

		yield [name,link];
	};

};

export { searchInOpen };

