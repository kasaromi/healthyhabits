import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNewAction } from '../../actions/index.js'

class HabitsForm extends Component {
  render () {
    console.log(document.cookie.split('=')[1])
    let input1
    let input2
    let input3
    return (
      <div className='habits-container'>
        <h2>Habits</h2>
        <div id='add-habit'>
          <form className='add-habit-htmlForm'
            onSubmit={e => {
              e.preventDefault()
              this.props.addNewAction(input1.value, input2.value, input3.value)
              input1 = ''
              input2 = ''
              input3 = ''
            }}
          >
            <label htmlFor='habit-name'>Label your Action:</label>
            <input name='habit-name'
              type='text'
              ref={node => {input1 = node}}
            /> <br />
            <label htmlFor='sponsor-name'>Sponsor Name:</label>
            <input name='sponsor-name'
              type='text'
              ref={node => {input2 = node}}
            /> <br />
            <label htmlFor='sponsor-number'>Sponsor Number:</label>
            <input name='sponsor-number'
              type='text'
              ref={node => {input3 = node}}
            /> <br />
            <button type='submit'>Add a new Habit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({addNewAction}, dispatch)
}

export default connect(null, mapDispatchToProps)(HabitsForm)
