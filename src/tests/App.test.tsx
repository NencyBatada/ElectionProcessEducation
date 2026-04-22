import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { AppProvider } from '../context';

describe('App Root Component', () => {
  it('renders the application wrapper', () => {
    // App already has AppProvider inside it
    render(<App />);
    
    // Smoke test to ensure it renders the app container without crashing
    const appContainer = document.querySelector('.app');
    expect(appContainer).toBeInTheDocument();
  });
});
