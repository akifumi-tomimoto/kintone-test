import axios from 'axios';
var fs = require("fs");

axios.get(`${process.argv[2]}k/v1/apps.json?spaceIds=${process.argv[3]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[5]}`}})
  .then(response => {
    var envText = '';
    response.data.apps.forEach(app => {
        if (app.code.length > 0)
        envText += `VITE_${app.code}=${app.appId}\n`;
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