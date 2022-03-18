const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    answers: [{
        content: String,
        isCorrect: Boolean,
    }],
    test: {
        type: ObjectId,
        ref: 'Test'
    },
    solvedCount: {
        type: Number
    }
});

module.exports = mongoose.model('Question', QuestionSchema);