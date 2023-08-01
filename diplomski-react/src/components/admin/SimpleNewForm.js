import { useRef } from 'react';

const SimpleNewForm = (props) => {
  const txtFieldValue = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const txtObject = {
      value: txtFieldValue.current.value,
    };

    props.onSubmit(txtObject);

    txtFieldValue.current.value = '';
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor={props.inputName}>{props.inputName} name:</label>
        <input type="text" id={props.inputName} ref={txtFieldValue} required />
      </div>
      <button>Save</button>
    </form>
  );
};

export default SimpleNewForm;
