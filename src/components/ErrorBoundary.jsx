import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full my-8">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Es ist ein Fehler aufgetreten</h1>
            <p className="text-gray-600 mb-4">Bitte sende den folgenden Fehlertext an den Support.</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-left">
              <p className="font-mono text-sm text-red-700 break-words whitespace-pre-wrap">
                {error && error.message ? error.message : 'Unbekannter Fehler'}
              </p>
              {error && error.stack && (
                <pre className="text-xs text-gray-500 mt-2 overflow-auto whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
              {errorInfo && errorInfo.componentStack && (
                <pre className="text-xs text-gray-500 mt-2 overflow-auto whitespace-pre-wrap">
                  {errorInfo.componentStack}
                </pre>
              )}
            </div>
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
