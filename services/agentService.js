const Agent = require('../models/Agent');

// Service to get all agents
exports.getAllAgents = async () => {
  try {
    return await Agent.find();
  } catch (err) {
    throw new Error('Error fetching agents');
  }
};

// Service to get agent by ID
exports.getAgentById = async (id) => {
  try {
    return await Agent.findById(id);
  } catch (err) {
    throw new Error('Error fetching agent');
  }
};

// Service to create a new agent
exports.createNewAgent = async (agentData) => {
  try {
    const agent = new Agent(agentData);
    return await agent.save();
  } catch (err) {
    throw new Error('Error creating agent');
  }
};

// Service to update an agent's details
exports.updateAgentDetails = async (id, agentData) => {
  try {
    return await Agent.findByIdAndUpdate(id, agentData, { new: true });
  } catch (err) {
    throw new Error('Error updating agent');
  }
};

// Service to delete an agent
exports.deleteAgentById = async (id) => {
  try {
    return await Agent.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('Error deleting agent');
  }
};
