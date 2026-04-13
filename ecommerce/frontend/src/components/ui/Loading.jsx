import './Loading.css';

function Loading() {
  return (
    <div className="loading-container" role="status" aria-live="polite" aria-busy="true">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loading;
