const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const { body, validationResult } = require('express-validator'); // Import validation tools

// Validation middleware for creating or updating agent
const agentValidation = [
  body('firstName').isString().notEmpty().withMessage('First name is required'),
  body('lastName').isString().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phoneNumber').isString().notEmpty().withMessage('Phone number is required'),
  body('licenseNumber').isString().notEmpty().withMessage('License number is required'),
  body('commissionRate').isFloat({ gt: 0 }).withMessage('Commission rate must be a positive number'),
  body('profilePicture').optional().isString().withMessage('Profile picture URL must be a string if provided'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * @swagger
 * /api/agents:
 *   post:
 *     summary: Create a new agent
 *     description: This route allows you to create a new real estate agent.
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
 *               licenseNumber:
 *                 type: string
 *               commissionRate:
 *                 type: number
 *               profilePicture:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created an agent
 *       400:
 *         description: Bad request, validation failed
 */
router.post('/', agentValidation, agentController.createAgent);

/**
 * @swagger
 * /api/agents:
 *   get:
 *     summary: Get all agents
 *     description: This route retrieves a list of all real estate agents.
 *     responses:
 *       200:
 *         description: A list of agents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 *       500:
 *         description: Internal server error
 */
router.get('/', agentController.getAgents);

/**
 * @swagger
 * /api/agents/{id}:
 *   get:
 *     summary: Get an agent by ID
 *     description: This route retrieves a specific agent by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the agent to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The agent with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agent'
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', agentController.getAgentById);

/**
 * @swagger
 * /api/agents/{id}:
 *   put:
 *     summary: Update an agent's details
 *     description: This route allows you to update the details of an existing agent.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the agent to update
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
 *               licenseNumber:
 *                 type: string
 *               commissionRate:
 *                 type: number
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the agent
 *       400:
 *         description: Bad request, invalid data
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', agentValidation, agentController.updateAgent);

/**
 * @swagger
 * /api/agents/{id}:
 *   delete:
 *     summary: Delete an agent
 *     description: This route allows you to delete an agent by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the agent to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the agent
 *       404:
 *         description: Agent not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
