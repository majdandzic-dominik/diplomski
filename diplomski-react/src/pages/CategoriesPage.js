import { useCallback, useEffect, useState } from 'react';
import SimpleNewForm from '../components/admin/SimpleNewForm';
import SimpleEditForm from '../components/admin/SimpleEditForm';
import SimpleList from '../components/admin/SimpleList';

const CategoriesPage = () => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editFormId, setEditFormId] = useState('');
  const [editFormValue, setEditFormValue] = useState('');

  const toggleAddFormVisible = () => {
    setAddFormVisible((prevState) => !prevState);
  };

  const showEditForm = () => {
    setEditFormVisible(true);
  };

  const hideEditForm = () => {
    setEditFormVisible(false);
  };

  //get list

  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch(apiURL + 'categories.json');

      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }
      const data = await response.json();

      const loadedCategories = [];

      for (const key in data) {
        loadedCategories.push({
          id: key,
          value: data[key].value,
        });
      }
      setCategories(loadedCategories);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  //add item
  const addHandler = async (value) => {
    setError(null);
    try {
      const response = await fetch(apiURL + 'categories.json', {
        method: 'POST',
        body: JSON.stringify(value),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not save data!');
      }

      fetchHandler();
    } catch (error) {
      setError(error.message);
    }
  };

  //delete item
  const deleteHandler = async (id) => {
    var result = window.confirm('Want to delete?');
    if (result) {
      setError(null);

      try {
        const response = await fetch(apiURL + 'categories/' + id + '.json', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not delete data!');
        }

        fetchHandler();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  //edit item
  const editHandler = async (id, newValue) => {
    setError(null);
    try {
      const response = await fetch(apiURL + 'categories/' + id + '.json', {
        method: 'PATCH',
        body: JSON.stringify(newValue),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Could not delete data!');
      }

      fetchHandler();
    } catch (error) {
      setError(error.message);
    }
  };

  const setUpEditForm = (id, value) => {
    setEditFormId(id);
    setEditFormValue(value);
    showEditForm();
  };

  return (
    <div>
      <h1>Categories page</h1>
      {error && <p>{error}</p>}
      <button onClick={toggleAddFormVisible}>
        {addFormVisible ? 'Cancel' : 'Add'}
      </button>

      {addFormVisible && (
        <SimpleNewForm onSubmit={addHandler} inputName={'Category'} />
      )}

      {editFormVisible && (
        <SimpleEditForm
          onSubmit={editHandler}
          onCancel={hideEditForm}
          onChange={(event) => {
            setEditFormValue(event.target.value);
          }}
          inputName={'Category'}
          id={editFormId}
          value={editFormValue}
        />
      )}

      <SimpleList
        title={'CATEGORIES'}
        items={categories}
        onDelete={deleteHandler}
        onEdit={setUpEditForm}
      />
    </div>
  );
};

export default CategoriesPage;
