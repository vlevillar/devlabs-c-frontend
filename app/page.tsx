'use client';
import AddTask from '@/components/AddTask';
import styled from 'styled-components';
import LoginButton from '@/components/LoginButton';
import TaskList from '@/views/TaskList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  margin-left: 40vh;
  margin-right: 40vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  color: #6e7887;
  font-size: 32px;
`;

const SubTitle = styled.p`
  color: #6e7887;
  font-size: 22px;
  margin-bottom: 10px;
`;

export default function IndexPage() {
  return (
    <Container>
      <Header>
        <Title>Task List 2024</Title>
        <LoginButton />
      </Header>
      <AddTask />
      <SubTitle>Tasks</SubTitle>
      <TaskList />
    </Container>
  );
}
