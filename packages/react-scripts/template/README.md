### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Before run `npm run build`, Please see dll-related information below first.<br>

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.<br />

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

### Packing stable libs in one chunk. (dll vendor) (dllPlugin & dllReferencePlugin)
If you do not need dll vendor chunk, you should delete dll-related configuration in file `webpack.rewire.js`,
delete file `./src/common/utils/webpack.dll.js`, and ignore the steps below.

Or following the steps to build vendor file:
1. `yarn add webpack-cli clean-webpack-plugin assets-webpack-plugin -D`
2. In `package.json`, add new script command:
   ```json
   {
     "scripts": {
       "build:dll": "webpack --config ./src/common/utils/webpack.dll.js"
     }
   }
   ```
3. Execute command `yarn build:dll`, you'll get a vendor chunk. More configurations please edit `webpack.dll.js`.

### Code Formatting
Using `prettier`. If you do not need, you can delete `.prettierrc` file in the project's root dir.
and ignore steps below.

At first time project initial stage, you should manually install `prettier`, `husky`, `lint-staged`. 
1. Install related dependencies. 
   ```sh
   $ npm install prettier husky lint-staged --save-dev
   $ # or
   $ yarn add prettier husky lint-staged -D
   ```
2. In `package.json`, add properties:
   ```json
   {
     "husky": {
       "hooks": {
         "pre-commit": "lint-staged"
       }
     },
     "lint-staged": {
       "*.{js,jsx,json}": [
         "prettier --single-quote --trailing-comma es5 --write",
         "git add"
       ],
       "*.{css,less}": [
         "prettier --parser css --write",
         "git add"
       ]
     }
   }
   ``` 
When executing `git commit`, it would automatically formatting your code.

### Customizing Environment Variables for Arbitrary Build Environments
You can create an arbitrary build environment by creating a custom .env file and loading it using [env-cmd](https://www.npmjs.com/package/env-cmd).<br/>
[https://create-react-app.dev/docs/deployment/#customizing-environment-variables-for-arbitrary-build-environments](https://create-react-app.dev/docs/deployment/#customizing-environment-variables-for-arbitrary-build-environments)
   
### Adding Custom Environment Variables
`.env`. `.env.development`. `.env.production` ... 

[https://create-react-app.dev/docs/adding-custom-environment-variables/](https://create-react-app.dev/docs/adding-custom-environment-variables/).<br/>
[https://create-react-app.dev/docs/advanced-configuration/](https://create-react-app.dev/docs/advanced-configuration/).

### Analyzing the bundle size. (Visualizing)
1. webpack-bundle-analyzer
   - `yarn add webpack-bundle-analyzer -D`.
   - Add plugin instance to the wepback's `plugins` property:
		```javascript
		const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
		process.env.npm_config_analyze === 'true' && new BundleAnalyzerPlugin()
		```
   - Finally execute `npm run build --analyze`


2. Or the official recommended way --> [Analyzing the Bundle Size](https://create-react-app.dev/docs/analyzing-the-bundle-size/)

### ant-design
`yarn add antd` or `npm install antd --save`.
- Modularized antd
  1. `yarn add babel-plugin-import` or `npm install babel-plugin-import --save`.
  2. In `webpack.rewire.js`, add code:
  ```javascript
  babelOptions.plugins.push(["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }])
  ```
- [antd Customizing Theme](https://ant.design/docs/react/customize-theme-cn), `less-loader` -> `modifyVars`
    
### lodash
`yarn add lodash` or `npm install lodash --save`.

Recommend importing function through full module path, eg： `import debounce from 'lodash/debounce'`.

##### lodash tree shaking
1. Install related dependencies. 
   ```sh
   $ npm install lodash-webpack-plugin babel-plugin-lodash --save
   $ # or
   $ yarn add lodash-webpack-plugin babel-plugin-lodash
   ```
2. In `webpack.rewire.js` file, add code:
   ```javascript
   // merged this plugin into webpack's property `plugins`.
   const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
   new LodashModuleReplacementPlugin()

   // babel configuration.
   babelOptions.plugins.push(["lodash"])
   ```
