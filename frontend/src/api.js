import { API_BASE } from './data.js';

export async function apiRequest(url, postData) {
  const options = postData
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(postData) }
    : undefined;
  const res = await fetch(API_BASE + url, options);
  let json = null;
  try { json = await res.json(); } catch {}
  if (!res.ok || !json || json.success === false)
    throw new Error(json?.error || 'Server error (HTTP ' + res.status + ')');
  return json;
}
