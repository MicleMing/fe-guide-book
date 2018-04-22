## 视觉格式模型
视觉格式模型描述的是浏览器如何将`Dom Tree`可视化的渲染出来， 在视觉格式化模型中，每个元素都会生成`0~N` 个盒子，这些盒子通过一定的规则进行排列及尺寸计算。

### 盒子模型（Box Model）
既然每个元素都可能会生成盒子，那么先来了解一下什么是盒子。在`css`中，盒模型描述的是在DOM树中的元素生成的一个长方形的盒子，并且会根据一定的规则布局在浏览器的页面中。
<br/>
每一个盒子都包括内容区(content)、填充区(padding)、边框(border)、页边空白(margin)

![box](./images/css_box.jpg)

所以整个盒子的尺寸计算是：`content + padding + border + margin`
这些组成部分决定了盒子的尺寸计算， 在标准的尺寸计算模型中，`content`的大小是由被渲染的元素决定的，很多因素会决定元素内容渲染的尺寸，比如这个元素的`width`和`height`属性、元素包含的其他盒子等。
<br/>
但是在怪异模式下，`width`和`height`是等于`content + padding + border + margin`, 有时候为了方便布局，可以利用利用如下方式切换标准模式到该模式下：
```css
box-sizing: border-box
```

### 文档流 (Normal Flow)
