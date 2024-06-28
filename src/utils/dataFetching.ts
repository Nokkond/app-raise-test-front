import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

export const getTreeData = async () => {
  const treeResponse = await axios.get(`${API_URL}/api/users/tree`);
  const usersResponse = await axios.get(`${API_URL}/api/users`);

  return {
    treeData: treeResponse.data,
    users: usersResponse.data,
  };
};

export const getServerSideProps = async () => {
  const { treeData, users } = await getTreeData();

  return {
    props: {
      initialTreeData: treeData,
      initialUsers: users,
    },
  };
};