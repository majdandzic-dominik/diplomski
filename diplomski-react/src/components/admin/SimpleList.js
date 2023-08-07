const SimpleList = (props) => {
  return (
    <div>
      <h1>{props.title} LIST</h1>
      <ul>
        {props.items.map((item) => (
          <li key={item.id}>
            {item.value}
            <button
              onClick={() => {
                props.onDelete(item.id);
              }}
            >
              Delete
            </button>
            <button onClick={() => props.onEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleList;
