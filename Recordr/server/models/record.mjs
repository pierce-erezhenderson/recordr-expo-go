import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recordSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    description: {
        type: Number,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Record = model('Record', recordSchema);
export default Record;