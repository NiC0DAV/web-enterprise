  
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const ProspectSchema = new Schema({
    tenant_id: { type: Types.ObjectId, ref: 'tenants', required: true },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    whatsapp_number: { type: String },
    message: { type: String, required: true },
    location_ip: { type: String, required: true},
    status: { type: Number, required: true }
});

ProspectSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("prospects", ProspectSchema);