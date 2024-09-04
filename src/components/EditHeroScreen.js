import React, { useState, useEffect } from 'react';

const EditHeroScreen = ({ hero, onUpdateHero, onCancel }) => {
    const [updatedHero, setUpdatedHero] = useState({ ...hero });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setUpdatedHero({ ...hero });
    }, [hero]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedHero(prevHero => ({
            ...prevHero,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!updatedHero.name.trim()) formErrors.name = 'El nombre es requerido';
        if (!updatedHero.publisher.trim()) formErrors.publisher = 'La casa publicadora es requerida';
        if (!updatedHero.race.trim()) formErrors.race = 'La raza es requerida';
        if (!updatedHero.gender) formErrors.gender = 'El género es requerido';
        if (!updatedHero.height) formErrors.height = 'La altura es requerida';
        else if (isNaN(updatedHero.height) || Number(updatedHero.height) <= 0) formErrors.height = 'La altura debe ser un número positivo';
        if (!updatedHero.weight) formErrors.weight = 'El peso es requerido';
        else if (isNaN(updatedHero.weight) || Number(updatedHero.weight) <= 0) formErrors.weight = 'El peso debe ser un número positivo';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onUpdateHero({
                ...updatedHero,
                height: Number(updatedHero.height),
                weight: Number(updatedHero.weight)
            });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="hero-form">
            <h2 className="hero-gradient" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5em' }}>Editar Héroe</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields here */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Nombre:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="name"
                        name="name"
                        value={updatedHero.name}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.name && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.name}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="publisher" style={{ display: 'block', marginBottom: '8px' }}>Casa publicadora:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="publisher"
                        name="publisher"
                        value={updatedHero.publisher}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.publisher && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.publisher}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="race" style={{ display: 'block', marginBottom: '8px' }}>Raza:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="race"
                        name="race"
                        value={updatedHero.race}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.race && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.race}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="gender" style={{ display: 'block', marginBottom: '8px' }}>Género:</label>
                    <select
                        className="hero-select"
                        id="gender"
                        name="gender"
                        value={updatedHero.gender}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        <option value="">Seleccionar género</option>
                        <option value="Male">Masculino</option>
                        <option value="Female">Femenino</option>
                    </select>
                    {errors.gender && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.gender}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="alignment" style={{ display: 'block', marginBottom: '8px' }}>Bando:</label>
                    <select
                        className="hero-select"
                        id="alignment"
                        name="alignment"
                        value={updatedHero.alignment}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        <option value="">Seleccionar bando</option>
                        <option value="good">Bueno</option>
                        <option value="bad">Malo</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="height" style={{ display: 'block', marginBottom: '8px' }}>Altura (cm):</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="height"
                        name="height"
                        value={updatedHero.height}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.height && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.height}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="weight" style={{ display: 'block', marginBottom: '8px' }}>Peso (kg):</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="weight"
                        name="weight"
                        value={updatedHero.weight}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.weight && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.weight}</span>}
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button type="submit" className="hero-button" style={{ marginRight: '15px' }}>Actualizar</button>
                    <button type="button" className="hero-button hero-button-cancel" onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditHeroScreen;
