import {execSync} from 'child_process';
import {glob} from 'glob';

const command = `npx kintone-customize-uploader --base-url $npm_package_config_baseurl --username ${secrets.ENV_USER_NAME} --password ${secrets.ENV_USER_PASSWORD} `;
const entries =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : glob.sync('src/apps/**/customize-manifest.json');
entries.forEach(file => {
  console.log('\nuploading... ', file);
  const result = execSync(command + file);
  console.log('\n' + result);
});