import classes from './IngredientList.module.css';

const IngredientList = (props) => {
  return (
    <ul className={classes.list}>
      {props.ingredients.map((ingredient, index) => (
        <li
          key={index}
          className={`${classes.item} ${
            props.type === 'INCLUDE' ? classes.include : classes.exclude
          }`}
        >
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
  );
};

export default IngredientList;
