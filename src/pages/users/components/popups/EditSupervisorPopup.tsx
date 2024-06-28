import React, { useState } from 'react';

const EditSupervisorPopup = ({ user, users, onClose, onSave }: any) => {
  const [supervisorId, setSupervisorId] = useState(user.supervisor ? user.supervisor.id : null);

  const handleSave = () => {
    onSave(supervisorId);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Изменить руководителя</h3>
        <select value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)}>
          {/*@ts-ignore*/}
          <option value={null}>Нет руководителя</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default EditSupervisorPopup;