### 基于toastr插件，不改变源码，进行二次开发
+ 改变了各种api的接口，支持在参数中带有回调函数
+ 增加了confirm接口，用于信息的选择确认类型
+ 目录说明
  - toastr目录存放了toastr源码 https://github.com/CodeSeven/toastr
  - matrixToastr 存放了基于toastr源码进行二次开发的代码
  - demo.html,index.js 是demot文件
### API
+ 主要接口有
  - matrixToastr.confirm
  - matrixToastr.info
  - matrixToastr.error
  - matrixToastr.warning
  - matrixToastr.success
+ 具体使用  
  - 示例
    ``` javascript
    matrxiToastr.confirm({
      content: content,
      title: title, //可选
      yes: function() {}, //点击确认的回调函数
      no: function() {},
      options: options
    });
    matrixToastr.info({
      content: content,
      title: title,
      callback: callback,
      options: options
    });
    ```
  - 其他与info一样
  ### DEMO
  + 具体使用可以参考 demo.html
