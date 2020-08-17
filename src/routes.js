import { Router } from 'express'
import User from './app/models/User'
import UserController from './app/controllers/UserController'

const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})

routes.get('/user-list',(req,res)=>{
    res.send(['David','Jack','Lulu'])
})

routes.post('/user-insert',UserController.store)

export default routes
