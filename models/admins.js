'use strict'
const { mongoose, Schema } = require('../config/environment');

const AdminSchema = Schema({
    admin_id: { type: Schema.ObjectId, ref: 'admins' },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verif_code: { type: String, required: true },
    last_connection: { type: Date },
    rol: { type: Number, default: 0, required: true },
    user_status: { type: Number, default: 0, required: true }
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("admins", AdminSchema);