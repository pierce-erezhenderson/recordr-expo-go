import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    // Middleware to hash password before saving
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

userSchema.methods.comparePassword = function (candidatepassword) {
    // Method to compare password for login
    return bcrypt.compare(candidatepassword, this.password);
};

const User = model('User', userSchema);
export default User;
