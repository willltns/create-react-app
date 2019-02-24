import './page2.css'

import React from 'react'
import { connect } from 'react-redux'

import { page2Load } from '../../actions/page2Action'

class Page2 extends React.Component {
  componentDidMount() {
    this.props.dispatch(page2Load())
  }

  render() {
    const { page2Loading } = this.props

    return <div className="page2">Page2 --> {`${page2Loading}`}</div>
  }
}

const mapState = state => ({
  xxx: state.common.xxx,
  page2Loading: state.page2.page2Loading,
})

export default connect(mapState)(Page2)
