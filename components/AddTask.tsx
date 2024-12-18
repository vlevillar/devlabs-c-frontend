'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '@/app/store';
import { createTask } from '@/lib/features/tasks/taskSlice';

interface TaskFormInputs {
  title: string;
}

const FormContainer = styled.form`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CustomInput = styled.input<{ $isError?: boolean }>`
  background-color: #1e2d3c;
  border-radius: 10px;
  color: #656f7e;
  border: ${({ $isError }) => ($isError ? '2px solid red' : 'none')};
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 15px;
  outline: none;

  &:focus {
    border: ${({ $isError }) =>
      $isError ? '2px solid red' : '2px solid #656f7e'};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  position: absolute;
  bottom: -35px;
  left: 0;
`;

const GradientText = styled.button`
  background: linear-gradient(
    90deg,
    rgba(168, 103, 151, 1) 35%,
    rgba(133, 100, 194, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ErrorContainer = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const AddTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(true);

  // Verificar si el usuario está logueado
  React.useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setIsUserLoggedIn(false); // Si no está logueado, mostrar el error
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormInputs>();

  const onSubmit: SubmitHandler<TaskFormInputs> = (data: TaskFormInputs) => {
    if (!isUserLoggedIn) {
      return; // No enviar el formulario si el usuario no está logueado
    }

    dispatch(
      createTask({
        title: data.title,
        userId: localStorage.getItem('userId') || '',
      }),
    );
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <CustomInput
          $isError={!!errors.title}
          placeholder="What do you have planned?"
          {...register('title', {
            required: 'Task title is required',
            maxLength: {
              value: 100,
              message: 'Task title cannot exceed 100 characters',
            },
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </InputContainer>
      {isUserLoggedIn ? (
        <GradientText type="submit">Add Task</GradientText>
      ) : (
        <ErrorContainer>Please log in to add tasks</ErrorContainer>
      )}
    </FormContainer>
  );
};

export default AddTask;
