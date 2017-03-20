matrixToastr.setOptions({
  closeButton: true
})

var test = function() {
  matrixToastr.info({
    content: 'i am young2'
  });
  function a() {
    console.log('a');
  }
}

var test2 = function() {
  matrixToastr.success({
    content: 'i am young2',
    callback: a
  });
  function a() {
    console.log('success');
  }
}

var test3 = function() {
  matrixToastr.error({
    content: 'i am young2',
    callback: a
  });
  function a() {
    console.log('error');
  }
}

var test4 = function() {
  matrixToastr.warning({
    content: 'i am young2',
    callback: a
  });
  function a() {
    console.log('warning');
  }
}

var test1 = function() {

  matrixToastr.confirm({
    content: '你确定这样真的好吗？23333333333333333333333333333333333',
    yes: yes,
    // no: no,
    title: '提示',
    optionsOverride: {
      closeButton: true
    }
  })

  function yes() {
    console.log('yes');
  }

  function no() {
    console.log('no');
  }

}
