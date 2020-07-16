const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    phone: { type: String },
    excluded: { type: Boolean, required: true },
    super_admin: { type: Boolean, required: true },
    //services: { type: Array }, // reference
    create: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if(!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);
