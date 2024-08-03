import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const itemSchema = new Schema({
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
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true,
    },
}, { timestamps: true });

const Item = model('Item', itemSchema);
export default Item;