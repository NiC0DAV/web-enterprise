'use strict'
const { mongoose, Schema } = require('../config/environment');

const TenantSchema = Schema({
    payment_id: { type: Schema.ObjectId, ref: 'payments' },
    subscription_id: { type: Schema.ObjectId, ref: 'subscriptions', required: true },
    template_id: { type: Schema.ObjectId, ref: 'templates' },
    tenant: {
        name: { type: String, required: true },
        surname: { type: String },
        email: { type: String, unique: true },
        country: { type: String, required: true },
        company_name: { type: String, required: true },
        domain_name: { type: String, required: true },
        creation_date: { type: Date, default: Date.now, required: true },
        subdomain_status: { type: Number, required: true },
        tenant_status: { type: Number, required: true }
    },
    subscription: {
        subscription_date: { type: Date, required: true },
        subscription_renovation_date: { type: Date, required: true },
        subscription_status: { type: Number, required: true },
        subscription_recurrence: { type: Number }
    },
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("tenants", TenantSchema);