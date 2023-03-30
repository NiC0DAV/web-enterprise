'use strict'
const { mongoose, Schema } = require('../config/environment');
const mongooseDelete = require('mongoose-delete');

const UserSchema = Schema({
    tenant_id: { type: Schema.ObjectId, ref: 'tenants', required: true },
    name: { type: String, required: true },
    surname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user_status: { type: Number, required: true}
},{
    timestamps: true,
    versionKey: false
});

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("users", UserSchema);