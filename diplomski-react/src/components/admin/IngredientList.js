const IngredientList = (props) => {
  return (
    <div>
      <ul>
        {props.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button
              type="button"
              onClick={() => {
                props.onDelete(ingredient, props.type);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
