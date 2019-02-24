import './page1.css'
import { ReactComponent as ReactLogo } from '../../common/img/ReactLogo.svg'

import React from 'react'

class Page1 extends React.Component {
  render() {
    return (
      <div className="page1">
        <h1>WILL LTNS</h1>
        <span>&</span>
        <ReactLogo className="react-logo" />
      </div>
    )
  }
}

export default Page1
