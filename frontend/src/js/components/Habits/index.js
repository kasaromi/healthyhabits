import React, { Component } from 'react'
import { connect } from 'react-redux'
import HabitsForm from '../HabitsForm/index.js'

class Habits extends Component {
  render () {
    if (!this.props.habits) {
      return (
        <div>
          <div>Add a habit...</div>
          <HabitsForm />
        </div>
      )
    }
    return (
      <div>
        <ul>
        {this.props.habits.habits.map((n, i) => {
          return (
            <li
              key={i}
            >
              <span>{n.habit}</span>
              {n.completed.map((element, index) => {
                return (
                  <button
                    style={{
                      backgroundColor: element === 'no' ? 'red' : 'green'
                    }}
                    key={index}
                  >day {index + 1}
                  </button>
                )
              })}
            </li>
          )
        })}
        </ul>
        <HabitsForm />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    habits: state.habits
  }
}

export default connect(mapStateToProps)(Habits)
