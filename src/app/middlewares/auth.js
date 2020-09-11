import jwt from 'jsonwebtoken'
import {promisify} from 'util'
import configAuth from '../../config/auth'

export default async(req, res, next)=>{
    const authHeader = req.headers.authorization

    //Check if token exists
    if(!authHeader) return res.status(401).json({
        error: true,
        code: 130,
        message: "Token didn't find!"
    })

    const [, token ] = authHeader.split(' ')

    //Validate token and verify token
    try{
        const decoded = await promisify(jwt.verify)(token, configAuth.secret)
        req.userId = decoded.id

        return next()
    }catch(err){
        return res.status(404).json({
            error:true,
            code:117,
            message: "Erro to validate token: "+err
        })
    }
}
