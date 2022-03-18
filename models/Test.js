const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TestSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    questions: [{
        type: ObjectId,
        ref: 'Question'
    }],
    category: {
        type: ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Test', TestSchema);