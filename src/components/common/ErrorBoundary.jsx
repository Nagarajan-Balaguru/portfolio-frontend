import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-24 flex flex-col items-center justify-center gap-4">
          <p className="text-red-400 text-2xl">⚠</p>
          <p className="text-[#8b949e] text-sm">Something went wrong loading this section.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-[#3fb950] text-sm border border-[#3fb95066] px-4 py-2 rounded hover:bg-[#3fb95011]"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}