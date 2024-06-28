import React from 'react';
import UserNode from './components/UserNode';

interface User {
  id: number;
  name: string;
  supervisorId: number | null;
  subordinates: User[];
}

const OrgTree: React.FC = (props: any) => {
  const {users, onNodeClick} = props;

  return (
    <div className="org-chart">
      {users && !!users.length && users.map((user: User) => (
        <>
          {/*@ts-ignore*/}
          <UserNode
            key={user.id}
            user={user}
            onNodeClick={onNodeClick}
          />
        </>
      ))}
    </div>
  );
};

export default OrgTree;