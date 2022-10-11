const { Schema, model } = require("mongoose");

const Topic = new Schema({
    nameKz: { required: true, type: String },
    nameRu: { required: true, type: String },
    nameEn:{ required: true, type: String },
    goals:{ required: true, type: String },
    tasks:{ required: true, type: String },
    takenBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, {
    timestamps: true
});

module.exports = model("Topic", Topic);

