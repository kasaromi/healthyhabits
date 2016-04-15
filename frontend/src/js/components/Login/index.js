import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'


export default class Login extends Component {
  render () {
    return (
      <div>
        <div className='login-container'>
          <h2>Login</h2>
          <input type='text' name='username' placeholder='username'/>
          <input type='password' name='password' placeholder='password'/>
          <button type='submit'>Login</button>
        </div>
        <div className='signup-container'>
          <h2>Sign Up</h2>
          <input type='text' name='username' placeholder='username'/>
          <input type='password' name='password' placeholder='password'/>
          <button type='submit'>Sign Up</button>
        </div>
      </div>
    )
  }
}
