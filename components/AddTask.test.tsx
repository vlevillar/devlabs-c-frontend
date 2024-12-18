import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '@/components/AddTask';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

describe('AddTask Component', () => {
  const renderWithProviders = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('should render input and button', () => {
    renderWithProviders(<AddTask />);
    expect(screen.getByPlaceholderText('What do you have planned?')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('should display validation error if input is empty and form is submitted', async () => {
    renderWithProviders(<AddTask />);
    const submitButton = screen.getByText('Add Task');
    fireEvent.click(submitButton);
    expect(await screen.findByText('Task title is required')).toBeInTheDocument();
  });

  it('should dispatch action with valid input', async () => {
    renderWithProviders(<AddTask />);
    const input = screen.getByPlaceholderText('What do you have planned?');
    const submitButton = screen.getByText('Add Task');
  
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
  
    await screen.findByPlaceholderText('What do you have planned?');
    expect(input).toHaveValue('');
  });
  
});
