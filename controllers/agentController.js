const Agent = require('../models/agentSchema');
const axios = require('axios');
const { USER_SERVICE_URL } = process.env;

// Register a new agent
const registerAgent = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, licenseNumber, commissionRate, profilePicture } = req.body;
  
  try {
    // Create new agent
    const newAgent = new Agent({
      firstName,
      lastName,
      email,
      phoneNumber,
      licenseNumber,
      commissionRate,
      profilePicture,
      userId: req.user.userId // Link to logged-in user
    });

    // Save agent to the database
    await newAgent.save();

    res.status(201).json({
      message: 'Agent registered successfully',
      agent: newAgent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering agent', error: error.message });
  }
};

// Get all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error: error.message });
  }
};

// Get agent by ID
const getAgentById = async (req, res) => {
  const agentId = req.params.id;
  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agent', error: error.message });
  }
};

// Update agent details
const updateAgent = async (req, res) => {
  const agentId = req.params.id;
  const updatedData = req.body;

  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Update agent with provided data
    Object.assign(agent, updatedData);

    await agent.save();
    res.status(200).json({
      message: 'Agent updated successfully',
      agent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating agent', error: error.message });
  }
};

// Delete agent
const deleteAgent = async (req, res) => {
  const agentId = req.params.id;
  
  try {
    const agent = await Agent.findByIdAndDelete(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting agent', error: error.message });
  }
};

module.exports = {
  registerAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent
};
