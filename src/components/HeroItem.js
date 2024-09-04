import React from 'react';

const HeroItem = ({ hero, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{hero.name}</td>
            <td>{hero.publisher}</td>
            <td>{hero.gender}</td>
            <td>{hero.race}</td>
            <td>{hero.height}</td>
            <td>{hero.weight}</td>
            <td>{hero.eye_color}</td>
            <td>{hero.hair_color}</td>
            <td>{hero.skin_color}</td>
            <td>
                <button onClick={() => onEdit(hero)} className="hero-button">Editar</button>
                <button onClick={() => onDelete(hero._id)} className="hero-button hero-button-delete">Eliminar</button>
            </td>
        </tr>
    );
};

export default HeroItem;
