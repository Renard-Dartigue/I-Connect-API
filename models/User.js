const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
const Thought = require('./Thought');

//Schema for creating Student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        thoughts: [Thought],
        friends: [Friend]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friend.length;
});

const User = model('user', userSchema);

module.exports = User;