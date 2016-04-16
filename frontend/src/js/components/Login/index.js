import React, { Component } from 'react'

export default class Login extends Component {
  render () {
    return (
      <div>
        <h2>Sign in with Twitter</h2>
        <a href='/user-details'><button>Sign In</button></a>
      </div>
    )
  }
}
