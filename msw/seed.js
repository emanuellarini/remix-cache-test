const db = require('./factories');
const { faker } = require('@faker-js/faker');

let createdProjects = 0;
let createdTargetGroups = 0;

const seed = () => {
  Array.from({ length: 50 }).forEach(() => {
    createdProjects++;

    const project = db.project.create({
      id: createdProjects,
      name: `Project ${createdProjects}`,
      purchaseOrderNumber: faker.number.int({ min: 1, max: 100000 }),
      jobNumber: faker.number.int({ min: 1, max: 100000 }),
    });

    const targetGroups = Array.from({ length: 50 }).map(() => {
      createdTargetGroups++;

      return db.targetGroup.create({
        id: createdTargetGroups,
        name: `Target Group ${createdTargetGroups}`,
        earningsPerClick: faker.number.float({ min: 1, max: 5}),
        project
      })
    });

    db.project.update({
      where: {
        id: { equals: createdProjects }
      },
      data: {
        targetGroups
      }
    });
  });
}

module.exports = seed;