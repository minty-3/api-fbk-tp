import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketType',
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  adresse_complete: {
    type: String,
    required: true
  },
  date_achat: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'tickets',
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

export default TicketSchema;
