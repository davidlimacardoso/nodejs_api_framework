import mongoose, { mongo } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const User = new mongoose.Schema({
    name: {
            type:String,
            required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
}, {timestamps:true})

//Using mongoose paginate on user model
User.plugin(mongoosePaginate)

export default mongoose.model('user',User)
