import React, {Component} from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  //即将要接受参数 && 父组件的render函数被重新
  //这个组件第一次出现在页面上是不会被执行的
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  render () {
    console.log('child render')
    const { content } = this.props;
    return (
      <li onClick={this.handleClick}>
        {content}
      </li>
    )
  }

  handleClick (){
    const {deleteItem, index} = this.props;
    deleteItem(index)
  }
}

//对属性进行校验
TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  index: PropTypes.number
}


export default TodoItem;