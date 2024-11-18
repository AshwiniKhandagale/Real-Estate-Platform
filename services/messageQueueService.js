const amqp = require('amqplib');

exports.publishMessage = async (event, payload) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const exchange = 'real_estate_events';

  await channel.assertExchange(exchange, 'topic', { durable: true });
  channel.publish(exchange, event, Buffer.from(JSON.stringify(payload)));

  setTimeout(() => connection.close(), 500); // Close connection
};
