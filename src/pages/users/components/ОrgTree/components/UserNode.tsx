import React, { useEffect, useMemo, useState } from 'react';

interface UserNodeProps {
  user: any;
  onAddUser: () => void;
  onEditUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
  onNodeClick: (event: any, userId: number) => void;
}

interface User {
    id: number;
    name: string;
    supervisorId: number | null;
    subordinates: User[];
  }

const UserNode: React.FC<UserNodeProps> = ({ user, onNodeClick }) => {
    const [isParent, setIsParent] = useState<boolean>(false);
    const [childrenQuantity, setChildrenQuantity] = useState<number>(1);

    useEffect(() => {
      const lengthCounter = (subordinates: User[]) => {
        let sum = subordinates?.length || 0;
        subordinates?.forEach((el: User) => sum += lengthCounter(el.subordinates))

        return sum;
      }
      
      setIsParent(user.subordinates && user.subordinates.length > 0);
      setChildrenQuantity(lengthCounter(user.subordinates) - (user?.subordinates ? (lengthCounter(user?.subordinates?.at(-1)?.subordinates)) : 0));

    }, [user.subordinates])


  return (
    <div className={`user-node ${isParent ? 'is-parent' : ''}`} 
        style={{'--children-quantity': `${childrenQuantity * 100 - 25}px`} as React.CSSProperties }
    >
      <div className="user-node-content" onClick={(e) => onNodeClick(e, user.id)}>
        <div className="user-avatar">👤</div>
        <div className="user-name">{user.name}</div>
      </div>
      {isParent && (
        <div className="user-children">
          {user.subordinates.map((subordinate: any) => (
            <>
              {/*@ts-ignore*/}
              <UserNode
                key={subordinate.id}
                user={subordinate}
                onNodeClick={onNodeClick}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNode;