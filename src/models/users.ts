  
import MongooseDelete from 'mongoose-delete';
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;

const UserSchema = new Schema({
    tenant_id: { type: Types.ObjectId, ref: 'tenants', required: true },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user_status: { type: Number, required: true}
},{
    timestamps: true,
    versionKey: false
});

UserSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserSchema);