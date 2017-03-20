### 基于toastr插件，不改变源码，进行二次开发
+ 改变了各种api的接口，支持在参数中带有回调函数
+ 增加了confirm接口，用于信息的选择确认类型
+ 目录说明
  - toastr目录存放了toastr源码 https://github.com/CodeSeven/toastr
  - matrixToastr 存放了基于toastr源码进行二次开发的代码
  - demo.html,index.js 是demo文件
### API
+ 主要接口有
  - matrixToastr.confirm
  - matrixToastr.info
  - matrixToastr.error
  - matrixToastr.warning
  - matrixToastr.success    
  - matrixToastr.setOptions //预先设置toastr的一些参数
+ 具体使用  
  - 示例
    ``` javascript
    matrixToastr.setOptions({
      'newestOnTop': true,
      'closeButton' : true,
      'closeDuration' : 100      
    });
    matrxiToastr.confirm({
      content: content, //显示内容
      title: title, //可选，标题
      yes: function() {}, //点击“是”的回调函数;默认是空函数，不做任何操作;
      no: function() {},  //点击“否”的回调函数;默认是空函数，不做任何操作；
      optionsOverride: options //参数设置
    });
    matrixToastr.info({
      content: content,
      title: title,
      callback: callback,  //可选；用于在调用info之后采取的回调函数
      optionsOverride: options
    });
    ```
  - 其他与info一样
  ### DEMO
  + 具体使用可以参考 demo.html
