### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run test`

打包生产测试环境代码. 区别**测试环境变量** `process.env.PROTEST === 'PROTest'` 为 `true`.

### `npm run analyzer`

生产环境代码打包分析 `webpack-bundle-analyzer`.

## libraries & version control
注意根目录下 `package.json` `dependencies` **依赖版本控制**. 若有 `^`, 将其去掉.
```
"js-cookie": "2.2.0"
"blueimp-md5": "2.10.0"
...
// 以后部分关联项目可能会统一依赖库
```
每次安装依赖库应指定对应版本号. `e.g. yarn add react@16.6.0`.

## 代码格式化 ！！
初次创建项目时需手动安装 `prettier`, `husky`, `lint-staged`. 

`yarn add prettier husky lint-staged` or `npm install prettier husky lint-staged --save`.

`git commit` 时会自动格式化， 配置内容在根目录 `package.json` 文件内.

## 移动端自适配注意事项 (mobile)
自适配文件位置 `src\common\utils\flexible.js`.

默认已在 `index.html` 中引入.

**PC页面开发**请删除 `.env` 文件相关copyPlugin配置参数 以及 `public/index.html` 中对 `flexible.js` 文件的引用.

## antd 配置
`yarn add antd` or `npm install antd --save`.
- antd 按需加载
  1. `yarn add babel-plugin-import less` or `npm install babel-plugin-import less --save`.
  2. 根目录 `.babelrc` 文件配置内容:
  ```
  {
    "plugins": [
      [
        "import", 
        { 
          "libraryName": "antd", 
          "libraryDirectory": "es", 
          "style": true 
        }
      ]
    ]
  }
  ```
- antd 自定义主题 [相关链接](https://ant.design/docs/react/customize-theme-cn)

  根目录 `.env` 文件:
  
  `REACT_APP_ANTD_LESS_VARS={ "@primary-color": "#006789", "@btn-primary-bg": "red" }`
    

## lodash 使用注意
`yarn add lodash` or `npm install lodash --save`.

建议使用**全路径引用**， 例： `import debounce from 'lodash/debounce'`.

##### lodash tree shaking
1. `yarn add babel-plugin-lodash` or `npm install babel-plugin-lodash --save`.
2. `.babelrc` 文件:
    ```
    {
      "plugins": [
        ["lodash"]
      ]
    }
    ```
3. `.env` 文件添加自定义环境变量 `REACT_APP_LODASH_SHAKING=true`.

## Adding Custom Environment Variables
`.env`. `.env.development`. `.env.production` ... [添加自定义环境变量](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables). [高级配置](https://facebook.github.io/create-react-app/docs/advanced-configuration).

## Copies individual files or entire directories to the build directory.(将单个文件或整个目录复制到构建目录)
`.env`文件:
```
REACT_APP_COPY_FILES=[{ "from": "src/common/utils/flexible.js", "to": "./utils" }]
REACT_APP_COPY_OPTION={ "context": "./" }
```
具体配置查看 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin).

## 分离打包部分依赖库，提高构建速度 （dllPlugin & dllReferencePlugin）
`.env`文件：
```
REACT_APP_DLL_INJECT=false // 配置此参数将不会将打包的依赖bundle注入index.html.
REACT_APP_DLL_LIBS=["react", "react-dom", "redux", "axios", "qs"] // 配置分离依赖库， 此示例为默认.
```

