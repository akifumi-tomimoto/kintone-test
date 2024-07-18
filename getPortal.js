import axios from 'axios';
var fs = require("fs");

async function main() {
  try {
    const targetSpaceResponse = await axios.get(`${process.argv[2]}k/v1/space.json?id=${process.argv[3]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[4]}`}});
    const targetSpaceBody = targetSpaceResponse.data.body;
    fs.writeFileSync(`old_portal.txt`, targetSpaceBody);

    const fromSpaceAppIdsResponse = await axios.get(`${process.argv[5]}k//v1/apps.json?spaceIds=${process.argv[6]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[7]}`}});
    var fromSpaceAppNameToAppId = {};
    fromSpaceAppIdsResponse.data.apps.forEach(app => {
      fromSpaceAppNameToAppId[app.name] = app.appId;
    });
    const toSpaceAppIdsResponse = await axios.get(`${process.argv[2]}k//v1/apps.json?spaceIds=${process.argv[3]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[4]}`}});
    var toSpaceAppNameToAppId = {};
    toSpaceAppIdsResponse.data.apps.forEach(app => {
      toSpaceAppNameToAppId[app.name] = app.appId;
    });
    // fromSpaceAppNameToAppIdとtoSpaceAppNameToAppIdからapp.nameが同一のものを探し、それぞれのapp_idをkey-valueで紐付ける
    var fromAppIdToToAppId = {};
    for (var key in fromSpaceAppNameToAppId) {
      if (toSpaceAppNameToAppId[key] != undefined) {
        fromAppIdToToAppId[fromSpaceAppNameToAppId[key]] = toSpaceAppNameToAppId[key];
      }
    }
    // fromAppIdToToAppIdを元に、文字列であるtargetSpaceBodyの`k/{app_id}`のapp_idを更新する
    var convertSpaceBody = JSON.parse(JSON.stringify(targetSpaceBody));
    for (var key in fromAppIdToToAppId) {
      console.log(`update space_id: ${key} => ${fromAppIdToToAppId[key]}`)
      convertSpaceBody = convertSpaceBody.replace(`/k/${key}/`, `/k/${fromAppIdToToAppId[key]}/`);
    }
    convertSpaceBody = convertSpaceBody.replace(`${process.argv[5]}`, `${process.argv[2]}`);

    fs.writeFileSync(`new_portal.txt`, convertSpaceBody);
  } catch(error) {
    console.log('error has occured: ', error);
  }
}

main();