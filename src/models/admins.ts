
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const AdminSchema = new Schema({
    admin_id: { type: Types.ObjectId, ref: 'admins' },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verif_code: { type: String, required: true },
    last_connection: { type: Date },
    rol: { type: Number, default: 0, required: true },
    user_status: { type: Number, default: 0, required: true }
},{
    timestamps: true,
    versionKey: false
});

AdminSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("admins", AdminSchema);