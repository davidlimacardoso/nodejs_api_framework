import { Router } from 'express'

const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})

routes.get('/user-list',(req,res)=>{
    res.send(['David','Jack','Lulu'])
})

export default routes
