import mongoose from 'mongoose';

export const connectToDatabase = async (): Promise<void> => {
    try{
        
        const mongo_url = process.env.MONGO_URL
        
        if(!mongo_url){
            throw new Error('MONGO_URL environment variable is not defined');
        }

        await mongoose.connect(mongo_url,{})

    }catch(error) {
        console.log("Error occured while connecting to the Mongo DB server: ", error);
    }
}