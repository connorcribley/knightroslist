const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userID:{
        type:Schema.Types.PbjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: {typeLString, required: true},
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("token", tokenSchema);
