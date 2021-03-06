import mongoose from 'mongoose';

const { Schema } = mongoose;

// create User Schema
const User = new Schema({
    displayName: String,
    username: String,
    twitterId: String,
    token: String,
    secret: String,
    data: Object,
    tags: Array,
},
{
    timestamps: true,
});

module.exports = mongoose.model('users', User);
