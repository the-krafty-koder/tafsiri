import * as mocha from "mocha";
import * as assert from "assert" ;
import { searchInOpen } from "../lib/fetcher/fetch.js";


describe("Fetch functions",()=>{

	it("tests if online search requests returns response",()=>{
		//const searchInOpenGen = searchInOpen("ozark",2,4,"spa");

		(async function() {
			for await (let num of searchInOpen("ozark",2,4,"spa")) {
				console.log(num);
			}
		})();
		
	});

});