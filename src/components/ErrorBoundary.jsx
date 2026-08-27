import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Es ist ein Fehler aufgetreten</h1>
            <p className="text-gray-600 mb-4">Bitte setze die Anwendung zurück oder lade die Seite neu.</p>
            <button
              onClick={this.handleReset}
              className="w-full bg-royal-navy text-white font-medium py-2 px-4 rounded-lg hover:bg-royal-navy/90 transition-colors"
            >
              Zurücksetzen & Neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
