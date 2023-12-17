#!/bin/bash

# 脚本只要发生错误，就终止执行。
set -e

# 更新版本 --update=major|minor|patch
node changeVersion.js $2

# rollup打包
npm run build

# github 提交
git add .
git commit -m $1
git pull
git push

# npm 发布
npm publish

echo '发布完成'
