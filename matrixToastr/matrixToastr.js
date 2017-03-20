$(function()
{
  var matrixToastr = {
    info: info,
    warning: warning,
    success: success,
    error: error,
    confirm:confirm,
  };

  window.matrixToastr = matrixToastr;

  function info(options) {
    var content = options.content || '';
    var title = options.title || '';
    var callback = options.callback;
    var optionsOverride = options.optionsOverride;
    //调用toastr
    var $toastrElement = toastr.info(content, title, optionsOverride);
    if(typeof callback == 'function') {
      setTimeout(callback(), 0);
    }
    return $toastrElement;
  }

  function warning(options) {
    var content = options.content || '';
    var title = options.title || '';
    var callback = options.callback;
    var optionsOverride = options.optionsOverride;
    //调用toastr
    var $toastrElement = toastr.warning(content, title, optionsOverride);
    if(typeof callback == 'function') {
      setTimeout(callback(), 0);
    }
    return $toastrElement;
  }

  function success(options) {
    var content = options.content || '';
    var title = options.title || '';
    var callback = options.callback;
    var optionsOverride = options.optionsOverride;
    //调用toastr
    var $toastrElement = toastr.success(content, title, optionsOverride);
    if(typeof callback == 'function') {
      setTimeout(callback(), 0);
    }
    return $toastrElement;
  }

  function error(options) {
    var content = options.content || '';
    var title = options.title || '';
    var callback = options.callback;
    var optionsOverride = options.optionsOverride;
    //调用toastr
    var $toastrElement = toastr.error(content, title, optionsOverride);
    if(typeof callback == 'function') {
      setTimeout(callback(), 0);
    }
    return $toastrElement;
  }

  function confirm(options) {
    //页面只能有一个confirm,不能同时出现多个
    // var $toast_container = $('#toast-confirm-container');
    // if ($toast_container.length > 0) {
    //   $toast_container.remove();
    // }

    var content = options.content || '';
    var title = options.title || '';
    var yes_callback = options.yes;
    var no_callback = options.no;
    var optionsOverride = options.optionsOverride || {};

    //修正content的内容
    content = content + `<br /><br /><button type="button" class="toast-btn btn-yes">是</button> <button type="button" class="toast-btn btn-no">否</button>`;
    //修改optionsOverrider 配置
    optionsOverride = $.extend(options.optionsOverride, {
      containerId: 'toast-confirm-container',
      positionClass: ''
    });
    return notify_confirm({
      message: content,
      title: title,
      optionsOverride: optionsOverride
    }, [yes_callback, no_callback]);
  }

  function notify_confirm(map, callbacks) {
    var options = getOptions();
    map.iconClass = 'toast-confirm';
    var iconClass = 'toast-confirm';
    if (typeof (map.optionsOverride) !== 'undefined') {
      options = $.extend(options, map.optionsOverride);
    }

    $container = getContainer(options, true);
    var $toastElement = $('<div/>');
    var $titleElement = $('<div/>');
    var $messageElement = $('<div/>');
    var $closeElement = $(options.closeHtml);
    var response = {
      state: 'visible',
      startTime: new Date(),
      options: options,
      map: map
    };

    personalizeToast();

    displayToast();

    handleEvents();

    if (options.debug && console) {
      console.log(response);
    }
    return $toastElement;

    function escapeHtml(source) {
      if (source == null) {
        source = '';
      }
      return source
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function personalizeToast() {
      setIcon();
      setTitle();
      setMessage();
      setCloseButton();
      setRTL();
      setSequence();
      setAria();
    }

    function setAria() {
      $toastElement.attr('aria-live', 'assertive');
    }

    function setRTL() {
      if (options.rtl) {
        $toastElement.addClass('rtl');
      }
    }

    function setSequence() {
      if (options.newestOnTop) {
        $container.prepend($toastElement);
      } else {
        $container.append($toastElement);
      }
    }


    function handleEvents() {
      if (options.closeButton && $closeElement) {
        $closeElement.click(function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                event.cancelBubble = true;
            }

            if (options.onCloseClick) {
                options.onCloseClick(event);
            }
            closeToastContainer();
        });
      }

      //confirm还要进行如下的按钮事件绑定
     $toastElement.find('.btn-yes').click(closeToastContainer);
     $toastElement.find('.btn-no').click(closeToastContainer);

      //每次调用时回调函数只执行一次
      if (typeof callbacks[0] == 'function') {
        //$toastElement.find('.btn-yes').click(callback[0]);
        $toastElement.find('.btn-yes').one('click', callbacks[0]);
      }
      if (typeof callbacks[1] == 'function') {
        //$toastElement.find('.btn-no').click(callback[1]);
        $toastElement.find('.btn-no').one('click', callbacks[1]);

      }
    }

    function displayToast() {
      $toastElement.hide();
      $toastElement[options.showMethod](
        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
      );
    }

    function closeToastContainer() {
      $container.remove();
    }

    function setIcon() {
      if (map.iconClass) {
        $toastElement.addClass(options.toastClass).addClass(iconClass);
      }
    }

    function setTitle() {
      if (map.title) {
        var suffix = map.title;
        if (options.escapeHtml) {
          suffix = escapeHtml(map.title);
        }
        $titleElement.append(suffix).addClass(options.titleClass);
        $toastElement.append($titleElement);
      }
    }

    function setMessage() {
      if (map.message) {
        var suffix = map.message;
        if (options.escapeHtml) {
            suffix = escapeHtml(map.message);
        }
        $messageElement.append(suffix).addClass(options.messageClass);
        $toastElement.append($messageElement);
      }
    }

    function setCloseButton() {
      if (options.closeButton) {
        $closeElement.addClass(options.closeClass).attr('role', 'button');
        $toastElement.prepend($closeElement);
      }
    }
    function setCloseButton() {
      if (options.closeButton) {
        $closeElement.addClass(options.closeClass).attr('role', 'button');
        $toastElement.prepend($closeElement);
      }
    }

    function getOptions() {
      return $.extend({}, getDefaults(), toastr.options);
    }
  }

  function getContainer(options, create) {
    if (!options) { options = getOptions(); }
    $container = $('#' + options.containerId);
    if ($container.length) {
        return $container;
    }
    if (create) {
        $container = createContainer(options);
    }
    // $container.addClass(options.containerClass);
    return $container;
  }

  function createContainer(options) {
      $container = $('<div/>')
          .attr('id', options.containerId)
          .addClass(options.positionClass);

      $container.appendTo($(options.target));
      return $container;
  }

  function getDefaults() {
      return {
          tapToDismiss: true,
          toastClass: 'toast',
          containerId: 'toast-confirm-container',
          debug: false,

          showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
          showDuration: 300,
          showEasing: 'swing', //swing and linear are built into jQuery
          onShown: undefined,
          hideMethod: 'fadeOut',
          hideDuration: 1000,
          hideEasing: 'swing',
          onHidden: undefined,
          closeMethod: false,
          closeDuration: false,
          closeEasing: false,
          closeOnHover: true,

          extendedTimeOut: 1000,
          iconClasses: {
              error: 'toast-error',
              info: 'toast-info',
              success: 'toast-success',
              warning: 'toast-warning',
              confirm: 'toast-confirm'
          },
          iconClass: 'toast-info',
          positionClass: 'toast-top-right',
          timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
          titleClass: 'toast-title',
          messageClass: 'toast-message',
          escapeHtml: false,
          target: 'body',
          closeHtml: '<button type="button">&times;</button>',
          closeClass: 'toast-close-button',
          newestOnTop: true,
          preventDuplicates: false,
          progressBar: false,
          progressClass: 'toast-progress',
          rtl: false
      };
  }

})
