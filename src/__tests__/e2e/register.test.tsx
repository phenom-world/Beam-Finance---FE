import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import RegisterForm from '../../pages/register';

const mockHandleRegister = vi.fn();
vi.mock('../../hooks/api/auth', () => ({
  useRegister: () => ({
    handleRegister: mockHandleRegister,
  }),
}));

describe('Register Page E2E Tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  });

  it('should render register form with all required fields', () => {
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('should show validation errors for empty form submission', async () => {
    const registerButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('should successfully submit form with valid data', async () => {
    const fullNameInput = screen.getByLabelText('Full name');
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const checkbox = screen.getByTestId('tocAgreed');
    const registerButton = screen.getByTestId('register-button');

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(checkbox);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        tocAgreed: true,
      });
    });
  });

  it('should show login link and navigate to login page', () => {
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });
});
