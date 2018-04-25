## cookie
`cookie`指的是用户终端存储的数据，通常最多能存储的大小是`4kb`。它可以用来存储用户的一些身份信息，借助`session`机制来进行身份验证。浏览器的每次请求，都会带上相应的`cookie`到服务器端。

### cookie 属性
`cookie`可以存储一些数据，也有一些属性对数据进行了描述。这些属性规定了数据的访问规则、过期规则等。通过这些属性来完成对`cookie`中数据的管理。`cookie`数据的属性包含以下几种：
  - Expires：`cookie`的最长有效时间，形式为符合 HTTP-date 规范的时间戳.
  - Max-Age: `cookie`从设置到失效的时间长度，单位是秒。优先级比`Expires`高。比如设置了`Max-age=1000`，那么这个`cookie`将在`1000s`后过期
  - Domain：`cookie`可以送达的主机名。比如设置了`Domain=demo.com`,那么只有主机域名在`demo.com`及其子域名下时才会发送`cookie`
  - Path：指定一个 `URL` 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置了`Path=/a`，那么只有请求中带有`a`路径时`cookie`才会被发送。
  - Secure：如果设置了该属性，那么只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器
  - HttpOnly： 如果设置了该属性，那么客户端将无法操作这个`cookie`
  - SameSite： 可以通过设置这个规则，来防止`cookie`在跨越请求时被发送，通过这个方式可以防范`CSRF`攻击。

### cookie的操作
#### 服务器端
`cookie`一般是由服务器端进行初始化，一个简单的设置`cookie`的格式可以用如下方式表示：
```
Set-Cookie: <cookie-name>=<cookie-value>
```

当用户代理发送一个请求时，在请求的`response`中可以这样设置：
```js
response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
```
如果服务器端设置了`cookie`，那么`response`的`http`报文一般可以是下面这个样子：
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: type=ninja
Set-Cookie: language=javascript
...
```
#### 客户端
在浏览器获得这个`response`之后，便会在客户端种下一个`cookie`，利用`document`上的接口可以进行查看和修改， `cookie`的每个值通过分号来进行分隔
```js
const cookies = document.cookie
console.log(cookies) // 'type=ninja;language=javascript'
```
如果你需要修改`cookie`, 那么可以可以利用这个接口
```js
document.cookie = 'userId=123'
```
这时会给`cookie`加上一个`userId`的值。如果这个是否发一个`http`请求给服务器，那么这个请求便会带上`cookie`。请求报文可以是下面这个样子：
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: type=ninja; language=javascript; userId=123;
...
```
在开发过程中，一般会对`document.cookie`进行接口封装，以此来达到对简化对`cookie`的操作。如下是一个简单的封装：
```js
class Cookie {
  setItem(value, config = {}) {
    const keys = Object.keys(config)
    const configStr = keys.map(k => `${k}=${config[key]}`).join(';')
    document.cookie = [escape(value), configStr].join(';')
  }
  getItem(key) {
    const cookie = document.cookie
    const cookieMap = cookie.split(';').reduce((acc, kv) => {
      const pairs = kv.split('=')
      acc[pairs[0]] = unescape(pairs[1])
      return acc
    }, {})
    return cookieMap[key]
  }
}
```
这样就可以通过`getItem`和`setItem`接口对`cookie`进行简单的操作。

### 参考资料
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
