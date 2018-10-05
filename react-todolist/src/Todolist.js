import React, { Fragment } from 'react'
import axios from 'axios'
import TodoItem from './TodoItem'
import './style.css'

class Todolist extends React.Component {
  constructor(props) {
    super(props)
    //当组件的state或者props发生改变的时候，render函数就会重新执行
    this.state = {
      value: '',
      todos: []
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }
  //挂载前
  componentWillMount() {
    //console.log('componentWillMount')
  }
  //挂载后
  //他只会在页面挂载好的时候执行一次，所以把Ajax请求放在这里最合理
  componentDidMount() {
    //console.log('componentDidMount')
    axios
      .get('api/todolist')
      .then(() => {
        alert('succ')
      })
      .catch(() => {
        alert('fill')
      })
  }

  //更新前询问是否更新
  shouldComponentUpdate() {
    //console.log('shouldComponentUpdate')
    return true
  }
  //更新前
  componentWillUpdate() {
    //console.log('componentWillUpdate');
  }
  //更新后
  componentDidUpdate() {
    //console.log('componentDidUpdate');
    //console.log('');
  }
  //更新
  render() {
    //console.log('parent render')
    return (
      <Fragment>
        <div>
          <label htmlFor="inputArea">输入内容 </label>
          <input
            id="inputArea"
            onChange={this.handleInput}
            value={this.state.value}
          />
          <button className="submitBtn" onClick={this.handleSubmitClick}>
            提交
          </button>
        </div>
        <ol>{this.getTodoItem()}</ol>
      </Fragment>
    )
  }

  getTodoItem() {
    return this.state.todos.map((item, index) => {
      return (
        <TodoItem
          key={item}
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
    if (this.state.value !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos, prevState.value],
        value: ''
      }))
    }
  }

  handleItemDelete(index) {
    this.setState(prevState => {
      const list = [...prevState.todos]
      list.splice(index, 1)
      return { todos: list }
    })
  }
}

export default Todolist
