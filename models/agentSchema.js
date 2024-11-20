const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  commissionRate: { type: Number, required: true },
  profilePicture: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign Key to User
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
