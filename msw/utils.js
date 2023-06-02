const { response, context }  = require('msw');

const res = (...transformers) =>
  response(
    ...transformers,
    context.delay(process.env.MSW_REQUESTS_DELAY ? Number(process.env.MSW_REQUESTS_DELAY) : 0)
  );

module.exports = { res };