import { useState } from 'react';
import { searchByInteres } from '../services/api';
import ProfileCard from './ProfileCard';
import './SearchByInterest.css';

export default function SearchByInterest() {
    const [interes, setInteres] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!interes.trim()) return;

        setError(null);
        setLoading(true);
        setSearched(true);

        try {
            const data = await searchByInteres(interes.trim());
            setResults(data);
        } catch (err) {
            setError(err.message);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="search-section">
            <h2>🔍 Buscar por Interés</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Ej: música, viajes, cocina..."
                    value={interes}
                    onChange={(e) => setInteres(e.target.value)}
                    className="search-input"
                />
                <button type="submit" disabled={loading} className="btn-search">
                    {loading ? 'Buscando...' : 'Buscar'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}

            {searched && !error && (
                <div className="results-area">
                    {results.length === 0 ? (
                        <p className="no-results">No se encontraron perfiles con ese interés.</p>
                    ) : (
                        <>
                            <p className="results-count">
                                {results.length} perfil{results.length !== 1 ? 'es' : ''} encontrado{results.length !== 1 ? 's' : ''}
                            </p>
                            <div className="results-grid">
                                {results.map((amante) => (
                                    <ProfileCard key={amante._id} amante={amante} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </section>
    );
}
