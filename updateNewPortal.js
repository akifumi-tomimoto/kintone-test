import axios from 'axios';
var fs = require("fs");

async function main() {
  try {
    const newPortalTxt = fs.readFileSync("./new_portal.txt", "utf-8");
    console.log(newPortalTxt);
    await axios.put(`${process.argv[2]}k/v1/space/body.json`, {id: process.argv[3], body: newPortalTxt}, {headers: {'X-Cybozu-Authorization': `${process.argv[4]}`}});
  } catch(error) {
    console.log('error has occured: ', error);
  }
}

main();