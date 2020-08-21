import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import configAuth from '../../config/auth'

class LoginController{
    async store(req, res){
        const {email, password} = req.body

        // Check user exists on database
        const userExist = await User.findOne({email:email})

        if(!userExist){
            return res.status(404).json({
                error: true,
                code:110,
                message: "User don't find!"
            })
        }

        //Return password does not match
        if(! await bcrypt.compare(password, userExist.password)){
            return res.status(401).json({
                error: true,
                code:111,
                message: "User password does not match!"
            })
        }

        return res.status(302).json({
            user: {
                id: userExist._id,
                email: userExist.email,
                name: userExist.name
            },
            token: jwt.sign({id: userExist._id}, configAuth.secret, {expiresIn: configAuth.expiresIn})
        })
    }
}

export default new  LoginController()
