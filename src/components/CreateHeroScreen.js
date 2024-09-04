import React, { useState } from 'react';

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

const CreateHeroScreen = ({ onCreateHero, onCancel }) => {
    const [hero, setHero] = useState({
        name: '',
        publisher: '',
        race: '',
        gender: '',
        alignment: '',
        height: '',
        weight: '',
        eye_color: '',
        hair_color: '',
        skin_color: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHero(prevHero => ({
            ...prevHero,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!hero.name.trim()) formErrors.name = 'El nombre es requerido';
        if (!hero.publisher) formErrors.publisher = 'La casa publicadora es requerida';
        if (!hero.race.trim()) formErrors.race = 'La raza es requerida';
        if (!hero.gender) formErrors.gender = 'El género es requerido';
        if (!hero.height) formErrors.height = 'La altura es requerida';
        else if (isNaN(hero.height) || Number(hero.height) <= 0) formErrors.height = 'La altura debe ser un número positivo';
        if (!hero.weight) formErrors.weight = 'El peso es requerido';
        else if (isNaN(hero.weight) || Number(hero.weight) <= 0) formErrors.weight = 'El peso debe ser un número positivo';
        if (!hero.eye_color.trim()) formErrors.eye_color = 'El color de ojos es requerido';
        if (!hero.hair_color.trim()) formErrors.hair_color = 'El color de cabello es requerido';
        if (!hero.skin_color.trim()) formErrors.skin_color = 'El color de piel es requerido';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onCreateHero({
                ...hero,
                height: Number(hero.height),
                weight: Number(hero.weight),
                publisher: parseInt(hero.publisher, 10),
                gender: parseInt(hero.gender, 10),
                alignment: parseInt(hero.alignment, 10)
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
            <h2 className="hero-gradient" style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5em' }}>Crear Nuevo Héroe</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Nombre:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="name"
                        name="name"
                        value={hero.name}
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
                        value={hero.publisher}
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
                        value={hero.race}
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
                        value={hero.gender}
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
                        value={hero.alignment}
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
                        value={hero.height}
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
                        value={hero.weight}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.weight && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.weight}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="eye_color" style={{ display: 'block', marginBottom: '8px' }}>Color de ojos:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="eye_color"
                        name="eye_color"
                        value={hero.eye_color}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.eye_color && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.eye_color}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="hair_color" style={{ display: 'block', marginBottom: '8px' }}>Color de cabello:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="hair_color"
                        name="hair_color"
                        value={hero.hair_color}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.hair_color && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.hair_color}</span>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="skin_color" style={{ display: 'block', marginBottom: '8px' }}>Color de piel:</label>
                    <input
                        className="hero-input"
                        type="text"
                        id="skin_color"
                        name="skin_color"
                        value={hero.skin_color}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    />
                    {errors.skin_color && <span style={{ color: '#ff4500', fontSize: '0.9em' }}>{errors.skin_color}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                    <button type="submit" className="hero-button" style={{ backgroundColor: '#00FF00', color: '#fff' }}>Crear Héroe</button>
                    <button type="button" className="hero-button" style={{ backgroundColor: '#FF0000', color: '#fff' }} onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CreateHeroScreen;
