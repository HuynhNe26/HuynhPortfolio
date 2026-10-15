import { api, requireAdmin } from '@/lib/api';
import { defaultProfile } from '@/lib/types';
import type { Profile } from '@/lib/types';
import { ApiForm, Field } from '@/components/forms';

export default async function EditProfile() {
  await requireAdmin();
  const profile = await api<Profile | null>('/admin/profile', true) || defaultProfile;

  return (
    <>
      <p className="eyebrow">
        IN YOUR OWN WORDS
      </p>
      <h1>
        Your profile
      </h1>
      <div className="form-panel">
        <ApiForm endpoint="/api/admin/profile" method="PUT" transform="profile" submitLabel="Save profile">
          <Field name="name" label="Full name" defaultValue={profile.name} required minLength={2} maxLength={100} />
          <Field name="title" label="Professional title" defaultValue={profile.title || 'Full-Stack Web Developer'} required maxLength={120} />
          <Field name="dateOfBirth" label="Date of birth" defaultValue={profile.dateOfBirth || 'August 26, 2005'} maxLength={50} />
          <Field name="hometown" label="Hometown" defaultValue={profile.hometown || 'Đồng Nai City, Vietnam'} maxLength={100} />
          <Field name="email" label="Contact email" type="email" defaultValue={profile.email || 'nguyenhoanghuynh.vn@gmail.com'} maxLength={254} />
          <Field name="phone" label="Phone number" defaultValue={profile.phone || '+84 937 569 205'} maxLength={50} />
          <Field name="headline" label="About headline" defaultValue={profile.headline} required minLength={5} maxLength={200} />
          <Field name="introduction" label="Homepage introduction" multiline defaultValue={profile.introduction} required minLength={10} maxLength={1000} />
          <Field name="biography" label="About you" multiline defaultValue={profile.biography} required minLength={20} maxLength={6000} />
          <Field name="location" label="Location (optional)" defaultValue={profile.location} maxLength={100} />
          <Field name="availability" label="Availability note (optional)" defaultValue={profile.availability} maxLength={150} />
          <Field name="skills" label="Skills, comma separated" defaultValue={profile.skills.join(', ')} />
          <Field name="resumeUrl" label="Resume link (optional)" type="url" defaultValue={profile.resumeUrl || ''} maxLength={2048} />
          <Field name="githubUrl" label="GitHub HTTPS URL (optional)" type="url" defaultValue={profile.githubUrl || ''} maxLength={2048} />
          <Field name="linkedinUrl" label="LinkedIn HTTPS URL (optional)" type="url" defaultValue={profile.linkedinUrl || ''} maxLength={2048} />
        </ApiForm>
      </div>
    </>
  );
}
