import { useRef } from 'react';

const SimpleEditForm = (props) => {
  const txtFieldValue = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const txtObject = {
      value: txtFieldValue.current.value,
    };

    props.onSubmit(props.id, txtObject);

    txtFieldValue.current.value = '';
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor={props.inputName}>{props.inputName} name:</label>
          <input
            onChange={props.onChange}
            type="text"
            id={props.inputName}
            ref={txtFieldValue}
            value={props.value}
            required
          />
        </div>
        <button>Save</button>
      </form>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  );
};

export default SimpleEditForm;
