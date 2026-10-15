import { api } from '@/lib/api';
import { FormField } from '@/components/forms';

export const dynamic = 'force-dynamic';

interface SettingsData {
  siteTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  contactEmail?: string;
  publicVisibility: boolean;
}

export default async function AdminSettingsPage() {
  let settings: SettingsData = {
    siteTitle: 'Nguyễn Hoàng Huynh — Full-Stack Developer Portfolio',
    seoDescription:
      'Personal developer portfolio, AI Agentic RAG case studies, and engineering showcase of Nguyễn Hoàng Huynh.',
    canonicalUrl: 'https://huynhportfolio.com',
    contactEmail: 'nguyenhoanghuynh.vn@gmail.com',
    publicVisibility: true,
  };

  try {
    const fetched = await api<SettingsData>('/admin/settings', true);
    if (fetched) {
      settings = { ...settings, ...fetched };
    }
  } catch {
    // Uses fallback defaults
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">ADMINISTRATION / SETTINGS</p>
          <h1>Site Configuration & Metadata</h1>
        </div>
      </div>

      <div className="admin-card">
        <form className="form-stack" action="/api/admin/settings" method="POST">
          <p className="lead-text">
            Configure global website settings, search engine metadata, and communication endpoints.
          </p>

          <FormField
            label="Global Site Title"
            name="siteTitle"
            defaultValue={settings.siteTitle}
            hint="Appears on browser tabs and search engine title results."
            required
          />

          <FormField
            label="SEO Meta Description"
            name="seoDescription"
            defaultValue={settings.seoDescription}
            hint="Summarizes your portfolio on Google search and social cards."
            required
          />

          <div className="form-grid">
            <FormField
              label="Canonical Public URL"
              name="canonicalUrl"
              defaultValue={settings.canonicalUrl || 'https://huynhportfolio.com'}
              placeholder="https://..."
            />
            <FormField
              label="Contact Routing Email"
              name="contactEmail"
              defaultValue={settings.contactEmail || 'nguyenhoanghuynh.vn@gmail.com'}
              placeholder="nguyenhoanghuynh.vn@gmail.com"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button button-dark">
              Save Global Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
