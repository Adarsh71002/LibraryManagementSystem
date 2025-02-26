// API helper functions to interact with the backend endpoints.
// Ensure that your Vite dev server proxies "/api" to your backend.
export async function signInAPI(email) {
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Sign in failed');
    }
    return await response.json();
  }
  
  export async function createLibraryAPI(data) {
    const response = await fetch('/api/library/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Library creation failed');
    }
    return await response.json();
  }
  
  export async function createReaderAPI(data) {
    const response = await fetch('/api/reader/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Reader creation failed');
    }
    return await response.json();
  }
  
  export async function onboardAdminAPI(data) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch('/api/owner/admin/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Onboard admin failed');
    }
    return await response.json();
  }
  
  export async function addBookAPI(data) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch('/api/admin/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Add book failed');
    }
    return await response.json();
  }
  
  export async function removeBookAPI(isbn, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/api/admin/books/${isbn}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Remove book failed');
    }
    return await response.json();
  }
  
  export async function updateBookAPI(isbn, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/api/admin/books/${isbn}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Update book failed');
    }
    return await response.json();
  }
  
  export async function getIssueRequestsAPI() {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/api/admin/requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch issue requests');
    }
    return await response.json();
  }
  
  export async function approveIssueRequestAPI(reqid) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/api/admin/requests/${reqid}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Approve failed');
    }
    return await response.json();
  }
  
  export async function rejectIssueRequestAPI(reqid) {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/api/admin/requests/${reqid}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': user.email,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Reject failed');
    }
    return await response.json();
  }