'use strict'
const { mongoose, Schema } = require('../config/environment');

//Averiguar que datos se requiere conservar para tarjetas tokenizadas y pagos automaticos

const PaymentSchema = Schema({
    tenant_id: { type: Schema.ObjectId, ref: 'tenants', required: true},
    subscription_id: { type: Schema.ObjectId, ref: 'subscriptions', required: true },
    invoice_number: { type: String, required: true },
    unique_tracking_code: { type: String, required: true, unique: true },
    payment_value: { type: Number, required: true },
    payment_description: { type: String, required: true },
    payment_status: { type: String, required: true },
    payment_date: { type: Date, required: true },
    origin_ip: { type: String, required: true },
    retries: { type: Number },
    gateway_response_code: { type: String },
    gateway_response_message: { type: String }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("payments", PaymentSchema);