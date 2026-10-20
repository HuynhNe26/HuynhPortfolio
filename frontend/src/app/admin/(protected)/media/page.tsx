import { api } from '@/lib/api';
import type { MediaAsset } from '@/lib/types';
import { FormField, MutationButton } from '@/components/forms';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  let assets: MediaAsset[] = [];

  try {
    assets = await api<MediaAsset[]>('/admin/media', true);
  } catch {
    // Media service empty
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">ADMINISTRATION / MEDIA</p>
          <h1>Media Asset Library</h1>
        </div>
      </div>

      <div className="admin-card">
        <h3>Register New Media Asset</h3>
        <p className="lead-text">
          Add an image asset URL (from Cloudinary or external CDN) with accessible alt text to include in projects and
          storytelling case studies.
        </p>

        <form className="form-stack" action="/api/admin/media" method="POST">
          <div className="form-grid">
            <FormField
              label="Asset URL (HTTPS)"
              name="url"
              placeholder="https://res.cloudinary.com/..."
              required
            />
            <FormField
              label="Accessible Alt Description"
              name="altText"
              placeholder="E.g. Concert ticketing seat map screenshot"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button button-dark">
              Register Asset
            </button>
          </div>
        </form>
      </div>

      <div className="admin-card" style={{ marginTop: '32px' }}>
        <h3>Stored Media Assets ({assets.length})</h3>
        {assets.length > 0 ? (
          <div className="media-gallery-grid">
            {assets.map((item) => (
              <div key={item._id.toString()} className="media-item-card">
                <div className="media-preview-box">
                  <img src={item.url} alt={item.altText} className="media-preview-img" />
                </div>
                <div className="media-info">
                  <p className="media-alt">{item.altText}</p>
                  <p className="media-url">{item.url}</p>
                  <MutationButton
                    endpoint={`/api/admin/media/${item._id.toString()}`}
                    method="DELETE"
                    label="Delete Asset"
                    confirm="Remove this media asset from library?"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-notice">
            No media assets registered yet. Add asset URLs above or connect Cloudinary credentials in <code>backend/.env</code>.
          </p>
        )}
      </div>
    </div>
  );
}
