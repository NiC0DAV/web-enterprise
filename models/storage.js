'use strict'
const { Schema } = require('../config/environment');

const ReviewSchema = Schema({
    tenant_id: { type: Schema.ObjectId, ref: 'tenants', required: true },
    template_id: { type: Schema.ObjectId, ref: 'templates', required: true },
    file_type: { type: String, required: true },
    file_name: { type: String, required: true },
    file_path: { type: String, required: true },
    file_title: { type: String, required: true },
    file_description: { type: String, required: true },
    file_alt: { type: String, required: true },
    slider_status: { type: Number, required: true }
});

module.exports = mongoose.model("reviews", ReviewSchema);