import React, { useState } from 'react';
import HeroList from './HeroList';
import EditHeroScreen from './EditHeroScreen';

function Dashboard({ heroes, onCreateNew, onDeleteHero, onEditHero }) {
    const [filters, setFilters] = useState({ publisher: '', race: '', gender: '', alignment: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [showEditScreen, setShowEditScreen] = useState(false);
    const [editingHero, setEditingHero] = useState(null);

    const filteredHeroes = heroes.filter(hero => 
        hero && 
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.publisher === '' || hero.publisher === filters.publisher) &&
        (filters.race === '' || hero.race === filters.race) &&
        (filters.gender === '' || hero.gender === filters.gender) &&
        (filters.alignment === '' || hero.alignment === filters.alignment)
    );

    return (
        <div>
            {showEditScreen ? (
                <EditHeroScreen 
                    hero={editingHero} 
                    onUpdateHero={(updatedHero) => {
                        onEditHero(updatedHero);
                        setShowEditScreen(false);
                    }} 
                    onCancel={() => setShowEditScreen(false)} 
                />
            ) : (
                <>
                    <div style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                        <input
                            className="hero-input"
                            type="text"
                            placeholder="Buscar héroe"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flexGrow: 1, minWidth: '200px' }}
                        />
                        <select
                            className="hero-select"
                            value={filters.publisher}
                            onChange={(e) => setFilters({ ...filters, publisher: e.target.value })}
                        >
                            <option value="">Todas las casas</option>
                            <option value="DC">DC</option>
                            <option value="Marvel">Marvel</option>
                        </select>
                        <select
                            className="hero-select"
                            value={filters.race}
                            onChange={(e) => setFilters({ ...filters, race: e.target.value })}
                        >
                            <option value="">Todas las razas</option>
                            <option value="Human">Humano</option>
                            <option value="Kryptonian">Kryptoniano</option>
                            <option value="Amazon">Amazona</option>
                        </select>
                        <select
                            className="hero-select"
                            value={filters.gender}
                            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                        >
                            <option value="">Todos los géneros</option>
                            <option value="1">Masculino</option>
                            <option value="2">Femenino</option>
                        </select>
                        <select
                            className="hero-select"
                            value={filters.alignment}
                            onChange={(e) => setFilters({ ...filters, alignment: e.target.value })}
                        >
                            <option value="">Todos los bandos</option>
                            <option value="1">Bueno</option>
                            <option value="2">Malo</option>
                        </select>
                    </div>
                    <button 
                        onClick={onCreateNew} 
                        className="hero-button" 
                        style={{ display: 'block', margin: '0 auto 30px' }}
                    >
                        Crear Nuevo Héroe
                    </button>
                    <HeroList
                        heroes={filteredHeroes}
                        onDeleteHero={onDeleteHero}
                        onEditHero={(hero) => {
                            setEditingHero(hero);
                            setShowEditScreen(true);
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default Dashboard;
