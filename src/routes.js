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
        name: 'Ana',
        email: 'ana@dav.com',
        password: '123'
    }, function(err,small){
        if(err)
            return res.status(400).json({error:"User can't be created: "+ err})

        return res.status(200).json({error:"User create with success!"})
    })
})

export default routes
