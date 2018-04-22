## 幂等性
### 什么是幂等性
在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。
在http1.1对于幂等性的定义如下：
> Methods can also have the property of "idempotence" in that (aside
   from error or expiration issues) the side-effects of N > 0 identical
   requests is the same as for a single request.

所以，也就是说幂等性是在客户端发送多个请求和发一个请求具有相同的副作用。但是可能会出现一种可能的情况是在一个请求中，所有的方法调用都是幂等的，但是这个请求是非幂等的。比如这个请求返回一个结果，这个结果依赖于某个值，但是在下次相同的请求中，这个被结果依赖的值却被修改了。
### 为什么需要幂等性
设想这么一个场景，如果你在网上下了一个订单，但是由于网络原因，在客户端点击下单后，服务器端返回的结果没有及时反馈到客户端，那么就有可能出现重复点击下单的操作，如果这个操作的接口如果不具有幂等性，变有可能出现多个订单。所以这种情况下需要设计一个具有幂等性的接口，比如：
```js
interface int createOrder
interface boolean idempotenceOrder
```
通过创建一个订单的ID来关联一个订单，避免重复创建新的订单。

### http中的幂等性
在http中，`GET`, `PUT`,`HEAD`,`DELETE`都具有幂等性， 对于`OPTION`,`TRACE`是没有副作用的，那么这个方法也是具有幂等性。
- 对于利用`GET`获取资源, 比如：`GET demo/1`, 无论调用多少次，由于`GET`一般不会产生副作用，所以资源的状态时不变的(资源内容可能会改变)
- 对于利用`DELETE`来删除资源，比如：`DELETE demo/123`，无论调用多少次，产生的副作用都是一样的, 即将资源删除了。
- 对于`HEAD`获取资源元信息(不获取实体的主体), 所以调用多少次，和`GET`同样是没有副作用的。
- 对于`PUT`创建或更新资源，与`POST`相比，`PUT`操作的是资源本身，而`POST`操作的是资源的接收者。对同一URI进行多次PUT的副作用和一次PUT是相同的。
- 对于没有副作用的方法，显而易见，它们具有幂等性。
