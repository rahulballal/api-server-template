const opts = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      affiliation: { type: 'string' },
    },
    required: ['name', 'affiliation'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        resource: { type: 'string' },
      },
      required: ['resource'],
    },
  },
};

function handler(req, res) {
  const { log, body } = req;
  log.info({ msg: body });
  res.send({ resource: '/v1/demo/4' });
}

module.exports = { opts, handler };
