export async function getContent() {
  const res = await fetch('/api/content');
  if (!res.ok) throw new Error('Failed to load content');
  return res.json();
}

export async function sendLead(payload) {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || 'Failed to send lead');
  return data;
}
