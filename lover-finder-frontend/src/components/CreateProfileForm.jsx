import { useState } from 'react';
import { createAmante } from '../services/api';
import './CreateProfileForm.css';

export default function CreateProfileForm() {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [intereses, setIntereses] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);

        try {
            const data = {
                nombre: nombre.trim(),
                edad: parseInt(edad, 10),
                intereses: intereses
                    .split(',')
                    .map((i) => i.trim())
                    .filter((i) => i !== ''),
            };

            const created = await createAmante(data);
            setMessage(`✅ Perfil creado: ${created.nombre}`);
            setNombre('');
            setEdad('');
            setIntereses('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="form-section">
            <h2>💘 Crear Perfil</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Ej: Ana Torres"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="edad">Edad</label>
                    <input
                        id="edad"
                        type="number"
                        placeholder="Ej: 25"
                        min="18"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="intereses">Intereses (separados por coma)</label>
                    <input
                        id="intereses"
                        type="text"
                        placeholder="Ej: música, viajes, cocina"
                        value={intereses}
                        onChange={(e) => setIntereses(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className="btn-submit">
                    {loading ? 'Creando...' : 'Crear Perfil'}
                </button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </section>
    );
}
