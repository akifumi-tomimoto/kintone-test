import {execSync} from 'child_process';
import {glob} from 'glob';


const command = `npx kintone-customize-uploader --base-url ${process.argv[2]} --username ${process.argv[3]} --password ${process.argv[4]} `;
var env = "";
if (process.argv[5] != undefined) {
  env = `-${process.argv[5]}`
}
const entries = glob.sync(`src/apps/**/customize-manifest${env}.json`);
entries.forEach(file => {
  console.log('\nuploading... ', file);
  const result = execSync(command + file);
  console.log('\n' + result);
});