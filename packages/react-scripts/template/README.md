### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

### 不同生产测试环境

[针对不同生产环境自定义环境变量](https://create-react-app.dev/docs/deployment/#customizing-environment-variables-for-arbitrary-build-environments)

例如，创建一个生产测试环境:

1. 根目录下创建一个名为 `.env.prodtest` 的文件
2. 设置区别于真实生产环境的生产测试环境变量 `.env.prodtest` file (e.g. `REACT_APP_API_URL=http://test.ltns.com`)
3. 安装 [env-cmd](https://www.npmjs.com/package/env-cmd)
   ```sh
   $ npm install env-cmd --save
   $ # or
   $ yarn add env-cmd
   ```
4. 在 `package.json` 中 `scripts` 字段下添加新的脚本命令，以针对构建打包的生产测试环境注入 `.env.prodtest` 文件配置的变量
   ```json
   {
     "scripts": {
       "build:test": "env-cmd -f .env.prodtest npm run build"
     }
   }
   ```

### `npm run analyzer`

生产环境代码打包可视化分析 `webpack-bundle-analyzer`.

或采用官方推荐方式 --> [Analyzing the Bundle Size](https://create-react-app.dev/docs/analyzing-the-bundle-size/)

## 代码格式化 ！！
初次创建项目时需手动安装 `prettier`, `husky`, `lint-staged`. 

`yarn add prettier husky lint-staged` or `npm install prettier husky lint-staged --save`.

`git commit` 时会自动格式化， 配置内容在根目录 `package.json` 文件内.

## 移动端动态适配注意事项 (mobile)
动态适配文件位置 `src\common\utils\flexible.js`.

默认已在 `index.html` 中引入.

**PC页面开发**请删除 `webpack.rewire.js` 文件相关copyPlugin配置参数 以及 `public/index.html` 中对 `flexible.js` 文件的引用.

## antd 配置
`yarn add antd` or `npm install antd --save`.
- antd 按需加载
  1. `yarn add babel-plugin-import` or `npm install babel-plugin-import --save`.
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
`.env`. `.env.development`. `.env.production` ... [添加自定义环境变量](https://create-react-app.dev/docs/adding-custom-environment-variables/). [高级配置](https://create-react-app.dev/docs/advanced-configuration/).

## 分离打包部分依赖库，提高构建速度 （dllPlugin & dllReferencePlugin）
`.env`文件：
```
REACT_APP_DLL_INJECT=false // 配置此参数将不会将打包的依赖bundle注入index.html.
REACT_APP_DLL_LIBS=["react", "react-dom", "redux", "axios", "qs"] // 配置分离依赖库， 此示例为默认.
```

