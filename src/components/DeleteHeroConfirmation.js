import React from 'react';

const DeleteHeroConfirmation = ({ heroName, onDeleteHero, onCancel }) => {
    return (
        <div className="delete-confirmation">
            <p>¿Estás seguro de que quieres eliminar al héroe {heroName}?</p>
            <button onClick={onDeleteHero} className="delete-confirmation-button">Sí, eliminar</button>
            <button onClick={onCancel} className="delete-confirmation-button">Cancelar</button>
        </div>
    );
};

export default DeleteHeroConfirmation;
