const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    file: { data: Buffer, contentType: String, name: String, size: Number }
});

module.exports = mongoose.model('Image', ImageSchema);
