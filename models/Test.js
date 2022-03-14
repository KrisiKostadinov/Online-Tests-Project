const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TestSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        title: String,
        answers: [{
            type: String,
        }]
    }],
    category: {
        type: ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Test', TestSchema);