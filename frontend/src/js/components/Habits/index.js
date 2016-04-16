import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addNewAction } from '../../actions/index.js'

class Habits extends Component {
  render () {
    console.log(document.cookie.split('=')[1])
    const input = {}
    return (
      <div className='habits-container'>
        <h2>Habits</h2>
        <div id='add-habit'>
          <form className='add-habit-htmlForm'
            onSubmit={e => {
              e.preventDefault()
              console.log(input, '<<<input')
              this.props.addNewAction(input)
              input.sponsorName = ''
              input.sponsorName = ''
              input.sponsorName = ''
            }}
          >
            <label htmlFor='habit-name'>Label your Action:</label>
            <input name='habit-name'
              type='text'
              ref={node => {input.habitName = node}}
            /> <br />
            <label htmlFor='sponsor-name'>Sponsor's Name:</label>
            <input name='sponsor-name'
              type='text'
              ref={node => {input.sponsorName = node}}
            /> <br />
            <label htmlFor='sponsor-number'>Sponsor's Number:</label>
            <input name='sponsor-number'
              type='text'
              ref={node => {input.sponsorNumber = node}}
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

export default connect(null, mapDispatchToProps)(Habits)
