import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {sayHello} from '../../actions/index.js'
import LoginForm from './LoginForm.js'

export default class Login extends Component {
  render () {
    console.log(this.props.thing)
    return (
      <div>
        <LoginForm
          buttonName='Login'
          containerName='login-container'
          handleClick={this.props.sayHello}
        />
        <LoginForm
          buttonName='Sign Up'
          containerName='signup-container'
        />
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
