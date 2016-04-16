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
            <label htmlFor='habit-name'>Label your Action:</label>
            <input name='habit-name'/> <br />
            <label htmlFor='frequency'>Set the Frequency:</label>
            <select name='frequency'>
              <option value='daily'>daily</option>
              <option value='every other day'>every other day</option>
              <option value='week days'>week days</option>
              <option value='weekly'>weekly</option>
            </select> <br />
            <label htmlFor='reminder'>Set a Reminder:</label>
            <input name='reminder' type='time'/> <br />
            <label htmlFor='sponsor-name'>Sponsor's Name:</label>
            <input name='sponsor-name' type='text'/> <br />
            <label htmlFor='sponsor-number'>Sponsor's Number:</label>
            <input name='sponsor-number' type='number'/> <br />
            <a href='/addNewHabit'><button>Add</button></a>
          </div>
        </div>
      </div>
    )
  }
}
