const { primaryKey, factory, nullable, manyOf, oneOf }  = require('@mswjs/data');

const targetGroup = {
  id: primaryKey(Number),
  name: String,
  project: oneOf('project'),
  earningsPerClick: nullable(Number),
  createdAt: () => Date.now(),
};

const project = {
  id: primaryKey(Number),
  name: String,
  targetGroups: manyOf('targetGroup'),
  purchaseOrderNumber: nullable(Number),
  jobNumber: nullable(Number),
  createdAt: () => Date.now(),
};

const db = factory({
  targetGroup,
  project
});

module.exports = db;