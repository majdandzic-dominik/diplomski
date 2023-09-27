import { useEffect, useRef, useState } from 'react';

import classes from './SimpleForm.module.css';

const SimpleEditForm = (props) => {
  const txtFieldValue = useRef();

  const [item, setItem] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();

    const item = {
      ...(props.method === 'PATCH' && { id: props.item.id }),
      value: txtFieldValue.current.value,
    };

    props.onSubmit(item, props.type, props.method);
  };

  useEffect(() => {
    if (props.item) {
      setItem(props.item);
      console.log(props.item);
      console.log(item);
    }
  }, [props.item, item]);

  return (
    <div className={classes.container}>
      <h3>{props.method === 'POST' ? 'Add' : 'Edit'}</h3>

      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor={props.type}>{props.inputName} name: </label>
        <input
          type="text"
          id={props.type}
          ref={txtFieldValue}
          defaultValue={props.item ? item.value : ''}
          required
        />
        <div className={classes.actions}>
          <button className={classes['btn-save']} type="submit">
            Save
          </button>
          <button
            className={classes['btn-cancel']}
            type="button"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleEditForm;
