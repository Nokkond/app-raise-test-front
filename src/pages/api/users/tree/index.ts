import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

const handleGetTree = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(`${API_URL}/users/tree`);
    console.log(`${API_URL}/users/tree`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Failed to fetch tree:', error);
    res.status(500).json({ error: 'Failed to fetch tree' });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return handleGetTree(req, res);
};
