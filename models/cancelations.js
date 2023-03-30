'use strict'
const { mongoose, Schema } = require('../config/environment');

const CancelSchema = Schema({
    tenant_id: { type: Schema.ObjectId, ref: 'tenants', required: true},
    subscription_id: { type: Schema.ObjectId, ref: 'subscriptions', required: true },
    cancel_date: { type: Date, required: true },
    cancel_reason: { type: String, required: true}
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("cancelations", CancelSchema);