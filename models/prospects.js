'use strict'
const { Schema } = require('../config/environment');

const ProspectSchema = Schema({
    tenant_id: { type: Schema.ObjectId, ref: 'tenants', required: true },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    whatsapp_number: { type: String },
    message: { type: String, required: true },
    location_ip: { type: String, required: true},
    status: { type: Status, required: true }
});

module.exports = mongoose.model("prospects", ProspectSchema);