import React, { Fragment } from 'react'

class Todolist extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      value: '',
      todos: []
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  handleInput(e) {
    this.setState({'value': e.target.value})
  }

  handleSubmitClick() {
    this.setState({'value': ''})
    this.setState({'todos': [...this.state.todos, {value: this.state.value, id: this.state.todos.length}]})
  }

  render() {
    return (
      <Fragment>
        <div>
          <input 
          onChange={this.handleInput}
          value={this.state.value} 
          
          />
          <button onClick={this.handleSubmitClick}>提交</button>
        </div>
        <ul>
          {
            this.state.todos.map((todo)=>(
              <li key={todo.id}>{todo.value}</li>
            ))
          }
        </ul>
      </Fragment>
    )
  }
}

export default Todolist
