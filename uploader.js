import {execSync} from 'child_process';
import {glob} from 'glob';

console.log(process.argv[4])
console.log(process.argv[5])
console.log(process.argv[6])
const command = `npx kintone-customize-uploader --base-url ${process.argv[4]} --username ${process.argv[5]} --password ${process.argv[6]} `;
const entries =
  process.argv.slice(2).length > 0
    ? process.argv.slice(2)
    : glob.sync('src/apps/**/customize-manifest.json');
entries.forEach(file => {
  console.log('\nuploading... ', file);
  const result = execSync(command + file);
  console.log('\n' + result);
});