import React from 'react';
import * as S from './styles';

interface ToolbarProps {
  onEdit: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onEdit }) => (
  <S.Toolbar>
    <button />
    <button onClick={onEdit}>e</button>
  </S.Toolbar>
);

export default Toolbar;
