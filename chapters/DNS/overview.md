 ## DNS
当你在浏览器上访问一个网站的时候，大部分情况下你使用的是这个网站的域名，而非网站的IP地址。因为`IP地址`是一连串的数字，不方便记忆。但是`IP地址`才是是网络上路由器能识别的地址。所以需要一个将域名解析为`IP地址`的服务，这就是`DNS`，它是一个将域名和`IP地址`进行映射的分布式数据库.
### 域名结构
域名结构和我们在电脑上访问文件时的路径结构类似，只不过一个是用`/`, 域名里使用`dot(.)`来进行分割。

域名的每一层叫做一个域，每个域利用`.`来分开，域名的域也分有不同的种类。最高级的就是`顶级域名`，接下了是`二级域名`以此类推。其中`顶级域名`分为
  - 通用顶级域(.com, .net, .org, .edu, .gob 等)
  - 国家地区代码顶级域(.cn, .hk, .us 等)

比如百度的域名：
```
www.baidu.com
```
顶级域是`com`, 接下了是二级域`baidu`, 三级域`www`

### 解析域名
那有了域名之后，是如何将域名映射为`IP`地址的呢？可以利用`dig`命令来看下解析的过程
```shell
dig www.baidu.com +trace
```
得到的结果是
```shell
; <<>> DiG 9.9.7-P3 <<>> www.baidu.com +trace
;; global options: +cmd
.			1022	IN	NS	h.root-servers.net.
      ...
.			1022	IN	NS	i.root-servers.net.
;; Received 460 bytes from 192.168.6.2#53(192.168.6.2) in 43 ms

com.			172800	IN	NS	a.gtld-servers.net.
      ...
com.			172800	IN	NS	m.gtld-servers.net.

;; Received 1173 bytes from 193.0.14.129#53(k.root-servers.net) in 282 ms

baidu.com.		172800	IN	NS	dns.baidu.com.
      ...
baidu.com.		172800	IN	NS	ns7.baidu.com.
;; Received 697 bytes from 192.52.178.30#53(k.gtld-servers.net) in 228 ms

www.baidu.com.		1200	IN	CNAME	www.a.shifen.com.
a.shifen.com.		1200	IN	NS	ns5.a.shifen.com.
    ...
a.shifen.com.		1200	IN	NS	ns4.a.shifen.com.
;; Received 239 bytes from 220.181.37.10#53(ns3.baidu.com) in 44 ms
```

从这里可以看出，域名解析时一级一级的从根域名开始进行解析。上面的查询过程其实就是：
  - 在跟域名找到`com`的信息，然后去`com`那
  - 到了`com`这后，拿到了`baidu`的信息, 然后去`baidu`那
  - 到了`baidu`这后，拿到了`www`的信息，然后去`www`那
  - 接着拿到了`www.baidu.com`的域名服务器`www.a.shifen.com`, 这个服务器将查询调度到`ns4.a.shifen.com` 等服务器上进行解析，返回`IP`地址

通过这一系列的查询后，才拿到域名的`IP`地址。在弱网和没有缓存的情况下，`DNS`解析将花费大量的时间，会很大的影响用户体验。而且由于`DNS`解析是通过`UDP`进行传输数据的，所以一旦出现丢包，便要重新进行请求解析，在弱网情况下带来的体验极差。

### DNS查询过程
当在浏览器输入一个网址，并且按下回车的时候，`DNS`查询算是发送的第一个请求。那这个查询经历的哪些过程呢？其实主要经历了如下几个步骤：
  1. 查看浏览器缓存，如果没缓存转到第二步
  2. 查看系统缓存(hosts), 如果没有缓存转到第三步
  3. 查看路由器缓存, 如果没有缓存转到第四步(这三步为客户端查找，第四步开始是在服务器查找)
  4. 查看`ISP`DNS缓存，如果没有缓存转到第五步
  5. 从根域名服务器开始一直查找到相对于的子域名服务器，查找到之后便会对结果进行缓存

通过以上几个过程来查询到一个域名对于的`IP`地址。在`chrome`中查看DNS的缓存可以访问
```
chrome://net-internals/#dns
```
在这个面板可以看到一个DNS的缓存过期时间`TTL(Time-To-Live)`以及当前状态。

### 优化策略
既然知道了DNS的查询过程，那前端工程师在开发过程中该如何对DNS的解析进行优化，减少查询时间呢？主要的思路主要有这么几个：
  - 减少DNS查询
  - 优化DNS查询路径
  - 提前进行DNS查询

针对这几条原则，我们可以采取如下措施：
  - 将域名进行收敛，特别是在移动端的弱网情况下，将域名收敛能减少DNS查询时间
  - 将静态资源放到CDN上，对于DNS请求总是返回距离请求者最近的节点
  - 利用`DNS Prefetching`来提前进行`DNS`解析

对于前两条，都可以在工程上进行解决，接下来我们来详细了解下`DNS Prefetching`

在浏览器中开启`DNS Prefetching`只需要在浏览器中加入这么一段代码
```html
<link rel="dns-prefetch" href="//demo.com">
```
这段代码会让浏览器主动去执行域名解析，并进行缓存。
