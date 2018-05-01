## HTTP报文
### 报文结构
报文分为请求报文和相应报文，大概是长这么个样子

请求报文可能是这样的
```
GET /index.html HTTP/1.1
Accept: text/html
Accept-Encoding: gzip, deflate
Connection: keep-alive
HOST: www.demo.com
```

响应报文可能是这样的
```
HTTP/1.1 200 OK
Date: Tue, 01 May 2018 03:29:38 GMT
Connection: keep-alive
Content-Encoding: gzip
Content-Type: text/html; charset=UTF-8
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
....
```
这两个报文大概的意思就是

客户端对服务器端说：嗨，哥们，我要`index.html`的资源，我使用的http协议版本是`1.1`, 接受的资源类型预期是`html`, 而且支持`gzip`压缩（不行的话给我`deflate`压缩的也行）我们的连接是最好是要可以复用的，这样就不用不断的建立连接。我的地址是`www.demo.com`

服务器听到客户端发来的信息后，发现这个请求时合理的，于是便给客户端回复：如你所愿，你要的数据是：`<html>.....balalbalabala`

通过客户端与服务器端的一请求一回答的方式，形成了基于`http`协议的通讯方式。可以理解为`http`协议是规定了数据在通讯上的格式（一种约定）, 客户端和服务器端都通过遵循这种约定来理解双方所表述的内容。

那我们来介绍下双方的`约定`。

对于请求报文， 由于是请求，所以它需要有一个请求的意图类型，常用的请求的类型可以分为以下几种：
  - GET
  - POST
  - PUT
  - DELETE
  - HEAD
  - OPTIONS

表示请求类型的描述会放到请求报文的第一行，称之为`请求行`
```
GET /index.html HTTP/1.1
```
请求类型后面跟着的是资源的URL和http的版本， http在出现到现在经历了0.9, 1.0, 1.1, 2.0 这几个版本，每个版本都会所有不同。目前使用广泛的是`http1.1`版本。

在`请求行`之后，跟着的便是首部`header`， 首部的作用是用来在客户端和服务器端附加一些的信息，这些信息指导着双方的一些行为，比如压缩、缓存控制等


- 请求行
- 首部
- 实体

### 参考资料
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- [图解http](https://book.douban.com/subject/25863515/)
