import { useEffect, useRef, useState } from 'react';

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
    <div>
      <button onClick={props.onCancel}>Cancel</button>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor={props.type}>{props.inputName} name:</label>
          <input
            type="text"
            id={props.type}
            ref={txtFieldValue}
            defaultValue={props.item ? item.value : ''}
            required
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default SimpleEditForm;
