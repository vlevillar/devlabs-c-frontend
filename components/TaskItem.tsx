'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { deleteTask, updateTask } from '@/lib/features/tasks/taskSlice';

interface TaskItemProps {
  title: string;
  id: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
  background-color: #0a142d;
  border-radius: 20px;
  color: #ccccde;
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  padding: 15px;
`;

const Divider = styled.div`
  display: flex;
  gap: 15px;
  margin-right: 15px;
`;

const GradientText = styled.p`
  background: linear-gradient(
    90deg,
    rgba(168, 103, 151, 1) 35%,
    rgba(133, 100, 194, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  cursor: pointer;
`;

const DeleteText = styled.p`
  color: red;
  font-weight: bold;
  cursor: pointer;
`;

const Title = styled.p`
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
`;

const EditableInput = styled.input`
  margin-left: 15px;
  background-color: #0a142d;
  color: #ccccde;
  border: none;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  border-bottom: 2px solid #ccccde;
  width: 80%;
`;

const TaskItem = ({ title, id }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (newTitle.trim() === '') {
      alert('Title cannot be empty.');
      return;
    }

    dispatch(
      updateTask({
        id,
        title: newTitle,
        userId: localStorage.getItem('userId') || '',
      }),
    );
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <Container key={id}>
      {isEditing ? (
        <EditableInput
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleUpdate} // Confirmar al perder el foco
        />
      ) : (
        <Title>{title}</Title>
      )}
      <Divider>
        <GradientText onClick={handleEdit}>EDIT</GradientText>
        <DeleteText onClick={handleDelete}>DELETE</DeleteText>
      </Divider>
    </Container>
  );
};

export default TaskItem;
