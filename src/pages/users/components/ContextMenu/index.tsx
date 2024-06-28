import React from 'react';

const ContextMenu = ({ x, y, onClose, onEdit, onDelete }: any) => {
  return (
    <ul className="context-menu" style={{ top: y, left: x }}>
      <li onClick={onEdit}>Изменить руководителя</li>
      <li onClick={onDelete}>Удалить</li>
      <li onClick={onClose}>Закрыть</li>
    </ul>
  );
};

export default ContextMenu;