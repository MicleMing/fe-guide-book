## storage
由于`cookie`存储大小被限制在了`4kb`, 并且在发起网络请求时会默认带上`cookie`，导致请求数据变大。为了摆脱这些限制，提供一个更加方便简洁了方式对存储进行管理，`html5`规范里增加了两个`API`:
  - localstorge
  - sessionstorage

这两个接口将存储限制放宽到`5mb`，为本地的存储提供了极大的便利性。

### localstorage
### sessionstorage
