const express = require('express');
const router = express.Router();
const { registerAgent, getAllAgents, getAgentById, updateAgent, deleteAgent } = require('../controllers/agentController');
const verifyToken = require('../middleware/authMiddleware');

// Register a new agent
router.post('/agents/register', verifyToken, registerAgent);

// Get all agents
router.get('/agents', verifyToken, getAllAgents);

// Get agent by ID
router.get('/agents/:id', verifyToken, getAgentById);

// Update agent details
router.put('/agents/:id', verifyToken, updateAgent);

// Delete agent
router.delete('/agents/:id', verifyToken, deleteAgent);

module.exports = router;
