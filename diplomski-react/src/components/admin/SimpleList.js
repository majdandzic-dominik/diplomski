import classes from './SimpleList.module.css';

const SimpleList = (props) => {
  return (
    <ul className={classes.list}>
      {props.items.map((item) => (
        <li key={item.id}>
          <p>{item.value}</p>
          <div className={classes.actions}>
            <button
              className={classes['btn-edit']}
              onClick={() => props.onEdit(item)}
            >
              Edit
            </button>
            <button
              className={classes['btn-delete']}
              onClick={() => {
                props.onDelete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SimpleList;
