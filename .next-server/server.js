"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());
    const todos = [];
    server.get('/api/todos', (req, res) => {
        console.log('in get handler');
        res.send(todos);
    });
    //Обновление сущности
    server.put('/api/todo', (req, res) => {
        console.log('in put handler', req.body);
        console.log('todos', todos);
        res.send(req.body);
    });
    //Создание сущности
    server.post('/api/todo', (req, res) => {
        console.log('in post handler', req.body);
        todos.push(req.body);
        console.log('todos', todos);
        res.send(req.body);
    });
    server.get('/', (req, res) => {
        console.log('in home handler', todos);
        return app.render(req, res, '/', { tasks: todos });
    });
    server.get('*', app.getRequestHandler());
    server.listen(port, err => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
