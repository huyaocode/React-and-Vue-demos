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