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
    //console.log('componentWillReceiveProps')
  }

  //提升性能，当父组件被重新渲染时，不需要子组件重新渲染
  //当用户在父组件上输入文字时，父组件的render函数会执行，
  //但是每一个子组件即每一个todo并没有发生改变，它只是添加与删除，内部不会发生改变。
  //所以对于父组件发生变化而子组件不变的情况，使用shouldComponentUpdate会提升性能。
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.content === this.props.content) {
      return false;
    } else {
      return true;
    }
  }

  render () {
   // console.log('child render')
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