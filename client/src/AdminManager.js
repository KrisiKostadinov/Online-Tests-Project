import axios from 'axios';

const URL = 'http://localhost:3000/api';

const login = (email, password) => {
    return fetch(`${URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
            'email': email, password,
        })
    });
}

export default { login }