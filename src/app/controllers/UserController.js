import User from '../models/User'

class UserController{
    //Insert User
    async store(req, res){

        if(!req.body.password || typeof req.body.password == undefined || req.body.password == null)
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Password can't be null."
            })

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null)
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Name can't be null."
            })

        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null)
            return res.status(400).json({
                error: true,
                code: 103,
                message: "E-mail can't be null."
            })

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
