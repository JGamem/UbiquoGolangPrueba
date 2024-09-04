import React from 'react';
import './HeroList.css'; 

const PUBLISHERS = {
    1: 'ABC Studios',
    2: 'Dark Horse Comics',
    3: 'DC Comics',
    4: 'George Lucas',
    5: 'HarperCollins',
    6: 'Icon Comics',
    7: 'IDW Publishing',
    8: 'Image Comics',
    9: 'J. K. Rowling',
    10: 'J. R. R. Tolkien',
    11: 'Marvel Comics',
    12: 'Microsoft',
    13: 'NBC - Heroes',
    14: 'Rebellion',
    15: 'Shueisha',
    16: 'Sony Pictures',
    17: 'South Park',
    18: 'Star Trek',
    19: 'SyFy',
    20: 'Team Epic TV',
    21: 'Titan Books',
    22: 'Wildstorm',
    23: 'Universal Studios',
    24: 'N/A'
};

const GENDERS = {
    1: 'Masculino',
    2: 'Femenino',
};

const ALIGNMENTS = {
    1: 'Bueno',
    2: 'Malo',
    3: 'Neutral'
};

const HeroList = ({ heroes, onDeleteHero, onEditHero }) => {
    return (
        <div className="hero-list">
            {heroes.length === 0 ? (
                <p>No hay héroes disponibles.</p>
            ) : (
                heroes.map(hero => (
                    <div key={hero._id} className="hero-card">
                        <h3>{hero.name}</h3>
                        <p><strong>Color de ojos:</strong> {hero.eye_color}</p>
                        <p><strong>Color de cabello:</strong> {hero.hair_color}</p>
                        <p><strong>Color de piel:</strong> {hero.skin_color}</p>
                        <p><strong>Altura:</strong> {hero.height}</p>
                        <p><strong>Peso:</strong> {hero.weight}</p>
                        <p><strong>Raza:</strong> {hero.race}</p>
                        <p><strong>Publicadora:</strong> {PUBLISHERS[hero.publisher_id] || 'Desconocido'}</p>
                        <p><strong>Género:</strong> {GENDERS[hero.gender_id] || 'Desconocido'}</p>
                        <p><strong>Bando:</strong> {ALIGNMENTS[hero.alignment_id] || 'Desconocido'}</p>
                        <button onClick={() => onEditHero(hero)} className="hero-button">Editar</button>
                        <button onClick={() => onDeleteHero(hero)} className="hero-button hero-button-delete">Eliminar</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default HeroList;
