const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    cliente: { type: String, required: true },
    data: { type: Date, required: true },
    services_ref: { required: true }, // reference
    employee_ref: { required: true }, // reference
    price: { type: parseFloat, required: true },
    excluded: { type: Boolean },
    create: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
