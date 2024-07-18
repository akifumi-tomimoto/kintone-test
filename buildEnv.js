import axios from 'axios';
var fs = require("fs");

const appListJson = JSON.parse(fs.readFileSync("./appsList.json", "utf-8"));
console.log(appListJson);

axios.get(`${process.argv[2]}k/v1/apps.json?spaceIds=${process.argv[3]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[5]}`}})
  .then(response => {
    var envText = '';
    response.data.apps.forEach(app => {
        if (appListJson[app.name] != undefined)
        envText += `VITE_${appListJson[app.name]}=${app.appId}\n`;
    });
    try {
        var mode = 'local'
        if (process.argv[4] != undefined) {
            mode = process.argv[4]
        }
        fs.writeFileSync(`.env.${mode}`, envText);
    } catch(e){
        console.log(e);
    }
  })
  .catch(error => {
    console.log('error has occured: ', error);
  });