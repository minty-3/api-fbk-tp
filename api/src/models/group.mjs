import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icone: {
    type: String,
    required: true
  },
  photo_couverture: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['public', 'private', 'secret'],
    required: true
  },
  autoriser_publication: {
    type: Boolean,
    default: true
  },
  autoriser_creation_evenements: {
    type: Boolean,
    default: true
  },
  administrateurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  membres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  collection: 'groups',
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

export default GroupSchema;
