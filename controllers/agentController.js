const Agent = require('../models/Agent');

// Create a new agent
exports.createAgent = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, licenseNumber, commissionRate, profilePicture } = req.body;
    const agent = new Agent({
      firstName,
      lastName,
      email,
      phoneNumber,
      licenseNumber,
      commissionRate,
      profilePicture
    });

    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    console.error('Error creating agent', err);
    res.status(500).json({ message: 'Error creating agent', error: err });
  }
};

// Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (err) {
    console.error('Error fetching agents', err);
    res.status(500).json({ message: 'Error fetching agents', error: err });
  }
};

// Get agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (err) {
    console.error('Error fetching agent', err);
    res.status(500).json({ message: 'Error fetching agent', error: err });
  }
};

// Update agent
exports.updateAgent = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, licenseNumber, commissionRate, profilePicture } = req.body;
    const updatedFields = { firstName, lastName, email, phoneNumber, licenseNumber, commissionRate, profilePicture };

    const agent = await Agent.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (err) {
    console.error('Error updating agent', err);
    res.status(500).json({ message: 'Error updating agent', error: err });
  }
};

// Delete agent
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (err) {
    console.error('Error deleting agent', err);
    res.status(500).json({ message: 'Error deleting agent', error: err });
  }
};
