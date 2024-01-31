// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'

import {v4} from 'uuid'
import AppoinmentItem from '../AppoinmentItem'

class Appointments extends Component {
  state = {
    textInput: '',
    dateInput: '',
    isFilter: false,
    appoinmentList: [],
  }
  onChangeTextInput = event => {
    this.setState({textInput: event.target.value})
  }
  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }
  toggleIsStarred = id => {
    this.setState(prevState => ({
      appoinmentList: prevState.appoinmentList.map(each => {
        if (id === each.id) {
          return {...each, isFavourite: !each.isFavourite}
        }
        return each
      }),
    }))
  }
  onFilter = () => {
    const {isFilter} = this.state
    this.setState({isFilter: !isFilter})
  }
  onAddAppoinment = event => {
    event.preventDefault()
    const {textInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppoinment = {
      id: v4(),
      title: textInput,
      date: formattedDate,
      isFavourite: false,
    }
    this.setState(prevState => ({
      appoinmentList: [...prevState.appoinmentList, newAppoinment],
      textInput: '',
      dateInput: '',
    }))
  }
  renderAppoinment = () => {
    const {appoinmentList, isFilter} = this.state
    if (isFilter) {
      return appoinmentList.filter(each => each.isFavourite === true)
    }
    return appoinmentList
  }
  render() {
    const {textInput, dateInput, isFilter} = this.state
    const filteredAppoinments = this.renderAppoinment()
    return (
      <div className="app-container">
        <div className="container">
          <div>
            <form onSubmit={this.onAddAppoinment}>
              <h1>Add Appoinment</h1>
              <label htmlFor="text">TITLE</label>
              <input
                type="text"
                value={textInput}
                onChange={this.onChangeTextInput}
                id="text"
                placeholder="title"
              />
              <label htmlFor="date">DATE</label>
              <input
                id="date"
                type="date"
                value={dateInput}
                onChange={this.onChangeDateInput}
                placeholder="dd/mm/yyyy"
              />
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appoinments"
            />
          </div>
          <hr />
          <div>
            <h1>Appoinments</h1>
            <button type="button" onClick={this.onFilter}>
              Starred
            </button>
          </div>
          <ul>
            {filteredAppoinments.map(each => (
              <AppoinmentItem
                key={each.id}
                details={each}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
