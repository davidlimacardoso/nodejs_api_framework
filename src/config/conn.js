import mongoose from 'mongoose'

class Database{
    constructor(){
        this.mongoDatabase()
        /* You can insert more database types here!*/
    }

    /* Mongo connection function */
    mongoDatabase(){
        mongoose.connect('mongodb://localhost/mongo_database',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log('Conection in the mongoDB with success!')
        }).catch((erro)=>{
            console.log('Error: '+ erro)
        })
    }
}

export default new Database()
