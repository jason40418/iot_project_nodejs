/*
1. socket.emit - 對一個特定的 socket 傳訊息
2. socket.on – 對特定 event 的運行結果進行接收
3. socket.broadcast.emit - 對目前 socket 之外所有線上的 socket 傳訊息
4. io.sockets.emit - 對所有線上 socket 傳訊息
*/
module.exports = function (client) {
    let data = { 'hello': 'goog' };
    client.emit('open', data)

    client.on('front-end-publish', function (msg) {
        let data = {
            'ori': msg,
            'pass': 'Node JS Server Has pass'
        }

        console.log(msg)

        // 對除了自己以外的裝置進行廣播
        client.broadcast.emit('front-end-response', data)
    });
};