"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const ramda_1 = require("ramda");
const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());
    let todos = [];
    server.get('/api/todos', (req, res) => {
        console.log('in get handler');
        res.send(todos);
    });
    //Обновление сущности
    server.put('/api/todo', (req, res) => {
        console.log('in put handler', req.body);
        todos = ramda_1.update(ramda_1.findIndex(ramda_1.propEq('id', req.body.id))(todos), req.body, todos);
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
        console.log('req.params.id', typeof req.params.id);
        console.log('');
        todos = todos.filter(task => task.id != req.params.id);
        console.log('todos2', todos);
    });
    server.get('/', (req, res) => {
        return app.render(req, res, '/', { tasks: todos });
    });
    server.get('*', app.getRequestHandler());
    server.listen(port, err => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
