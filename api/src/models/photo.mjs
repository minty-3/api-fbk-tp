import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'lieType'
  },
  lieType: {
    type: String,
    required: true,
    enum: ['Album', 'Event']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'photos',
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

export default PhotoSchema;
