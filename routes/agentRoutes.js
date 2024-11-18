// routes/agentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAgents, getAgentById, updateAgent, deleteAgent } = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Agent
 *   description: Agent endpoints
 */

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all agents
 *     tags: [Agent]
 *     description: Fetch all the agents registered in the system.
 *     operationId: getAllAgents
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of agents
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getAllAgents);

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Get agent by ID
 *     tags: [Agent]
 *     description: Fetch details of a single agent by their ID.
 *     operationId: getAgentById
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the agent to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agent found
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authMiddleware, getAgentById);

/**
 * @swagger
 * /agents/{id}:
 *   put:
 *     summary: Update agent details
 *     tags: [Agent]
 *     description: Update the details of an agent by ID.
 *     operationId: updateAgent
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the agent to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               commissionRate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Agent updated
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, updateAgent);

/**
 * @swagger
 * /agents/{id}:
 *   delete:
 *     summary: Delete agent
 *     tags: [Agent]
 *     description: Delete an agent by their ID.
 *     operationId: deleteAgent
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the agent to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agent deleted successfully
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, deleteAgent);

module.exports = router;
