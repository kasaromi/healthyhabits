import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class Habits extends Component {
  render() {
    return (
      <div className='habits-container'>
        <h2>Habits</h2>
        <div id='add-habit'>
          <span>+ Add new habit</span>
          <div className='add-habit-htmlForm'>
            <label htmlFor='habit-name'>Label your Habit:</label>
            <input name='habit-name'/> <br />
            <label htmlFor='frequency'>Set the Frequency:</label>
            <select name='frequency'>
              <option value='daily'>daily</option>
              <option value='every other day'>every other day</option>
              <option value='week days'>week days</option>
              <option value='weekly'>weekly</option>
            </select> <br />
            <label htmlFor='startDate'>Start Date:</label>
            <input type='date' name='startDate'/> <br />
            <label htmlFor='endDate'>End Date:</label>
            <input type='date' name='endDate'/>
          </div>
        </div>
        <div className='habits-list'>
          <h3>Track your habit</h3>
          <ul>
            <li>first habit</li>
          </ul>
        </div>
      </div>
    )
  }
}
