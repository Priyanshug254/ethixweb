/**
 * API client for interacting with serverless endpoints.
 */

export async function submitLead(leadData) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || 'Failed to submit enquiry. Please check your information.';
    const err = new Error(errorMsg);
    err.status = response.status;
    err.errors = data.errors;
    throw err;
  }

  return data;
}

export async function fetchAdminLeads({ page = 1, limit = 10, status = 'all', search = '' }, token) {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
    search,
  }).toString();

  const response = await fetch(`/api/admin/leads?${query}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.error || 'Failed to load leads.');
    err.status = response.status;
    throw err;
  }

  return data;
}

export async function updateLeadStatus(id, newStatus, token) {
  const response = await fetch(`/api/admin/leads/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.error || 'Failed to update lead status.');
    err.status = response.status;
    throw err;
  }

  return data;
}

export async function deleteLeadRecord(id, token) {
  const response = await fetch(`/api/admin/leads/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const err = new Error(data.error || 'Failed to delete lead.');
    err.status = response.status;
    throw err;
  }

  return data;
}
