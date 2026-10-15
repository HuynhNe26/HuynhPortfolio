import { api } from '@/lib/api';
import type { Profile } from '@/lib/types';
import { defaultProfile } from '@/lib/types';
import { FormField } from '@/components/forms';

export const dynamic = 'force-dynamic';

export default async function AdminEducationPage() {
  let profile: Profile = defaultProfile;

  try {
    const fetched = await api<Profile>('/admin/profile', true);
    if (fetched) {
      profile = { ...defaultProfile, ...fetched };
    }
  } catch {
    // Uses defaultProfile
  }

  const primaryEdu = profile.education?.[0] || defaultProfile.education[0];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">ADMINISTRATION / EDUCATION</p>
          <h1>Academic Background</h1>
        </div>
      </div>

      <div className="admin-card">
        <form className="form-stack" action="/api/admin/profile" method="POST">
          <p className="lead-text">
            Configure your active university education history, degree program, cumulative GPA, and academic timeline.
          </p>

          <div className="form-grid">
            <FormField
              label="Institution / University Name"
              name="education.0.institution"
              defaultValue={primaryEdu.institution}
              required
            />
            <FormField
              label="Major / Discipline"
              name="education.0.major"
              defaultValue={primaryEdu.major}
              required
            />
          </div>

          <div className="form-grid">
            <FormField
              label="Degree Title"
              name="education.0.degree"
              defaultValue={primaryEdu.degree}
              required
            />
            <FormField
              label="Academic Period"
              name="education.0.period"
              defaultValue={primaryEdu.period}
              required
            />
          </div>

          <div className="form-grid">
            <FormField
              label="Cumulative GPA"
              name="education.0.gpa"
              defaultValue={primaryEdu.gpa}
              required
            />
            <FormField
              label="Academic Stage / Note"
              name="education.0.note"
              defaultValue={primaryEdu.note || ''}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button button-dark">
              Save Academic History
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
