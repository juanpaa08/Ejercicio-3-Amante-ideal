import CreateProfileForm from './components/CreateProfileForm';
import SearchByInterest from './components/SearchByInterest';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>💘 Lover Finder</h1>
        <p className="app-subtitle">
          Encuentra tu pareja ideal por intereses compartidos
        </p>
      </header>

      <main className="app-main">
        <CreateProfileForm />
        <SearchByInterest />
      </main>

      <footer className="app-footer">
        <p>Lover Finder © 2026 — Hecho con ❤️</p>
      </footer>
    </div>
  );
}

export default App;
