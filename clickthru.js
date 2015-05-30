// clickthru.js version 0.0.1
(function() {

  var listeners = [];

  function ClickThruEvent(event) {
    this.event = event;
  }

  ClickThruEvent.prototype.inElement = function(e) {
    var boundingRect = e.getBoundingClientRect();
    var x = this.event.clientX;
    var y = this.event.clientY;
    return x >= boundingRect.left && x <= boundingRect.right &&
      y >= boundingRect.top && y <= boundingRect.bottom;
  };

  function callback(e) {
    var event = new ClickThruEvent(e);
    var theListeners = listeners.slice();
    for (var i = 0, len = theListeners.length; i < len; ++i) {
      theListeners[i](event);
    }
  }

  function isListening() {
    return listeners.length > 0;
  }

  function addListener(listener) {
    if (!isListening()) {
      startListening();
    }
    listeners.push(listener);
  }

  function removeListener(listener) {
    var index = listeners.indexOf(listener);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
    if (!isListening()) {
      stopListening();
    }
  }

  function startListening() {
    document.body.addEventListener('mousedown', callback, true);
  }

  function stopListening() {
    document.body.removeEventListener('mousedown', callback, true);
  }

  window.clickthru = {
    addListener: addListener,
    removeListener: removeListener
  };

})();
