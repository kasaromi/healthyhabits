import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import {sayHello} from '../../actions/index.js'
import LoginForm from './LoginForm.js'

export default class Login extends Component {
  render () {
    console.log(this.props.thing)
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
