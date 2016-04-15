import React, { Component } from 'react'

export default class Rewards extends Component {
  render() {
    return (
      <div>
        <h2>HabitName</h2>
        <div className='status-container'>
          <h3>Status</h3>
          <p>In Progress</p>
        </div>
        <div className='rewards-container'>
          <h3>Badges</h3>
          <ul>
            <li>Completed habit for 1 week!</li>
          </ul>
        </div>
        <div className='progress-container'>
          <h3>Progression</h3>
          <p>Content to be determined</p>
        </div>
      </div>
    )
  }
}
