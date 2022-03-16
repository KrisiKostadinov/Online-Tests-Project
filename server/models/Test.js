const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TestSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        _id: String,
        title: String,
        answers: [{
            _id: String,
            content: String,
            isCorrect: Boolean,
        }]
    }],
    category: {
        type: ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Test', TestSchema);