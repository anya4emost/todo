import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import { update, findIndex, propEq } from "ramda";

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server: any = express();
  server.use(bodyParser.json());

  let todos = [];

  server.get('/api/todos', (req, res) => {
    console.log('in get handler');

    res.send(todos);
  });

  //Обновление сущности
  server.put('/api/todo', (req, res) => {
    console.log('in put handler', req.body);

    todos = update(findIndex(propEq('id', req.body.id))(todos), req.body, todos);
    res.send(todos);
  });

  //Создание сущности
  server.post('/api/todo', (req, res) => {
    console.log('in post handler', req.body);

    todos.push(req.body);

    res.send(req.body);
  });

  server.delete('/api/todo/:id', (req, res) => {
    console.log('req', req.params.id);
    console.log('todos1', todos);

    todos = todos.filter(task => task.id != req.params.id);
    console.log('todos2', todos);
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/', { tasks: todos });
  });

  server.get('*', app.getRequestHandler());

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${ port }`)
  });
});
