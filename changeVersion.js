import fs from 'fs';

const pkg = fs.readFileSync('./package.json', 'utf-8');
const config = JSON.parse(pkg);

const updateList = ['major', 'minor', 'patch'];
const version = config.version;
const versionList = version.split('.').map(Number);

const argv = process.argv.slice(2);
const updateInfo = argv.reduce((prev, next) => {
  const [key, value] = next.split('=');
  prev[key] = value;
  return prev;
}, {})

// 默认更新 patch
updateInfo['--update'] = updateInfo['--update'] || 'patch';
const index = updateList.indexOf(updateInfo['--update'])

// 参数不正确终止程序
if(index < 0){
  throw(`请检查 --update 参数，仅支持 ${updateList.join('｜')}`)
}

const newVersion = versionList[index] + 1;
versionList.splice(index, 1, newVersion);

let newVersionList = [...versionList];
newVersionList = [...newVersionList.slice(0, index + 1), ...Array(versionList.slice(index + 1).length).fill(0)];

config.version = newVersionList.join('.');

fs.writeFileSync('./package.json', JSON.stringify(config, null, 2), 'utf-8');
