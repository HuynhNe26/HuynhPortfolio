import { ObjectId } from 'mongodb';
import { collections } from './database.js';
import { HttpError } from './errors.js';
import type { ProjectInput } from './models.js';

export function objectId(value: string): ObjectId {
  if (!/^[a-f0-9]{24}$/i.test(value)) {
    throw new HttpError(400, 'Invalid record identifier.');
  }

  return new ObjectId(value);
}

export async function listProjects(includeDrafts = false) {
  const { projects } = await collections();
  return projects.find(includeDrafts ? {} : {
    published: true
  })
    .sort({
      featured: -1,
      createdAt: -1
    })
    .limit(200)
    .toArray();
}

export async function saveProject(input: ProjectInput, id?: string) {
  const { projects } = await collections();
  const now = new Date();

  if (id) {
    const result = await projects.findOneAndUpdate(
      {
        _id: objectId(id)
      },
      {
        $set: {
          ...input,
          updatedAt: now
        }
      },
      {
        returnDocument: 'after'
      },
    );

    if (!result) {
      throw new HttpError(404, 'Project not found.');
    }

    return result;
  }

  const project = {
    ...input,
    _id: new ObjectId(),
    createdAt: now,
    updatedAt: now,
  };

  await projects.insertOne(project);
  return project;
}
