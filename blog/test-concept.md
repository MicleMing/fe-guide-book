# 前端测试
## 给个定义(限定)
  测试是一段代码，使用这段代码来保证你的产品代码是按照预期来运行的。

## 为什么需要测试
  - 可以避免在开发过程中一遍又一遍的手动的测试你的程序。也可以让你在将代码部署上线过程中不至于太过害怕
  - 可以使用测试代码进行产品重构重构

## 测试光谱
  光谱的起点是单元测试，终点是E2E测试。基本上测试代码都是分布在这两端之间。包括一些单元模块的集成测试等。有一个测试金字塔的理论，就是大量的单元测试，少的集成测试，和更少的E2E测试。单元测试是必须能独立进行的测试，不依赖于别的模块，如果依赖别的模块，便有可能变成集成测试。或者你需要模拟依赖的模块

## E2E测试的量
如果在单元测试和集成测试上做了正确并且足够的测试，仅仅是需要少量的E2E测试去验证的。在单元测试和集成测试上做过的测试，不应该在E2E中继续去测试。E2E仅仅是去测试将各个模块连在一起的胶水代码是否正常工作。因为E2E测试跑起来会很慢。
