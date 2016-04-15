import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkUser } from '../../actions/'

import LoginForm from './LoginForm.js'

class Login extends Component {
  render () {
    console.log(this.state)
    return (
      <div>
        <LoginForm buttonName='Login' containerName='login-container' onClick={this.props.checkUser}/>
        <LoginForm buttonName='Sign Up' containerName='signup-container' />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({checkUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
