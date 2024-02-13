const server = require('server');
const { get } = server.router;
const { header } = server.reply;

const cors = [
    ctx => header("Access-Control-Allow-Origin", "*"),
    ctx => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    ctx => header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, HEAD"),
    ctx => ctx.method.toLowerCase() === 'options' ? 200 : false
];

const port = 3002;

// Launch server with options and a couple of routes
server({ port: port }, cors, [
  get('/nothing', ctx => ''),
]).then(async app => {
    console.log(`Serving on: http://localhost:${port}`);
});