const ping = {
  opts: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler(req, res) {
    res.send({ message: 'pong' });
  },
};

module.exports = ping;
