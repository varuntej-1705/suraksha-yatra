import React, { Component, ErrorInfo, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Suraksha Yatra Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl glass-panel shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/50 flex items-center justify-center text-[var(--color-safe)] mx-auto text-2xl font-bold">
              🛡️
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">Suraksha Yatra</h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Tourist Safety & Incident Response System
              </p>
              <p className="text-xs text-[var(--color-critical)] bg-[var(--color-critical)]/10 p-2.5 rounded-xl border border-[var(--color-critical)]/20 font-mono text-left overflow-x-auto">
                {this.state.error?.message || 'A temporary preview loading state occurred.'}
              </p>
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 rounded-2xl bg-[var(--accent-primary)] hover:bg-[var(--color-safe)] text-[var(--bg-primary)] font-bold text-xs transition-all shadow-lg shadow-[var(--accent-primary)]/20"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
);
