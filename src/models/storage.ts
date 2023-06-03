  
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const StorageSchema = new Schema({
    tenant_id: { type: Types.ObjectId, ref: 'tenants', required: true },
    template_id: { type: Types.ObjectId, ref: 'templates', required: true },
    file_type: { type: String, required: true },
    file_name: { type: String, required: true },
    file_path: { type: String, required: true },
    file_title: { type: String, required: true },
    file_description: { type: String, required: true },
    file_alt: { type: String, required: true },
    slider_status: { type: Number, required: true }
});

StorageSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("storage", StorageSchema);