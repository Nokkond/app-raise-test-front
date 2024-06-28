import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

const handleGetUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.post(`${API_URL}/users`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const handleUpdateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, ...data } = req.body;
    const response = await axios.put(`${API_URL}/users/${id}`, data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const handleDeleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;
    await axios.delete(`${API_URL}/users/${id}`);
    res.status(204).end();
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetUsers(req, res);
    case 'POST':
      return handleCreateUser(req, res);
    case 'PUT':
      return handleUpdateUser(req, res);
    case 'DELETE':
      return handleDeleteUser(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
