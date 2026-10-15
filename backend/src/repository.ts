import { ObjectId } from 'mongodb';
import { collections } from './database.js';
import { HttpError } from './errors.js';
import type { MediaAsset, ProjectInput, SiteSettingsInput } from './models.js';

export function objectId(value: string): ObjectId {
  if (!/^[a-f0-9]{24}$/i.test(value)) {
    throw new HttpError(400, 'Invalid record identifier.');
  }

  return new ObjectId(value);
}

export async function listProjects(includeDrafts = false) {
  const { projects } = await collections();
  return projects
    .find(includeDrafts ? {} : { published: true })
    .sort({
      featured: -1,
      order: 1,
      createdAt: -1,
    })
    .limit(200)
    .toArray();
}

export async function getProjectById(id: string) {
  const { projects } = await collections();
  const project = await projects.findOne({ _id: objectId(id) });
  if (!project) {
    throw new HttpError(404, 'Project not found.');
  }
  return project;
}

export async function getProjectBySlug(slug: string) {
  const { projects } = await collections();
  const project = await projects.findOne({ slug, published: true });
  if (!project) {
    throw new HttpError(404, 'Project not found.');
  }
  return project;
}

export async function saveProject(input: ProjectInput, id?: string) {
  const { projects } = await collections();
  const now = new Date();

  if (id) {
    const result = await projects.findOneAndUpdate(
      { _id: objectId(id) },
      {
        $set: {
          ...input,
          updatedAt: now,
        },
      },
      { returnDocument: 'after' }
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

export async function deleteProject(id: string) {
  const { projects } = await collections();
  const result = await projects.deleteOne({ _id: objectId(id) });
  if (!result.deletedCount) {
    throw new HttpError(404, 'Project not found.');
  }
  return { message: 'Project deleted successfully.' };
}

export async function getSiteSettings() {
  const { siteSettings } = await collections();
  const settings = await siteSettings.findOne({ _id: 'settings' });
  if (!settings) {
    return {
      _id: 'settings',
      siteTitle: 'Nguyễn Hoàng Huynh — Full-Stack Developer Portfolio',
      seoDescription: 'Personal developer portfolio and interactive project case studies of Nguyễn Hoàng Huynh.',
      canonicalUrl: 'https://huynhportfolio.com',
      contactEmail: 'nguyenhoanghuynh.vn@gmail.com',
      publicVisibility: true,
      updatedAt: new Date(),
    };
  }
  return settings;
}

export async function saveSiteSettings(input: SiteSettingsInput) {
  const { siteSettings } = await collections();
  const now = new Date();
  await siteSettings.updateOne(
    { _id: 'settings' },
    {
      $set: {
        ...input,
        updatedAt: now,
      },
    },
    { upsert: true }
  );
  return { message: 'Site settings updated successfully.' };
}

export async function listMediaAssets() {
  const { mediaAssets } = await collections();
  return mediaAssets.find().sort({ createdAt: -1 }).limit(100).toArray();
}

export async function saveMediaAsset(input: Omit<MediaAsset, '_id' | 'createdAt'>) {
  const { mediaAssets } = await collections();
  const asset: MediaAsset = {
    ...input,
    _id: new ObjectId(),
    createdAt: new Date(),
  };
  await mediaAssets.insertOne(asset);
  return asset;
}

export async function deleteMediaAsset(id: string) {
  const { mediaAssets } = await collections();
  const result = await mediaAssets.deleteOne({ _id: objectId(id) });
  if (!result.deletedCount) {
    throw new HttpError(404, 'Media asset not found.');
  }
  return { message: 'Media asset deleted successfully.' };
}
