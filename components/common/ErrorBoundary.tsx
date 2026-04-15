import React from 'react';

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Oups
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-6">
            Une erreur est survenue
          </h1>
          <p className="text-stone-600 font-light leading-relaxed mb-10">
            Quelque chose s'est mal passé lors de l'affichage de cette page. Veuillez réessayer ou
            revenir à l'accueil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center bg-sage-600 text-white px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-colors rounded-sm shadow-sm"
            >
              Retour à l'accueil
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center border border-stone-300 text-stone-700 px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:border-sage-400 hover:text-sage-600 transition-colors rounded-sm"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
