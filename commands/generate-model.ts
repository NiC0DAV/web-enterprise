import * as fs from "fs";

const modelName = process.argv[2];

if (!modelName) {
    console.error("Please specify the name of the model.");
    process.exit(1);
}

const modelContent = `
import environment from '../../config/environment';

const { mongoose, Schema, Types } = environment;
import MongooseDelete from 'mongoose-delete';

const ${modelName.charAt(0).toUpperCase() + modelName.slice(1)}Schema = new Schema({
    /**
     * Enter here the fields that you want on your mongo collection
     * Eg: name: { type: String, required: true },
     *     surname: { type: String },
     *     email: { type: String, unique: true },
     */
}, {
    timestamps: true,
    versionKey: false
});

${modelName.charAt(0).toUpperCase() + modelName.slice(1)}Schema.plugin(MongooseDelete, { overrideMethods: "all" });
const ${modelName.toLowerCase()}Model = mongoose.model("${modelName.replace(/([A-Z])/g, '_$1').toLowerCase()}", ${modelName.charAt(0).toUpperCase() + modelName.slice(1)}Schema);
export default ${modelName.toLowerCase()}Model;
`;

fs.writeFile(`src/models/${modelName}.ts`, modelContent, (err) => {
    if (err) {
        console.error("There was an error creating the model:", err);
    } else {
        console.log(`The model ${modelName} has been created succesfully.`);

        const modelsFileContent = fs.readFileSync("src/models/index.ts", "utf-8");
        const modelsFileUpdatedContent = modelsFileContent.replace("export default models;", `import ${modelName.toLowerCase()}Model from './${modelName}';\n\nconst models: any = {\n    ...models,\n    ${modelName.toLowerCase()}Model,\n};\n\nexport default models;`);
        fs.writeFileSync("src/models/index.ts", modelsFileUpdatedContent, "utf-8");
    }
});
