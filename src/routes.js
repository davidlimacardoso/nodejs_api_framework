import { Router } from 'express'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'

const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})

//Login Router
routes.post('/login', LoginController.store)

//User API Router
routes.get('/user-list',(req,res)=>{
    res.send(['David','Jack','Lulu'])
})

routes.post('/user-insert',UserController.store)

export default routes
