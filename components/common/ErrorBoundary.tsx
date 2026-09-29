import React from 'react';
import Button from '../ui/Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen items-center bg-canvas px-6">
        <div className="mx-auto w-full max-w-3xl">
          <p className="eyebrow mb-5">Oups</p>
          <h1 className="type-display">Une erreur est survenue</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
            Quelque chose s'est mal passé lors de l'affichage de cette page. Veuillez réessayer ou
            revenir à l'accueil.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/" onClick={this.handleReset}>
              Retour à l'accueil
            </Button>
            <Button href="/contact" variant="secondary">
              Me contacter
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
