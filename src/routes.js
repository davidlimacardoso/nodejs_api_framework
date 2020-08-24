import { Router } from 'express'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'

const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})


//User API Router
routes.get('/user-list',(req,res)=>{
    res.send(['David','Jack','Lulu'])
})

//User Login
routes.post('/login', LoginController.store)

//Insert User
routes.post('/user-insert',UserController.store)

//Delete User
routes.delete('/user-del/:id',UserController.delete)

export default routes
