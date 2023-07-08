import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const CancelSchema = new Schema({
    service_id: { type: Types.ObjectId, ref: 'service_renovations', required: true},
    cancel_date: { type: Date, required: true },
    cancel_reason: { type: String, required: true}
},{
    timestamps: true,
    versionKey: false
});

CancelSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("cancelations", CancelSchema);