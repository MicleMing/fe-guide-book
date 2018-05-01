## HTTP报文
### 报文结构
报文分为请求报文和响应报文，大概是长这么个样子

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

#### 请求报文
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

#### 首部(header)
在`请求行`之后，跟着的便是首部`header`， 首部的作用是用来在客户端和服务器端附加一些的信息，这些信息指导着双方的一些行为，比如压缩、缓存控制等。`header`根据使用的范围可以分为以下四类
##### General header
请求和响应都能被使用, 常用的的通用首部有`Date`, `Cache-Control`, `Connection`, `Date`表示http报文的发送时间，`Cache-Control`则具体指明了在请求/响应过程中缓存的机制， 而`Connection`则指明这个网络连接是否是持久连接。
##### Request header
`Request header`是使用在请求里面的。比如`Accept`, `Accept-*`, `If-*`, `User-Agent`, `Cookie`, `Referer`等。
##### Response header
`Response header`是使用在响应报文的头部。比如`Age`, `Location`, `Server`等一些字段
##### Entity header
对报文中实体内容的描述, 在响应报文和请求报文中都可能出现, 比如: `Content-Length`,  `Content-Language`, `Content-Encoding`

#### 主体(Body)
请求或者响应的主体则是在一次请求/响应中需要额外传输的数据。比如`GET & HEAD`就不需要主体，但是`POST`则需要搭载额外的数据进行传输，这个数据便是放到`BODY`中进行传输。而对于传输的数据，为了减少传输的数据量，可以对放到报文主体里的实体进行压缩。在`http`协议里称之为`内容编码`。内容编码的实体由客户端接受并进行解码。常见的内容编码方式有如下几种：
  - gzip
  - compress
  - deflate(zlib)
  - identity(不进行编码)

客户端在发送一个请求的时候，可以通过`Accept-Encoding`来告诉服务器自己接受哪几种的编码格式。服务器可通过`Content-Encoding`来说明自己是选用哪种编码格式对实体进行编码的。

为了将实体内容尽快的呈现出来，`http`里也有一种叫`分块传输编码`的技术。有的时候服务器没法确定主体大小，或者一些其他原因，希望将消息一块一块的进行传输，这时候便会使用这种`分块传输编码`的技术。这时在响应报文中的会有`Transfer-Encoding: chunked`, 而且一般不会有`Content-Length`。

在传输实体的时候，有大量的需求是需要传输不同数据类型的数据。比如你上传一张图片，其实包含了图片信息和图片的介绍信息。在http中，采用了`MIME`机制，能够处理多种数据类型的组合。其包含`multipart/form-data`和`multipart/byteranges`。

在`POST`请求中，它能将实体放到报文主体中进行提交。其中就包含了利用`MIME`机制传输图片或者视频。`POST`提交的主体一般包含如下几种常用的类型：
  - application/x-www-form-urlencoded
  ```
  POST http://www.example.com HTTP/1.1
  Content-Type: application/x-www-form-urlencoded;charset=utf-8

  title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
  ```
  - multipart/form-data
  ```
  POST http://www.example.com HTTP/1.1
  Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

  ------WebKitFormBoundaryrGKCBY7qhFd3TrwA
  Content-Disposition: form-data; name="text"

  title
  ------WebKitFormBoundaryrGKCBY7qhFd3TrwA
  Content-Disposition: form-data; name="file"; filename="chrome.png"
  Content-Type: image/png

  PNG ... content of chrome.png ...
  ------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
  ```
  - application/json
  ```
  POST http://www.example.com HTTP/1.1
  Content-Type: application/json;charset=utf-8

  {"title":"test","sub":[1,2,3]}
  ```
  - text/xml
  ```
  POST http://www.example.com HTTP/1.1
  Content-Type: text/xml
  <?xml version="1.0"?>
  <methodCall>
      <methodName>examples.getStateName</methodName>
      <params>
          <param>
              <value><i4>41</i4></value>
          </param>
      </params>
  </methodCall>
  ```

通过这几种媒体类型，将数据提交到服务器。而服务器通常会也根据`Content-Type`来对提交的内容进行解析。

### 参考资料
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- [图解http](https://book.douban.com/subject/25863515/)
