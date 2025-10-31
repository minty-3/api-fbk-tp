import mongoose from 'mongoose';

const DiscussionSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
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
  messages: [{
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    contenu: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  collection: 'discussions',
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

export default DiscussionSchema;
