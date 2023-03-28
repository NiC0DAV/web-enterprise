'use strict'
const { Schema } = require('../config/environment');

const TemplateSchema = Schema({
    admin_id: { type: Schema.ObjectId, ref: 'admins', required: true },
    name: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    preview_path: { type: String, required: true },
    template_status: { type: Number, required: true }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("templates", TemplateSchema);