const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  commissionRate: {
    type: Number,
    required: true
  },
  profilePicture: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
