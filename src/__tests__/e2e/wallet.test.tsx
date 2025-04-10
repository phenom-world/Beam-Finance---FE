import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Dashboard from '../../pages/wallet';

vi.mock('../../hooks/api/wallet', () => ({
  useGetUserWallet: () => ({
    data: { data: { balance: 1000 } },
  }),
  useGetTransactions: () => ({
    data: {
      data: {
        items: [],
        meta: {
          totalPages: 1,
        },
      },
    },
    isLoading: false,
  }),
}));

describe('Wallet Page E2E Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  });

  it('should render wallet page with all components', () => {
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(screen.getByText('Actual Balance')).toBeInTheDocument();
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    const walletContainer = screen.getByText('Wallet').closest('div');
    expect(walletContainer).toHaveClass('flex flex-col h-full px-4 md:px-0');

    const contentContainer = screen.getByText('Wallet').closest('div');
    expect(contentContainer).toHaveClass('flex flex-col h-full px-4 md:px-0');
  });
});
