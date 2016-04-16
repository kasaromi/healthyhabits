import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {sayHello} from '../../actions/index.js'

export default class Login extends Component {
  render () {
    return (
      <div>
        <h2>Sign in with Twitter</h2>
        <a href='/user-details'><button>Sign In</button> </a>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    thing: state.thing
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({sayHello}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
