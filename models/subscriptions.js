'use strict'
const { Schema } = require('../config/environment');

const SubscriptionSchema = Schema({
    adm_id: { type: Schema.ObjectId, ref: 'adm_users', required: true },
    subscription_name: { type: String, required: true },
    subscription_description: { type: String, required: true },
    subscription_type: { type: Number, required: true },
    subscription_time: { type: String, required: true },
    subcription_value: { type: Number, required: true },
    subscription_status: { type: Number, required: true}
},{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("subscriptions", SubscriptionSchema);