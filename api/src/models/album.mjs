import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  evenement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  public: {
    type: Boolean,
    default: true
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
  }]
}, {
  collection: 'albums',
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

export default AlbumSchema;
