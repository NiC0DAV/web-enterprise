  
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const SubscriptionSchema = new Schema({
    adm_id: { type: Types.ObjectId, ref: 'adm_users', required: true },
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

SubscriptionSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("subscriptions", SubscriptionSchema);