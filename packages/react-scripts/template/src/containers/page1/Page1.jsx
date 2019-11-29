import './page1.css'
import { ReactComponent as ReactLogo } from '../../common/img/ReactLogo.svg'

import React from 'react'

class Page1 extends React.Component {
  toLTNS = () => {
    window.open('https://github.com/willltns')
  }

  toReact = () => {
    window.open('https://reactjs.org/')
  }

  render() {
    return (
      <div className="page1">
        <h1 className="href-click" onClick={this.toLTNS}>WILL LTNS</h1>
        <span>&</span>
        <ReactLogo className="react-logo href-click" onClick={this.toReact}/>
      </div>
    )
  }
}

export default Page1
