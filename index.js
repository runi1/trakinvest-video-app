const express = require('express');
const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();

const apiRoutes = require('./server/routes/apiRoutes.js');

app.prepare()
.then(() => {
  const server = express()
  
 server.use('/api', apiRoutes);
 server.get('/movie/:id', (req, res) => {
   // const params = route('/movie/:id')(parse(req.url).pathname);
    const params = { id: req.params.id } 
    return app.render(req, res, '/index', params); 
  });

 server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(5000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:5000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})