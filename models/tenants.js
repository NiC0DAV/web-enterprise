'use strict'
const { mongoose, Schema } = require('../config/environment');
const mongooseDelete = require('mongoose-delete');

const TenantSchema = Schema({
    payment_id: { type: Schema.ObjectId, ref: 'payments' },
    subscription_id: { type: Schema.ObjectId, ref: 'subscriptions', required: true },
    template_id: { type: Schema.ObjectId, ref: 'templates' },
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

TenantSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tenants", TenantSchema);