  
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const TenantSchema = new Schema({
    subscription_id: { type: Types.ObjectId, ref: 'subscriptions', required: true },
    template_id: { type: Types.ObjectId, ref: 'templates' },
    tenant: {
        name: { type: String, required: true },
        surname: { type: String },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        country: { type: String, required: true },
        company_name: { type: String, required: true },
        domain_name: { type: String, required: true },
        creation_date: { type: Date, default: Date.now },
        subdomain_status: { type: Number, required: true }
    },
    subscription: {
        subscription_date: { type: Date, required: true },
        subscription_renovation_date: { type: Date, required: true },
        subscription_status: { type: Number, required: true },
        subscription_recurrence: { type: Number }
    },
}, {
    timestamps: true,
    versionKey: false
});

TenantSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tenants", TenantSchema);