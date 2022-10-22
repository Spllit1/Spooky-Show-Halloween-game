const ws = require("ws");

module.exports = (server) => {
  console.clear()
  console.log("\x1b[32m\x1b[1m     Loading...\x1b[0m")
  console.log("\x1b[32m\x1b[1mHave fun developing!\x1b[0m")
	const socket = new ws.Server({ server: server, path: "/multiplayer" });

	socket.on("connection", (conn) => {

		function broadcast(data) {
			socket.clients.forEach((client) => {
				if (client !== conn && client.readyState === ws.OPEN) {
					client.send(data);
				}
			});
		}

		conn.on("message", (data) => {
			// ...
		});

		conn.on("close", (data) => {
			// ...
		});

		conn.send("oh hi");

	});

};
