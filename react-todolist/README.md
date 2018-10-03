# react-todolist

### 对比React.js与Vue.js
在项目架构时，我们什么时候选用React.js，什么时候选用Vue.js那？
React.js相对于Vue.js，它的灵活性更大一些，所以在处理一些非常复杂的系统的时，有的技术方案水更多一点的选择React.js；而Vue.js提供了更丰富的API，但因为API多，所以它的灵活性就有一定限制了。在做一些面向用户端的一些复杂度较小的项目时，用Vue会更爽一些。当然，Vue.js也可以做一些非常大的项目。

#### state,props与render函数的关系
当组件的state或props发生改变时，组件的render函数会自动被执行。
当父组件的render函数被运行时，它的子组件render都将被重新运行

#### React中的视图更新与虚拟DOM
当数据发生变化时，React如何修改DOM的流程：
1. state 数据
2. JSX 模板
3. 生成虚拟DOM (虚拟DOM就是一个JS对象，他用来描述真实的DOM)
  ```
   ['div', {id: 'abc'}, ['span', {}, 'Hello']]
  ```
4. 用虚拟DOM的结构，生成真实的DOM
  ```
   <div id="abc"><span>Hello!</span></div>
  ```
4. 数据state 发生改变
5. 数据 + 模板 生成新的虚拟DOM
  ```
   ['div', {id: 'abc'}, ['span', {}, 'World!']]
  ```
7. 比较原始虚拟DOM和新虚拟DOM的区别(diff算法)，找到区别是span中的内容
8. 操作DOM，只改变span中的内容

VDOM优点：
1. 性能得到提升
2. 它使得跨端应用( React Native )得以实现。在浏览器端是将虚拟DOM转换为一个个的浏览器DOM节点。而如果将他转换为原生应用的组件，那么跨端应用就能得到实现。
#### 为什么使用VDOM极大的提升了性能？
1. 虚拟DOM的使用让页面只重新生成数据变更的DOM，而不是把整个页面重新绘制出来。
2. 虚拟DOM其实就是JS对象。在比较数据哪里发生变化的时候效率极高。如果去生成一个真实的DOM树和已有的DOM树比较效率是很低的，因为JS生成DOM树会调用web application级的API，这种级别的API性能损耗是很大的。
#### diff算法
**合并多次setState**

setState被设计为一个异步的方法，目的是为了提升React底层的性能。假设我们短时间内连续变更3次state，React就会把这3次setState合并为一次setState，只做一次VDOM的比对，提高了整体的性能。

**同级比较**

diff算法会从根节点开始，一层层的向下比较，如果在某一层的某个节点发现不同了，他就会直接替换这个节点下面的所有子树。

**key值的重要性**

如果每一个虚拟DOM节点没有一个key值，他就没有自己的一个名字。当我们在做新旧虚拟dom的比对时，旧状态的虚拟节点就与难以与新状态的虚拟节点之间确立关系。当每一个虚拟节点都有唯一key值时，新旧状态的虚拟节点很快就能知道谁是谁，这样就极大的提升了diff算法的效率。

**为什么不要将数组的下标作为key值**

假如数组中又3个节点a,b,c。我们使用数组下标来作为dom的key值。
[a, b, c] // 0:a, 1:b, 2:c
这时删除b
[a, c] // 0:a, 1:c
原来key值为1对应节点为b, 但现在key=1对应的节点变成了c。这时这个key值就失去了它存在的意义了。
所以，为key值绑定一个稳定的值才是正确的做法




#### 理解JSX
JSX描述的节点虽然看起来很像DOM，但它只是一个模板而已，本质上来讲，它只是为 React.createElement(component, props, ...children) 方法提供的语法糖。
```
<MyButton color="blue" shadowSize={2}> Click Me </MyButton>
```
编译为：
```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```


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

#### React函数式编程带来的几个好处
 - 维护起来较为容易，当函数比较大的时候可以进行拆分
 - 在自动化测试中，如果项目都是函数式编程，那么测试起来就变得很容易。只需要给函数一个输入值，然后Assert函数是否返回预期值就可以了。
