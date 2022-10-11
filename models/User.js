const { Schema, model } = require("mongoose");

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    educationFormKz: {
        type: String
    },
    educationFormRu: {
        type: String
    },
    educationFormEn: {
        type: String
    },
    educationCode:{
        type: String
    }
}, {
    timestamps: true
});

module.exports = model("User", User);

