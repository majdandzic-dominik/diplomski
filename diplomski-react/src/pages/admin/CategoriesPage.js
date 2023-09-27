import { useCallback, useEffect, useState } from 'react';
import SimpleForm from '../../components/admin/SimpleForm';
import SimpleList from '../../components/admin/SimpleList';

import classes from './CategoriesPage.module.css';
import { compareByValueAscending } from '../../helpers/compare-functions';

const CategoriesPage = () => {
  const apiURL =
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app/';

  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [category, setCategory] = useState();

  const showAddForm = () => {
    setError(null);
    setAddFormVisible(true);
    setEditFormVisible(false);
  };

  const hideAddForm = () => {
    setError(null);
    setAddFormVisible(false);
  };

  const showEditForm = () => {
    setError(null);
    setEditFormVisible(true);
    setAddFormVisible(false);
  };

  const hideEditForm = () => {
    setError(null);
    setEditFormVisible(false);
  };

  //get list

  const fetchHandler = useCallback(async () => {
    setError(null);
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
      loadedCategories.sort(compareByValueAscending);
      setCategories(loadedCategories);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  //add item
  const addHandler = async (item, type, method) => {
    setError(null);
    if (categories.some((e) => e.value === item.value)) {
      setError('Category already exists');
    } else {
      let url = apiURL + type + '.json';
      if (method === 'PATCH') {
        url = apiURL + type + '/' + item.id + '.json';
      }
      try {
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(item),
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not save data!');
        }

        fetchHandler();
        if (method === 'POST') {
          hideAddForm();
        }
        if (method === 'PATCH') {
          hideEditForm();
        }
      } catch (error) {
        setError(error.message);
      }
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
        hideEditForm();
        hideAddForm();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const setUpEditForm = (item) => {
    setCategory(item);
    showEditForm();
  };

  return (
    <div className={classes.container}>
      <h2>Categories</h2>
      {error && <p className={classes.error}>{error}</p>}
      {!addFormVisible && (
        <button onClick={showAddForm} className={classes['btn-add']}>
          + Add
        </button>
      )}

      {addFormVisible && (
        <SimpleForm
          method={'POST'}
          onSubmit={addHandler}
          onCancel={hideAddForm}
          inputName={'Category'}
          type="categories"
        />
      )}

      {editFormVisible && (
        <SimpleForm
          method={'PATCH'}
          onSubmit={addHandler}
          onCancel={hideEditForm}
          inputName={'Category'}
          type="categories"
          item={category}
        />
      )}

      {categories ? (
        <SimpleList
          items={categories}
          onDelete={deleteHandler}
          onEdit={setUpEditForm}
        />
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
};

export default CategoriesPage;
