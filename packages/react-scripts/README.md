[package location](https://github.com/willltns/create-react-app/tree/release/packages/react-scripts)

`react` & `react-router` & `redux` & `redux-saga` & `axios`...

Project structure template is placed in  `create-react-app/packages/react-scripts/template` directory.

`.template.dependencies.json` file configs the dependencies of this project and will be automatically installed while initializing.

Following is modified files relative to official react-scripts.

Every newly added or modified place is commented a `@willltns` mark.

`create-react-app/packages/react-scripts/config/webpack.config.js`.

`create-react-app/packages/react-scripts/scripts/init.js`. 

`create-react-app/packages/react-scripts/package.json`. (some dependencies dependent after modified).

And finally one new file `create-react-app/packages/react-scripts/config/customPlugins.js` required by `webpack.config.js`.

---
---
---

# react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.
