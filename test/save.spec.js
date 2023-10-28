import assert from "assert";
import mocha from "mocha";

import { getFile,getURL } from "../lib/downloader/save.js";

describe("Tests all functions involving saving of downloaded files",() => {

	beforeEach(()=>{
		
	});

	it("tests if url is returned from getURL function", async () => {
		const [res,name] = await getURL("Ozark",2,4,"spa");
		assert(res.includes("https") === true);
	}).timeout(5000);

    
	it("tests if file is downloaded", async () => {
		const file = await getFile("trial.srt.zip","https://dl.opensubtitles.org/en/download/src-api/vrf-19ac0c4f/sid-lYWM2GArhpPCIN6f7Dq8w463K39/filead/1956065123.gz");
		assert(file === true);
	}).timeout(5000);


})
