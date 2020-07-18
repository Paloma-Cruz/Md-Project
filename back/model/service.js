const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    excluded: { type: Boolean },
    create: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);
