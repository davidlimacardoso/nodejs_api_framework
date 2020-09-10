import * as Yup from 'yup';
import bcrypt from 'bcrypt'
import User from '../models/User'
import { response } from 'express';
import { ObjectID } from 'mongodb';

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

            let data = req.body;

            //Ovewrite password by encrypted of password
            data.password = await bcrypt.hash(data.password, 7)

            await schema.validate(data, {
                abortEarly: false
            })

            //Check email user is already exists
            const checkEmailExists = await User.findOne({email: data.email})
            if(checkEmailExists) return res.status(400).json({
                error: true,
                code: 102,
                message: "User email already exists!"
            })

            const user = await User.create(data,(err)=>{
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
        }
    }

    //Delete User
    async delete(req, res){

        try{
            //Check user exist
            const userExist = await User.findOne({_id: req.params.id})
            if(!userExist)
                return res.status(200).json({
                    error:true,
                    code:110,
                    message:"User can't be finded!"
                })

            //Delete User
            if(await User.deleteOne({_id:req.params.id})){
                return res.status(200).json({
                    error:true,
                    code:117,
                    message: "User deleted with success!"
                })
            }

        }catch(err){
            return res.status(404).json({
                error:true,
                code:117,
                message: "Erro to the delete user: "+err
            })
        }

        return res.json({
            error: false,
            message: "User deleted with success!"})
    }

    //Update User
    async update(req, res){
        //let data = req.body

        try{
            //Validate
            const schema = Yup.object().shape({
                _id: Yup.string().required('ID user is required!'),
            })
            await schema.validate(req.body, {
                abortEarly: false
            })
            const {_id, email} = req.body
            const data = req.body

            //Ovewrite password by encrypted of password
            if(data.password)
                data.password = await bcrypt.hash(data.password, 7)

            //Check user exist
            const userExist = await User.findOne({_id})
            if(!userExist)
                return res.status(404).json({
                    error:true,
                    code:110,
                    message: "User can't be finded!"
                })

            //Check if email to update aready exist
            if(email != userExist.email){
                const emailExist = await User.findOne({email})
                if(emailExist)
                    return res.status(400).json({
                        error:true,
                        code: 120,
                        message: "Email already exist!"
                    })
            }
            await User.updateOne({_id},{$set:data}, (err)=>{
                if(err) return res.status(200).json({
                    error: true,
                    code: 115,
                    message: "Erro to update user!"
                })
            })

            return res.status(200).json({
                error: false,
                code: 114,
                message: "User updated with success!"
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

            res.status(400).json({
                error: true,
                code: 115,
                message: "Erro to update user: "+err
            })
        }

    }
}

export default new UserController()
