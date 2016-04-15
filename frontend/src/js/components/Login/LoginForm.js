import React, { Component } from 'react'

export default class LoginForm extends Component {
  render() {
    return (
      <div className={this.props.containerName}>
      <h2>{this.props.buttonName}</h2>
      <input type='text' name='username' placeholder='username'/>
      <input type='password' name='password' placeholder='password'/>
      <button type='submit' onClick={this.props.handleClick}>{this.props.buttonName}</button>
      </div>
    )
  }
}
