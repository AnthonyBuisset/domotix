import React, { Component, ReactNode } from "react";

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg border border-danger-200 bg-danger-50 p-6 shadow-lg dark:border-danger-800 dark:bg-danger-950">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-danger-100 dark:bg-danger-900">
            <svg
              className="size-6 text-danger-600 dark:text-danger-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-danger-700 dark:text-danger-300">
            Une erreur est survenue
          </h1>
        </div>

        <div className="mb-4 rounded-md bg-danger-100 p-3 dark:bg-danger-900">
          <p className="font-mono text-sm text-danger-800 dark:text-danger-200">
            {error?.message || "Erreur inconnue"}
          </p>
        </div>

        {error?.stack && (
          <details className="mb-4">
            <summary className="cursor-pointer text-sm text-danger-600 hover:text-danger-800 dark:text-danger-400 dark:hover:text-danger-200">
              Détails techniques
            </summary>
            <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-900 p-2 text-xs text-gray-300">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 rounded-md bg-danger-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-danger-700 dark:bg-danger-700 dark:hover:bg-danger-600"
          >
            Réessayer
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 rounded-md border border-danger-300 bg-white px-4 py-2 text-sm font-medium text-danger-700 transition-colors hover:bg-danger-50 dark:border-danger-700 dark:bg-transparent dark:text-danger-300 dark:hover:bg-danger-900"
          >
            Recharger la page
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
