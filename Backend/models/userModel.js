import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, },
    password: { type: String, required: true },
    mobile: { type: Number, require: true},
});

const User = mongoose.model('user-managament-project', userSchema);

export default User;