import { api } from '@/lib/api';
import type { Profile } from '@/lib/types';
import { defaultProfile } from '@/lib/types';
import { FormField } from '@/components/forms';

export const dynamic = 'force-dynamic';

export default async function AdminSkillsPage() {
  let profile: Profile = defaultProfile;

  try {
    const fetched = await api<Profile>('/admin/profile', true);
    if (fetched) {
      profile = { ...defaultProfile, ...fetched };
    }
  } catch {
    // Uses defaultProfile
  }

  const skillsCat = profile.skillsCategorized || defaultProfile.skillsCategorized;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">ADMINISTRATION / SKILLS</p>
          <h1>Technical Expertise & Categories</h1>
        </div>
      </div>

      <div className="admin-card">
        <form className="form-stack" action="/api/admin/profile" method="POST">
          <p className="lead-text">
            Organize skills by architectural tier. Separate individual technologies with commas.
          </p>

          <FormField
            label="Frontend Development Technologies"
            name="skillsCategorized.frontend"
            defaultValue={skillsCat.frontend.join(', ')}
            hint="E.g. React.js, Next.js, Vite, TypeScript, JavaScript, Tailwind CSS"
            required
          />

          <FormField
            label="Backend Engineering & Protocol Stack"
            name="skillsCategorized.backend"
            defaultValue={skillsCat.backend.join(', ')}
            hint="E.g. Node.js, Express.js, REST APIs, WebSocket, Authentication"
            required
          />

          <FormField
            label="Databases & Caching Layers"
            name="skillsCategorized.databases"
            defaultValue={skillsCat.databases.join(', ')}
            hint="E.g. MongoDB Atlas, PostgreSQL (Neon), Redis"
            required
          />

          <FormField
            label="APIs & Third-Party Integrations"
            name="skillsCategorized.apis"
            defaultValue={skillsCat.apis.join(', ')}
            hint="E.g. Resend API, Cloudinary, MoMo API, Gemini API, LangChain.js"
            required
          />

          <FormField
            label="Developer Tools & Cloud Deployment"
            name="skillsCategorized.tools"
            defaultValue={skillsCat.tools.join(', ')}
            hint="E.g. Git, GitHub, Vercel, Docker, Postman"
            required
          />

          <div className="form-actions">
            <button type="submit" className="button button-dark">
              Save Technical Skills
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
