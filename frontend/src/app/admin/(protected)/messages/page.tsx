import { api, requireAdmin } from '@/lib/api';
import type { Message } from '@/lib/types';
import { MutationButton } from '@/components/forms';

export default async function Inbox() {
  await requireAdmin();
  const messages = await api<Message[]>('/admin/messages', true);

  return (
    <>
      <p className="eyebrow">
        CONVERSATIONS START HERE
      </p>
      <h1>
        Your inbox
      </h1>
      <p className="muted">
        Showing the latest 200 messages. Email delivery status is independent of the saved message.
      </p>
      {!messages.length && (
        <div className="form-panel">
          <h2>
            All quiet for now.
          </h2>
          <p>
            Messages from your contact form will appear here.
          </p>
        </div>)}
      <div className="admin-list">
        {messages.map((message) => (
          <article className="message-card" key={message._id}>
            <div className="section-heading">
              <div>
                <h2>
                  {message.name}
                </h2>
                <a href={`mailto:${message.email}`}>
                  {message.email}
                </a>
              </div>
              <span className="badge">
                {message.status}
              </span>
            </div>
            <p className="preserve-lines">
              {message.message}
            </p>
            <p className="muted">
              {new Date(message.createdAt).toLocaleDateString('en-GB', {
                timeZone: 'UTC'
              })} · Email notification: {message.delivery}
            </p>
            <div className="row-actions">
              {(['unread', 'read', 'archived'] as const).filter((status) => status !== message.status).map((status) => (
                <MutationButton key={status} endpoint={`/api/admin/messages/${message._id}`} method="PATCH" label={`Mark ${status}`} body={{
                  status
                }} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
