import * as Yup from 'yup';
import User from '../models/User'

class UserController{
    //Insert User
    async store(req, res){

        try{
            //Yup validation data
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is required!'),
                email: Yup.string().email().required('E-mail is required!'),
                password: Yup.string().required('Name is required!').min(6,'Password min 6 characters!')
            })
            await schema.validate(req.body, {
                abortEarly: false
            })

            //Check email user is already exists
            const checkEmailExists = await User.findOne({email: req.body.email})
            if(checkEmailExists) return res.status(400).json({
                error: true,
                code: 102,
                message: "User email already exists!"
            })

            const user = await User.create(req.body,(err)=>{
                return res.status(200).json({
                    error: false,
                    message: "Insert user with success!",
                    data: user
                })
            })

        }catch(err){

            //Take only Yup error
            if(err instanceof Yup.ValidationError){
                const errorMessages = {}
                //Capture errors
                err.inner.forEach(error =>{
                    errorMessages[error.path] = error.message
                })

                return res.status(400).json({
                    error:true,
                    code: 101,
                    message: errorMessages
                })
            }
        }s
    }
}

export default new UserController()
