import './ProfileCard.css';

export default function ProfileCard({ amante }) {
    return (
        <article className="profile-card">
            <div className="card-avatar">
                {amante.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="card-info">
                <h3 className="card-name">{amante.nombre}</h3>
                <span className="card-age">{amante.edad} años</span>
                <div className="card-interests">
                    {amante.intereses.map((interes, i) => (
                        <span key={i} className="interest-tag">
                            {interes}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}
