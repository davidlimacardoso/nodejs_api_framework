import * as yup from 'yup';
import User from '../models/User'

class UserController{
    //Insert User
    async store(req, res){

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            name: yup.string().required().min(6)
        })

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Invalid date"
            })
        }

        //Check email user is already exists
        const checkEmailExists = await User.findOne({email: req.body.email})
        if(checkEmailExists) return res.status(400).json({
            error: true,
            code: 102,
            message: "User email already exists!"
        })

        const user = await User.create(req.body,(err)=>{

            if(err) return res.status(400).json({
                error:true,
                code: 101,
                message: "Erro to insert user: " + err
            })

            return res.status(200).json({
                error: false,
                message: "Insert user with success!",
                data: user
            })
        })
    }
}

export default new UserController()
