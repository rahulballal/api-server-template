const data = require('./data');

const opts = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        affiliation: { type: 'string' },
      },
    },
  },
};

function handler(req, res) {
  const { id } = req.params;
  const found = data[id];
  if (found) {
    res.send(found);
  } else {
    res.code(404).send({
      error: 'Not Found',
      message: 'Not found',
      statusCode: 404,
    });
  }
}

module.exports = { opts, handler };
