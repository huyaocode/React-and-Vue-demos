# react-todolist

### 对比React.js与Vue.js
在项目架构时，我们什么时候选用React.js，什么时候选用Vue.js那？
React.js相对于Vue.js，它的灵活性更大一些，所以在处理一些非常复杂的系统的时，有的技术方案水更多一点的选择React.js；而Vue.js提供了更丰富的API，但因为API多，所以它的灵活性就有一定限制了。在做一些面向用户端的一些复杂度较小的项目时，用Vue会更爽一些。当然，Vue.js也可以做一些非常大的项目。

#### Fragment
比如我们在做flex布局的时候，我们不希望元素的外层再套一个div元素。
如果我们要在外层包一个元素，同时这个元素不会出现在真正的DOM树中，这个时候我们就可以使用Fragment
```
import React, { Fragment } from 'react'
```
```
render() {
  return (
    <Fragment>
        <!-- many items -->
    </Fragment>
  )
}
```

#### className
JSX标签中的class要更换为className

#### lable
在JSX中，lable标签中的for会与循环的for产生歧义，所以需要将lable标签中的for改为htmlFor
```
<label htmlFor="inputArea">这是一个lable </label>
<input id="inputArea" value={this.state.value}/>
```

#### 删除列表中的项
在React中有immutable的概念，即不要直接去修改state。当我们需要修改state时我们需要拷贝一份独立的副本，通过修改副本的方式修改值。
```
let todos = [...this.state.todos]
todos.splice(index, 1)
this.setState({todos: todos})
```

#### JSX中的注释
```
{/*多行或普通注释*/}
{
  //单行注释必须换行，否则就会把//后面的 "}" 号视为一个普通的字串
}
```

#### 处理不想转义的字符串
dangerouslySetInnerHTML是React提供的替换浏览器DOM中的innerHTML接口的一个函数。
```
function MyComponent() {
  return <div dangerouslySetInnerHTML = {
    {__html: someStr}
  } />;
}
```

#### setState(updater, callback)
带签名的updater函数：
```
(prevState, props) => stateChange
```
我们最好将setSate写为：
```
this.setState(() => ({
  value: newValue
}))
```
#### 将render中的逻辑抽出来作为一个函数
React中的函数也是可以返回函数的，比如我们有一坨代码是map啥的，稍微有一些长，但又不值得作为一个组件单独定义。这时候就把他封装到一个函数中。