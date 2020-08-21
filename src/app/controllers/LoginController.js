import bcrypt from 'bcrypt'
import User from '../models/User'

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
            }
        })
    }
}

export default new  LoginController()
