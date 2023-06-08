# 说明文档

## `cxw`: 一个帮助你快速搭建和开发前端项目的CLI

> 想不起来其他名字，以这个命名吧~

如何安装？

```shell
npm install cxw -g
```

## 创建项目

目前支持React, Vue

创建项目

```shell
cxw create your_project_name
```

自动拉取项目模板、安装项目依赖、打开浏览器 `http://localhost:8080/`、自动启动项目

### 选择框架

你可以选择安装项目模版:

? 请选择框架名称  

1) React        
2) Vue

### 安装依赖

React项目模块已经默认帮你配置：

- 常用的目录结构（你可以在此基础上修改）
- axios（网络请求axios的安装以及二次封装）

你可以选择支持的依赖:

* 是否支持TS?

* 是否安装ESLint?
  
   默认安装: eslint、eslint-plugin-react、,诺为ts环境,则增加安装@typescripteslint/eslint-plugin、@typescript-eslint/parser)

* 是否支持scss?

* 是否支持less?

## 项目开发

项目开发目前提供三个功能：

* 创建React组件
* 创建React页面
* 创建store

### 创建react组件

 默认会根据样式loader添加的样式文件 index.css(默认) ,index.scss, index.less

```shell
cxw addcpn YourComponentName 
# 例如cxw addcpn NavBar，默认会存放到src/components文件夹中
cxw addcpn YourComponentName -d src/components/home 
# 也可以指定存放的具体文件夹
```

### 创建Vue页面

默认会根据样式loader添加的样式文件 index.css(默认) ,index.scss, index.less

```shell
cxw addcpn YourComponentName 
# 例如cxw addcpn NavBar，默认会存放到src/components文件夹中
cxw addcpn YourComponentName -d src/pages/home 
# 也可以指定存放的具体文件夹
```



### 创建store

```shell
cxw addstore YourVuexChildModuleName 
# 例如cxw addstore home，默认会放到src/store/modules下
cxw addstore YourVuexChildModuleName -d src/vuex/modules 
# 也可以指定文件夹
```
