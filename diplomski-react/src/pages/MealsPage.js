import { useState } from 'react';
import MealNewForm from '../components/admin/MealNewForm';

const MealsPage = () => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [error, setError] = useState(null);

  //add item
  const addHandler = async (value) => {
    setError(null);
    try {
      const response = await fetch(apiURL + 'meals.json', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not save data!');
      }

      // fetchHandler();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <MealNewForm onSubmit={addHandler} />
    </div>
  );
};

export default MealsPage;
