## 内容安全策略(Content-Security-Policy)
内容安全策略(CSP)相当于定义了一个白名单，允许哪些资源能加载和执行，并设置加载的规则。而且对于不合法的资源可以进行上报。

`CSP`增强了网页的安全性，资源的来源限定在了可靠的来源，减少了了诸如`XSS`之类的安全风险。`CSP`在一开始便被设计为能向后兼容，即使在不支持`CSP`的用户代理(比如浏览器)上也不会出现问题。

浏览器的`CSP`功能可以根据如下两种方式进行开启：
  1. 设置`http`头部的`Content-Security-Policy`属性。
  2. 利用`html`里的`<meta>`元素来开启。

推荐的比较灵活的方式就是利用`http`的头部进行配置。
以`nodejs`为例，可以通过以下方式设置`CSP`
```js
const csp = [
  "default-src 'self'",
  'img-src *',
  'media-src media.com',
  'script-src script.example.com'
].join(';')

res.setHeader('Content-Security-Policy', csp)
```
那么在接收到这个请求的浏览器中，如果该浏览器支持`CSP`， 那么它将使用如下策略：
  - 资源默认从文档所在的源进行加载
  - 图片可以从任意地方加载
  - 多媒体文件仅仅能从`media.com`域进行加载
  - 可运行脚本仅仅允许从`script.example.com`进行加载

通过这种限制资源的来源，来保证网站的安全，减少网络攻击的发生。

### 参考资料
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP
- https://jaq.alibaba.com/community/art/show?articleid=518
