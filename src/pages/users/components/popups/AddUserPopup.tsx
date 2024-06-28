import React, { useState } from 'react';

const AddUserPopup = ({ users, onClose, onUserAdded, onSave }: any) => {
  const [name, setName] = useState('');
  const [supervisorId, setSupervisorId] = useState('');

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Добавить нового пользователя</h3>
        <form onSubmit={() => onSave(name, supervisorId)}>
          <div>
            <label>Имя: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Руководитель: </label>
            <select onChange={(e) => setSupervisorId(e.target.value)} value={supervisorId ?? ''}>
                <option value="">Без руководителя</option>
                {users.map((user: any) => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
                ))}
            </select>
          </div>
          <button type="submit">Добавить</button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPopup;
