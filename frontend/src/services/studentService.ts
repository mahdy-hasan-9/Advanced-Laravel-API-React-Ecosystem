const API_BASE = 'http://127.0.0.1:8000/api';

export const isAuthenticated = () => {
    return localStorage.getItem('token');
}

export const getClassList = async () => {
     const token = isAuthenticated();
     const res = await fetch(`${API_BASE}/student/class`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    const resp = await res.json();
    return resp ; 
}


export const getActivityList = async () => {
     const token = isAuthenticated();
     const res = await fetch(`${API_BASE}/student/activity`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    const resp = await res.json();
    return resp ; 
}


export const getBooksList = async () => {
     const token = isAuthenticated();
     const res = await fetch(`${API_BASE}/student/books`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    });
    const resp = await res.json();
    return resp ; 
}