import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const TenantSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    company_name: { type: String, required: true },
    domain_name: { type: String, required: true },
    subdomain_status: { type: Number, required: true },
    template_id: { type: Types.ObjectId, ref: 'templates' },
    service_id: { type: Types.ObjectId, ref: 'service_renovations' }
}, {
    timestamps: true,
    versionKey: false
});

TenantSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tenants", TenantSchema);