import { api } from '@/lib/api';
import type { Profile } from '@/lib/types';
import { defaultProfile } from '@/lib/types';
import { FormField } from '@/components/forms';

export const dynamic = 'force-dynamic';

export default async function AdminCertificatesPage() {
  let profile: Profile = defaultProfile;

  try {
    const fetched = await api<Profile>('/admin/profile', true);
    if (fetched) {
      profile = { ...defaultProfile, ...fetched };
    }
  } catch {
    // Uses defaultProfile
  }

  const primaryCert = profile.certificates?.[0] || defaultProfile.certificates[0];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">ADMINISTRATION / CERTIFICATES</p>
          <h1>Professional & Language Credentials</h1>
        </div>
      </div>

      <div className="admin-card">
        <form className="form-stack" action="/api/admin/profile" method="POST">
          <p className="lead-text">
            Manage your verified language and technical credentials displayed on the public portfolio.
          </p>

          <div className="form-grid">
            <FormField
              label="Certificate Name"
              name="certificates.0.name"
              defaultValue={primaryCert.name}
              required
            />
            <FormField
              label="Issuing Organization"
              name="certificates.0.issuer"
              defaultValue={primaryCert.issuer}
              required
            />
          </div>

          <div className="form-grid">
            <FormField
              label="Verified Score / Grade"
              name="certificates.0.score"
              defaultValue={primaryCert.score}
              required
            />
            <FormField
              label="Issue Date"
              name="certificates.0.issueDate"
              defaultValue={primaryCert.issueDate}
              required
            />
          </div>

          <FormField
            label="Verification Link (Optional)"
            name="certificates.0.verificationUrl"
            defaultValue={primaryCert.verificationUrl || ''}
            placeholder="https://..."
          />

          <div className="form-actions">
            <button type="submit" className="button button-dark">
              Save Certificate Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
