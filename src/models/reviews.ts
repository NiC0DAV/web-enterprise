  
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const ReviewSchema = new Schema({
    tenant_id: { type: Types.ObjectId, ref: 'tenants', required: true },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    location_ip: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: String, required: true },
    status: { type: Number, required: true }
});

ReviewSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("reviews", ReviewSchema);