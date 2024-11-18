const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/sync:
 *   post:
 *     summary: Sync agent data with other microservices
 *     description: This endpoint allows syncing agent data between microservices.
 *     responses:
 *       200:
 *         description: Successfully synced data
 *       500:
 *         description: Internal server error
 */
router.post('/sync', (req, res) => {
  // Logic to sync data with other services goes here
  res.status(200).json({ message: 'Data synced successfully' });
});

module.exports = router;
