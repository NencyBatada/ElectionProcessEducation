/* ============================================
   Tests — context.tsx (State Management)
   ============================================ */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context';
import type { ReactNode } from 'react';

// Helper wrapper component
const wrapper = ({ children }: { children: ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

// Test component to expose context values
function ContextReader() {
  const { state, setName, setVoterStatus } = useApp();
  return (
    <div>
      <span data-testid="name">{state.user.name}</span>
      <span data-testid="status">{state.user.voterStatus}</span>
      <span data-testid="view">{state.currentView}</span>
      <button onClick={() => setName('Priya')} data-testid="set-name">Set Name</button>
      <button onClick={() => setVoterStatus('registered')} data-testid="set-status">Set Status</button>
    </div>
  );
}

describe('AppProvider State Management', () => {
  it('renders without crashing', () => {
    render(<AppProvider><div>test</div></AppProvider>);
  });

  it('provides default user state', () => {
    render(<ContextReader />, { wrapper: AppProvider });
    expect(screen.getByTestId('name').textContent).toBe('');
    expect(screen.getByTestId('status').textContent).toBe('not-registered');
  });

  it('provides a default currentView', () => {
    render(<ContextReader />, { wrapper: AppProvider });
    const view = screen.getByTestId('view').textContent;
    expect(['landing', 'dashboard']).toContain(view);
  });

  it('updates name via setName', async () => {
    render(<ContextReader />, { wrapper: AppProvider });
    const btn = screen.getByTestId('set-name');
    await act(async () => btn.click());
    expect(screen.getByTestId('name').textContent).toBe('Priya');
  });

  it('updates voterStatus via setVoterStatus', async () => {
    render(<ContextReader />, { wrapper: AppProvider });
    const btn = screen.getByTestId('set-status');
    await act(async () => btn.click());
    expect(screen.getByTestId('status').textContent).toBe('registered');
  });

  it('throws error when useApp is used outside AppProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ContextReader />)).toThrow('useApp must be used within an AppProvider');
    consoleSpy.mockRestore();
  });
});
