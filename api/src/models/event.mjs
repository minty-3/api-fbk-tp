import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_debut: {
    type: Date,
    required: true
  },
  date_fin: {
    type: Date,
    required: true
  },
  lieu: {
    type: String,
    required: true
  },
  photo_couverture: {
    type: String,
    required: true
  },
  visibilite: {
    type: String,
    enum: ['public', 'private'],
    required: true
  },
  organisateurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  membres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  collection: 'events',
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

export default EventSchema;
