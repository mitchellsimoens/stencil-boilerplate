const Server   = require('./server/Server');
const instance = new Server();

instance
    .build()
    .then(() => instance.listen())
    .then(() => instance.open())
    .catch(console.log);
