import React, { Fragment } from 'react'
import TodoItem from './TodoItem'
import './style.css'

class Todolist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      todos: []
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  render() {
    return (
      <Fragment>
        <div>
          <label htmlFor="inputArea">输入内容 </label>
          <input
            id="inputArea"
            onChange={this.handleInput}
            value={this.state.value}
          />
          <button className="submitBtn" onClick={this.handleSubmitClick}>提交</button>
        </div>
        <ol>{this.getTodoItem()}</ol>
      </Fragment>
    )
  }

  getTodoItem() {
    return this.state.todos.map((item, index) => {
      return (
        <TodoItem
          key={index}
          index={index}
          content={item}
          deleteItem={this.handleItemDelete}
        />
      )
    })
  }

  handleInput(e) {
    const inputValue = e.target.value
    this.setState(() => ({
      value: inputValue
    }))
  }

  handleSubmitClick() {
    if(this.state.value !== ''){
      this.setState(prevState => ({
        todos: [...prevState.todos, prevState.value],
        value: ''
      }))
    }
  }

  handleItemDelete(index) {
    this.setState((prevState) => {
      const list = [...prevState.todos]
      list.splice(index, 1)
      return { todos: list }
    })
  }
}

export default Todolist
