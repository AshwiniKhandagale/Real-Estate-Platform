const express = require('express');
const router = express.Router();
const { registerAgent, loginAgent } = require('../controllers/authController');
const { swaggerUi } = require('../swagger');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new agent
 *     tags: [Admin]
 *     description: Registers a new agent with required information, including a password.
 *     operationId: registerAgent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - licenseNumber
 *               - commissionRate
 *               - password
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agent registered successfully
 *       400:
 *         description: Agent already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerAgent);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login an existing agent
 *     tags: [Admin]
 *     description: Logs in an existing agent by verifying their email and password.
 *     operationId: loginAgent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       404:
 *         description: Agent not found
 *       400:
 *         description: Invalid password
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginAgent);

module.exports = router;
