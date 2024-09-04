import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import CreateHeroScreen from './components/CreateHeroScreen';
import EditHeroScreen from './components/EditHeroScreen';
import DeleteHeroConfirmation from './components/DeleteHeroConfirmation';
import HeroService from './services/Heroes';

function App() {
  const [showCreateScreen, setShowCreateScreen] = useState(false);
  const [showEditScreen, setShowEditScreen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [heroes, setHeroes] = useState([]);
  const [editingHero, setEditingHero] = useState(null);
  const [heroToDelete, setHeroToDelete] = useState(null);
  const heroService = new HeroService();

  useEffect(() => {
    (async () => {
      const _heroes = await heroService.getHeroes();
      setHeroes(_heroes);
    })();
  }, []);

  const addHero = async (newHero) => {
    const data = await heroService.addHero(newHero);
    setHeroes([...heroes, data]);
    setShowCreateScreen(false);
  };

  const updateHero = async (updatedHero) => {
    const data = await heroService.updateHero(updatedHero);
    setHeroes(heroes.map(hero => hero.id === data.id ? data : hero));
    setShowEditScreen(false);
  };

  const deleteHero = async () => {
    if (heroToDelete) {
      await heroService.deleteHero(heroToDelete.id);
      setHeroes(heroes.filter(hero => hero.id !== heroToDelete.id));
      setHeroToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div className="App container">
      <h1 className="hero-gradient" style={{ fontSize: '4em', textAlign: 'center', marginBottom: '30px' }}>
        Super Hero Dashboard
      </h1>
      {showCreateScreen ? (
        <CreateHeroScreen onCreateHero={addHero} onCancel={() => setShowCreateScreen(false)} />
      ) : showEditScreen ? (
        <EditHeroScreen hero={editingHero} onUpdateHero={updateHero} onCancel={() => setShowEditScreen(false)} />
      ) : showDeleteConfirmation ? (
        heroToDelete ? (
          <DeleteHeroConfirmation
            heroName={heroToDelete.name}
            onDeleteHero={deleteHero}
            onCancel={() => setShowDeleteConfirmation(false)}
          />
        ) : null
      ) : (
        <Dashboard
          heroes={heroes}
          onCreateNew={() => setShowCreateScreen(true)}
          onDeleteHero={(hero) => {
            setHeroToDelete(hero);
            setShowDeleteConfirmation(true);
          }}
          onEditHero={(hero) => {
            setEditingHero(hero);
            setShowEditScreen(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
