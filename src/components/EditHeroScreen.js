import React, { useState, useEffect } from 'react';

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
    2: 'Femenino'
};

const ALIGNMENTS = {
    1: 'Bueno',
    2: 'Malo'
};

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
        if (!updatedHero.publisher) formErrors.publisher = 'La casa publicadora es requerida';
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
                weight: Number(updatedHero.weight),
                publisher: parseInt(updatedHero.publisher, 10),
                gender: parseInt(updatedHero.gender, 10),
                alignment: parseInt(updatedHero.alignment, 10)
            });
        } else {
            setErrors(formErrors);
        }
    };

    const getPublisherOptions = () => {
        return Object.entries(PUBLISHERS).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
        ));
    };

    const getGenderOptions = () => {
        return Object.entries(GENDERS).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
        ));
    };

    const getAlignmentOptions = () => {
        return Object.entries(ALIGNMENTS).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
        ));
    };

    return (
        <div className="hero-form">
            <h2 className="hero-gradient" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5em' }}>Editar Héroe</h2>
            <form onSubmit={handleSubmit}>
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
                    <select
                        className="hero-select"
                        id="publisher"
                        name="publisher"
                        value={updatedHero.publisher}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        <option value="">Seleccionar casa publicadora</option>
                        {getPublisherOptions()}
                    </select>
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
                        {getGenderOptions()}
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
                        {getAlignmentOptions()}
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
