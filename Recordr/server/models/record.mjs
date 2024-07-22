import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const recordSchema = new Schema({
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
    },
    date: {
        type: Date,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Record = model('Record', recordSchema);
export default Record;