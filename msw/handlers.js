const { rest } = require('msw');
const db = require('./factories');
const { res } = require('./utils');

module.exports = [
  rest.get(
    'http://localhost:3000/api/projects',
    (req, _, ctx) => {
      const data = db.project.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res(
        ctx.json(data.map(item => ({...item, targetGroups: undefined })))
      );
    }
  ),
  rest.get(
    'http://localhost:3000/api/projects/:projectId',
    (req, _, ctx) => {
      const projectId = req.params.projectId;

      const data = db.project.findFirst({
        where: {
          id: {
            equals: Number(projectId)
          }
        }
      });

      return res(ctx.json({
        ...data,
        targetGroups: undefined
      }));
    }
  ),
  rest.post('http://localhost:3000/api/projects', async (req, _, ctx) => {
    const totalProjects = db.project.count();
    const values = await req.json();

    const data = db.project.create({
      id: totalProjects + 1,
      ...values
    });

    return res(ctx.json({
      ...data,
      targetGroups: undefined
    }));
  }),
  rest.put(
    'http://localhost:3000/api/projects/:projectId',
    async (req, _, ctx) => {
      const projectId = req.params.projectId;

      const data = db.project.update({
        where: {
          id: { equals: Number(projectId) }
        },
        data: await req.json()
      });

      return res(ctx.json({
        ...data,
        targetGroups: undefined
      }));
    }
  ),
  rest.get(
    'http://localhost:3000/api/projects/:projectId/target-groups',
    (req, _, ctx) => {
      const projectId = req.params.projectId;

      const data = db.targetGroup.findMany({
        where: {
          project: {
            id: { equals: Number(projectId) }
          }
        }
      });

      return res(
        ctx.json(data.map(item => ({...item, project: undefined })))
      );
    }
  )
];
