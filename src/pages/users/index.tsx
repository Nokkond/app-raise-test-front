import { useState } from 'react';
import axios from 'axios';
import OrgTree from './components/ОrgTree';
import ContextMenu from './components/ContextMenu';
import EditSupervisorPopup from './components/popups/EditSupervisorPopup';
import AddUserPopup from './components/popups/AddUserPopup';
import { getServerSideProps } from '@/utils/dataFetching';

interface User {
  id: number;
  name: string;
  supervisorId: number | null;
}

const UsersPage: React.FC = ({ initialTreeData, initialUsers }: any) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tree, setTree] = useState<any>(initialTreeData);
  const [contextMenu, setContextMenu] = useState<any>(null);
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [editPopup, setEditPopup] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const fetchTree = async () => {
    const response = await axios.get('/api/users/tree');
    setTree(response.data);
  };

  const createUser = async (name: string, supervisorId: number) => {
    await axios.post('/api/users', { name, supervisorId });
    fetchUsers();
    fetchTree();
  };

  const handleNodeClick = (event: any, user: number) => {
    event.preventDefault();
    setSelectedUser(user);
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleEditSupervisor = () => {
    setEditPopup(true);
    setContextMenu(null);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete('/api/users', { data: { id: selectedUser } });
      fetchUsers()
      fetchTree();
    } catch (error) {
      console.error('Error deleting user', error);
    }
    setContextMenu(null);
  };

  const handleSaveSupervisor = async (supervisorId: number) => {
    try {
      await axios.put(`/api/users`, { id: selectedUser, supervisorId });
      fetchUsers()
      fetchTree();
    } catch (error) {
      console.error('Error updating supervisor', error);
    }
    setEditPopup(null);
  };

  return (
    <div>
      <h1>Организационная структура</h1>
      <button className="add-user-button" onClick={() => {setAddUserPopup(true); setContextMenu(false)}}>Добавить пользователя</button>
      {/*@ts-ignore*/}
      <OrgTree users={tree} onNodeClick={handleNodeClick}/>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onEdit={handleEditSupervisor}
          onDelete={handleDeleteUser}
        />
      )}
      {editPopup && selectedUser && (
        <EditSupervisorPopup
          user={selectedUser}
          users={users}
          onClose={() => setEditPopup(null)}
          onSave={handleSaveSupervisor}
        />
      )}
      {addUserPopup && (
        <AddUserPopup
          users={users}
          onClose={() => setAddUserPopup(false)}
          onUserAdded={createUser}
          onSave={createUser}
        />
      )}
    </div>
  );
};

export { getServerSideProps };
export default UsersPage;