import axios from 'axios';
import { API_KEY } from './util';

const API_URL = 'http://localhost:1337/api/auth'; // Update with your backend URL

const authService = {
  login: async (identifier, password) => {
    const response = await axios.post(`${API_URL}/local`, {
      identifier,
      password,
    });
    console.log(response.data);
    const token = response.data.token;

    localStorage.setItem('token', token);

    return response.data;
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
    console.log(response.data);
    return response.data;
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
};

export default authService;
