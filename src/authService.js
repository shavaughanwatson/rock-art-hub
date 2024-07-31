import axios from 'axios';
import { API_KEY } from './util';

const API_URL = 'http://localhost:1337/api/auth'; // Update with your backend URL

const authService = {
  login: async (identifier, password) => {
    const response = await axios.post(`${API_URL}/local`, {
      identifier,
      password,
    });
    console.log(response.data.jwt);
    const token = response.data.jwt;
    localStorage.setItem('token', token);

    console.log(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    return response.data.user;
  },

  signup: async (
    username,
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    occupation,
    avatar,
    bio
  ) => {
    const response = await axios.post(`${API_URL}/local/register`, {
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      occupation,
      avatar,
      bio,
    });

    console.log(response.data.jwt);
    const token = response.data.jwt;
    localStorage.setItem('token', token);

    console.log(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  },

  edit: async (userId, firstName, lastName, occupation, bio) => {
    const response = await axios.put(
      `http://localhost:1337/api/users/${userId}`,
      {
        firstName,
        lastName,
        occupation,
        bio,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data;
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default authService;
