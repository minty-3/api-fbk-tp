import mongoose from 'mongoose';

const TicketTypeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  montant: {
    type: Number,
    required: true
  },
  quantite: {
    type: Number,
    required: true
  },
  evenement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
}, {
  collection: 'ticket_types',
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

export default TicketTypeSchema;
