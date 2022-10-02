const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxLength: 100 },
    lastname: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    color: { type: String, default: '#ffffff' },
    status: { type: Boolean, default: false },
    image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
});

// virtual properties
UserSchema
    .virtual('fullname')
    .get(function() {
        return `${ this.firstname } ${ this.lastname }`;
    });
UserSchema
    .virtual('url')
    .get(function() {
        return `/user/${ this._id }`;
    });

module.exports = mongoose.model('User', UserSchema);
