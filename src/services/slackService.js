export async function fetchSlackUpdates() {
  const res = await fetch('/api/updates/slack', {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Slack updates request failed: ${res.status}`);
  }

  const data = await res.json();
  if (!data || !Array.isArray(data.items)) {
    return { items: [] };
  }
  return { items: data.items };
}
