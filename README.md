# text

> a bookvenue project
本项目是基于taro的场地预订小程序

## Build Setup

``` bash
# 1.需要使用 npm 或者 yarn 全局安装@tarojs/cli
##使用 npm 安装 CLI
npm install -g @tarojs/cli
## OR 使用 yarn 安装 CLI
yarn global add @tarojs/cli
## OR 安装了 cnpm，使用 cnpm 安装 CLI
cnpm install -g @tarojs/cli

# 2.需要使用 npm 或者 yarn 全局安装@tarojs/cli
## 进入项目
cd myApp
## 使用 yarn 安装依赖
yarn
## OR 使用 cnpm 安装依赖
cnpm install
## OR 使用 npm 安装依赖
npm install


# 3.运行项目
## 3.1微信小程序
### yarn
yarn dev:weapp
yarn build:weapp
### npm script
npm run dev:weapp
npm run build:weapp
### 仅限全局安装
taro build --type weapp --watch
taro build --type weapp
### npx 用户也可以使用
npx taro build --type weapp --watch
npx taro build --type weapp


## 3.2百度小程序
### yarn
yarn dev:swan
yarn build:swan
### npm script
npm run dev:swan
npm run build:swan
### 仅限全局安装
taro build --type swan --watch
taro build --type swan
### npx 用户也可以使用
npx taro build --type swan --watch
npx taro build --type swan

## 3.3 H5

### H5 预览项目
yarn dev:h5
### npm script
npm run dev:h5
### 仅限全局安装
taro build --type h5 --watch
### npx 用户也可以使用
npx taro build --type h5 --watch

### H5 打包项目
### yarn
yarn build:h5
### npm script
npm run build:h5
### 仅限全局安装
taro build --type h5
### npx 用户也可以使用
npx taro build --type h5

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
