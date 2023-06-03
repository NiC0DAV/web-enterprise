import mongoose, { ConnectOptions, connect, mongo } from 'mongoose';
import { DurationInputArg1, DurationInputArg2 } from 'moment-timezone';

interface EnvironmentInterface {
    mongoose: any;
    Connect: typeof mongoose.connect;
    Schema: typeof mongoose.Schema;
    Types: typeof mongoose.Types;
    PORT: string | number;
    PUBLIC_FOLDER: string;
    ROUTES_FOLDER: string;
    BASE_ROUTE_NAME: string;
    DB_URI: string;
    LOCAL_DB_URI: string;
    SECRET_ADMIN: string;
    SECRET_JWT_KEY: string;
    JWT_VALIDITY: string;
    JWT_VALIDITY_TIME: DurationInputArg1;
    TYPE_TIME: DurationInputArg2;
    SLACK_WEBHOOK: string;
}

const environment: EnvironmentInterface = {
    mongoose: mongoose,
    Connect: connect,
    Schema: mongoose.Schema,
    Types: mongoose.Types,
    PORT: process.env.PORT ?? 3000,
    PUBLIC_FOLDER: process.env.PUBLIC_FOLDER ?? '',
    ROUTES_FOLDER: process.env.ROUTES_FOLDER ?? '',
    BASE_ROUTE_NAME: process.env.BASE_ROUTE_NAME ?? '',
    DB_URI: process.env.DB_URI ?? '',
    LOCAL_DB_URI: process.env.LOCAL_DB_URI ?? '',
    SECRET_ADMIN: process.env.SECRET_ADMIN ?? '',
    SECRET_JWT_KEY: process.env.SECRET_JWT_KEY ?? '',
    JWT_VALIDITY: process.env.JWT_VALIDITY ?? '',
    JWT_VALIDITY_TIME: process.env.JWT_VALIDITY_TIME ?? '',
    //@ts-ignore
    TYPE_TIME: process.env.TYPE_TIME ?? 'hours',
    SLACK_WEBHOOK: process.env.SLACK_WEBHOOK ?? ''
};

export default environment;
