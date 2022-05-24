const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        // Virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

// Create a virtual property `friendCount` that retrieves the length of the friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
