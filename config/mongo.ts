import { ConnectOptions } from 'mongoose';
import environment from '../config/environment';
const { Connect, DB_URI, LOCAL_DB_URI } = environment;

const dbConnect = async () => {
    try {
        await Connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log('Database connected succesfully.');
    } catch (error: any) {
        console.log(`Error performing connection with DB ==> ${error}`);
    }
}

export default dbConnect;