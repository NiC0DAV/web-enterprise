import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const TemplateSchema = new Schema({
    admin_id: { type: Types.ObjectId, ref: 'admins', required: true },
    name: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    preview_path: { type: String, required: true },
    template_status: { type: Number, required: true }
},{
    timestamps: true,
    versionKey: false
});

TemplateSchema.plugin(MongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("templates", TemplateSchema);