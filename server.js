var port =  process.env.OPENSHIFT_NODEJS_PORT || 8080;   // Port 8080 if you run locally
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"; // Listening to localhost if you run locally

var io = require('socket.io').listen(port, address);

io.sockets.on('connection', function (socket) {

	var user;

	socket.on('register', function (u) {
		user = u;
		socket.emit('message', {
			nickname: '** SERVER **',
			message: 'Welcome to chat ' + user.nickname + '!'
		});
	});

	socket.on('message', function (m) {
		socket.broadcast.emit('message', m);
	});

});