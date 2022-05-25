const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please write your thought',
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAt) => moment(createdAt).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        // Virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false
    }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initialize our User model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;