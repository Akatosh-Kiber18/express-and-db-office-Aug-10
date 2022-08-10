import {Router} from "express";
import {createTask, deleteTask, getOneTask, getTasks, supersedeTask, updateTask} from "./task.models.js";

export const taskRoutes = new Router();

taskRoutes.post('/tasks', createTaskHandler);
taskRoutes.get('/tasks', getTasksHandler);
taskRoutes.get('/tasks/:id', getOneTaskHandler);
taskRoutes.patch('/tasks/:id', updateTaskHandler);
taskRoutes.delete('/tasks/:id', deleteTaskHandler);
taskRoutes.put('/tasks/:id', supersedeTaskHandler);

function createTaskHandler(req, res) {
    const {name, done} = req.body;
    createTask({name, done})
        .then(task => res.status(201).json(task))
        .catch(() => res.sendStatus(500));
}

function getTasksHandler(req, res) {
    getTasks()
        .then(tasks => res.json(tasks))
        .catch(() => res.sendStatus(500));
}

function getOneTaskHandler(req, res) {
    const id = req.params.id
    getOneTask(id)
        .then(task => task ? res.json(task) : res.sendStatus(404))
        .catch(() => res.sendStatus(500))
}

function updateTaskHandler(req, res) {
    const id = req.params.id
    getOneTask(id)
        .then(oldTask => Object.assign(oldTask, req.body))
        .then(({name, done}) => updateTask(id, name, done))
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}

function deleteTaskHandler(req, res) {
    const id = req.params.id
    deleteTask(id)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}

function supersedeTaskHandler(req, res) {
    const id = req.params.id;
    const name = req.body.name || "Task name";
    const done = req.body.done || false;
    supersedeTask(id, name, done)
        .then(task => res.json(task))
        .catch(() => res.sendStatus(500))
}