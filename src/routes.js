import { Router } from 'express'
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})


//User List
routes.get('/user-list',UserController.index)

//User Login
routes.post('/login', LoginController.store)

//Insert User
routes.post('/user-insert',UserController.store)

//Delete User
routes.delete('/user-del/:id',authMiddleware,UserController.delete)

//Update User
routes.put('/user-edit',UserController.update)

export default routes
