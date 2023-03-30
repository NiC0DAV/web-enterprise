'use strict'
const { mongoose, Schema } = require('../config/environment');
const mongooseDelete = require('mongoose-delete');

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

TemplateSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("templates", TemplateSchema);