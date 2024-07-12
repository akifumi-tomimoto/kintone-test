import axios from 'axios';

async function main() {
  try {
    const targetSpaceResponse = await axios.get(`${process.argv[2]}k/v1/space.json?id=${process.argv[3]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[6]}`}});
    var targetSpaceBody = targetSpaceResponse.data.body;

    const fromSpaceAppIdsResponse = await axios.get(`${process.argv[4]}k//v1/apps.json?spaceIds=${process.argv[5]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[6]}`}});
    var fromSpaceAppNameToAppId = {};
    fromSpaceAppIdsResponse.data.apps.forEach(app => {
      fromSpaceAppNameToAppId[app.name] = app.appId;
    });
    const toSpaceAppIdsResponse = await axios.get(`${process.argv[2]}k//v1/apps.json?spaceIds=${process.argv[3]}`, {headers: {'X-Cybozu-Authorization': `${process.argv[6]}`}});
    var toSpaceAppNameToAppId = {};
    toSpaceAppIdsResponse.data.apps.forEach(app => {
      toSpaceAppNameToAppId[app.name] = app.appId;
    });
    // fromSpaceAppNameToAppIdとtoSpaceAppNameToAppIdからapp.codeが同一のものを探し、それぞれのapp_idをkey-valueで紐付ける
    var fromAppIdToToAppId = {};
    for (var key in fromSpaceAppNameToAppId) {
      if (toSpaceAppNameToAppId[key] != undefined) {
        fromAppIdToToAppId[fromSpaceAppNameToAppId[key]] = toSpaceAppNameToAppId[key];
      }
    }
    // fromAppIdToToAppIdを元に、文字列であるtargetSpaceBodyの`k/{app_id}`のapp_idを更新する
    for (var key in fromAppIdToToAppId) {
      console.log(`update space_id: ${key} => ${fromAppIdToToAppId[key]}`)
      targetSpaceBody = targetSpaceBody.replace(`/k/${key}/`, `/k/${fromAppIdToToAppId[key]}/`);
    }
    await axios.put(`${process.argv[2]}k/v1/space/body.json`, {id: process.argv[3], body: targetSpaceBody}, {headers: {'X-Cybozu-Authorization': `${process.argv[6]}`}});
  } catch(error) {
    console.log('error has occured: ', error);
  }
}

main();