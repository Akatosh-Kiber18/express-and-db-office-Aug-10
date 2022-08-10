import {Router} from "express"
import {dashboardOnToday} from "./list.models.js";

export const listRoutes = new Router()

listRoutes.get('/dashboard', dashboardHandler)


function dashboardHandler(req, res) {
    dashboardOnToday()
        .then(lists => res.status(201).json(lists))
        .catch(() => res.sendStatus(500));
}