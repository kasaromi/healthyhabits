import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class Habits extends Component {
  render() {
    return (
      <div className='habits-container'>
        <h2>Habits</h2>
        <div id='add-habit'>
          <span>+ Add new habit</span>
        </div>
        <div className='habits-list'>
          <ul>
            <li>first habit</li>
          </ul>
        </div>
      </div>
    )
  }
}
