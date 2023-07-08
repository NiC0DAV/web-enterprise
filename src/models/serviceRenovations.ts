
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const ServiceRenovationsSchema = new Schema({
    payment_id: { type: Types.ObjectId, ref: 'payments', required: true },
    subsctiption_id: { type: Types.ObjectId, ref: 'subscriptions', required: true },
    subscription_date: { type: Date, default: Date.now, required: true},
    subscription_renovation_date: { type: Date, required: true },
    service_status: { type: Number , required: true}
}, {
    timestamps: true,
    versionKey: false
});

ServiceRenovationsSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("service_renovations", ServiceRenovationsSchema);
