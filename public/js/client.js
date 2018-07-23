var socket = io.connect(window.location.origin);
hljs.configure({languages: []})

socket.on('content', function (data) {
  var contentElem = document.getElementById('content');
  contentElem.innerHTML = data;

  Array.prototype.slice.call(document.querySelectorAll('code')).forEach(function (item) {
    item.parentNode.classList.add(this.getAttribute('class'));
  });

  Array.prototype.slice.call(document.querySelectorAll('pre')).forEach(function (item) {
    hljs.highlightBlock(item);
  });
})

socket.on('title', function (data) {
  document.querySelector('title').innerHTML = data;
})

socket.on('kill', function () {
  window.open('', '_self', '')
  window.close()
})
