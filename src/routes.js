const { Router } = require('express')
const routes = new Router()

routes.get('/',(req,res)=>{
    res.send('Start Page')
})

routes.get('/user',(req,res)=>{
    res.send('User page')
})

module.exports = routes
