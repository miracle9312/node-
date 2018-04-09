/*服务端拼接key响应请求*/
var crypto = require("crypto");
var net = require('net');
var WS = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

net.createServer(function(o){
  var key;
  o.on('data', function(e){
    if(!key){
      //握手
      key = e.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
      key = crypto.createHash('sha1').update(key + WS).digest('base64');
      o.write('HTTP/1.1 101 Switching Protocols\r\n');
      o.write('Upgrade: websocket\r\n');
      o.write('Connection: Upgrade\r\n');
      o.write('Sec-WebSocket-Accept: ' + key + '\r\n');
      o.write('\r\n');
    }
  });
}).listen(8000);
