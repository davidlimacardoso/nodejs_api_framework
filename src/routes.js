import { Router } from 'express'
import User from './app/models/User'

const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})

routes.get('/user-list',(req,res)=>{
    res.send(['David','Jack','Lulu'])
})

routes.get('/user-insert', async (req, res)=>{
    await User.create({
        name: 'David',
        email: 'david@dav.com',
        password: '123'
    })
})

export default routes
