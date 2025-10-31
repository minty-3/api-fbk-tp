import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  lie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'lieType'
  },
  lieType: {
    type: String,
    required: true,
    enum: ['Group', 'Event']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'polls',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    const retUpdated = ret;
    retUpdated.id = ret._id;

    delete retUpdated._id;
    delete retUpdated.__v;

    return retUpdated;
  }
});

export default PollSchema;
