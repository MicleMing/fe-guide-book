## cookie
`cookie`指的是用户终端存储的数据，通常最多能存储的大小是`4kb`。它可以用来存储用户的一些身份信息，借助`session`机制来进行身份验证。浏览器的每次请求，都会带上相应的`cookie`到服务器端。

### cookie的设置及获取
`cookie`一般是由服务器端进行初始化，当用户代理发送一个请求时，在请求的`response`中可以这样设置：
```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
```
在浏览器获得这个`response`之后，便会在客户端种下一个`cookie`，利用`document`上的接口可以进行查看和修改， `cookie`的每个值通过分号来进行分隔
```js
const cookies = document.cookie
console.log(cookies) // 'type=ninja;language=javascript'
```
如果你需要修改`cookie`, 那么可以可以利用这个接口
```js
document.cookie = 'userId=123'
```
这时会给`cookie`加上一个`userId`的值


### cookie 的属性

