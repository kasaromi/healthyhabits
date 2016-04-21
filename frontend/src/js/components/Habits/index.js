import React, { Component } from 'react'
import { connect } from 'react-redux'
import HabitsForm from '../HabitsForm/index.js'
import { bindActionCreators } from 'redux'
import { getUserActions } from '../../actions/index.js'

class Habits extends Component {
  componentWillMount () {
    this.props.getUserActions()
  }

  render () {
    console.log(this.props.habits, '<--- this.props.habits')
    if (this.props.habits) {
      return (
        <div>
          <ul>
          {this.props.habits.map((n, i) => {
            console.log(n)
            return (
              <li
                key={i}
              >
                <span>{n}</span>
              </li>
            )
          })}
          </ul>
          <HabitsForm />
        </div>
      )
    } else {
      return (
        <div>
          <div>Add a habit...</div>
          <HabitsForm />
        </div>
    )
    }
  }
}

const mapStateToProps = state => {
  return {
    habits: state.getUserActions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getUserActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Habits)
