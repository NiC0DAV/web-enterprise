  
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

//Averiguar que datos se requiere conservar para tarjetas tokenizadas y pagos automaticos
const PaymentSchema = new Schema({
    tenant_id: { type: Types.ObjectId, ref: 'tenants', required: true},
    subscription_id: { type: Types.ObjectId, ref: 'subscriptions', required: true },
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

PaymentSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("payments", PaymentSchema);