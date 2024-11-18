const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Agent = require('../models/agentSchema');

// Register new agent
const registerAgent = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, licenseNumber, commissionRate, profilePicture, password } = req.body;
  
  try {
    // Check if agent already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }

    // Create a new agent with the password
    const newAgent = new Agent({
      firstName,
      lastName,
      email,
      phoneNumber,
      licenseNumber,
      commissionRate,
      profilePicture,
      password
    });

    // Save the agent
    await newAgent.save();
    res.status(201).json({ message: 'Agent registered successfully', agent: newAgent });
  } catch (error) {
    res.status(500).json({ message: 'Error registering agent', error: error.message });
  }
};

// Login agent
const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, agent.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: agent._id, email: agent.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      agent: {
        id: agent._id,
        firstName: agent.firstName,
        lastName: agent.lastName,
        email: agent.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in agent', error: error.message });
  }
};

module.exports = { registerAgent, loginAgent };
