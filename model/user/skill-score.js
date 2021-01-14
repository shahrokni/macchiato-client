var mongoose = require('mongoose');

var skillScoreSchema = new mongoose.Schema(
    {
        listeningScore: { type: mongoose.Schema.Types.Number, required: true, default: 0 },
        readingScore: { type: mongoose.Schema.Types.Number, required: true, default: 0 },
        speakingScore: { type: mongoose.Schema.Types.Number, required: true, default: 0 },
        writingScore: { type: mongoose.Schema.Types.Number, required: true, default: 0 },
        slangScore: { type: mongoose.Schema.Types.Number, required: true, default: 0 },
        vocabScore: { type: mongoose.Schema.Types.Number, required: true, default: 0 }
    }
);

module.exports = skillScoreSchema;


