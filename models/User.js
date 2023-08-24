const { Schema, Types } = require('mongoose');
const thoughtSchema = require('./Thought');

//Schema for creating Student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            
        }
    }
)