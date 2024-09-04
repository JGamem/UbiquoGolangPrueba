export default class HeroService {

    getHeroes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:1323/heroes');
            const data = await response.json();
            return data;
        } catch (error) {
            return console.error('Error fetching heroes:', error);
        }
    }

    addHero = async (newHero) => {
        try {
            const response = await fetch('http://127.0.0.1:1323/heroes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newHero),
            });
            return await response.json();
        } catch (error) {
            return console.error('Error adding hero:', error);
        }
    };



    updateHero = async (updatedHero) => {
        try {
            const response = await fetch(`http://127.0.0.1:1323/heroes/${updatedHero.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedHero),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return console.error('Error updating hero:', error);
        }
    };

    deleteHero = async (id) => {
        try {
            await fetch(`http://127.0.0.1:1323/heroes/${id}`, {
                method: 'DELETE',
            });
            return 'added';
        } catch (error) {
            return console.error('Error deleting hero:', error);
        }
    };

}