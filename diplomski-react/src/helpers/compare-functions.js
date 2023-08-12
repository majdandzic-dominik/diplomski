export const compareByNameAscending = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const compareByNameDescending = (a, b) => {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
};
export const compareByPriceAscending = (a, b) => {
  if (+a.price < +b.price) {
    return -1;
  }
  if (+a.price > +b.price) {
    return 1;
  }
  return 0;
};

export const compareByPriceDescending = (a, b) => {
  if (+a.price < +b.price) {
    return 1;
  }
  if (+a.price > +b.price) {
    return -1;
  }
  return 0;
};
export const compareByCaloriesAscending = (a, b) => {
  if (+a.calories < +b.calories) {
    return -1;
  }
  if (+a.calories > +b.calories) {
    return 1;
  }
  return 0;
};

export const compareByCaloriesDescending = (a, b) => {
  if (+a.calories < +b.calories) {
    return 1;
  }
  if (+a.calories > +b.calories) {
    return -1;
  }
  return 0;
};

export const compareByLikesAscending = (a, b) => {
  if (+a.numOfLikes < +b.numOfLikes) {
    return -1;
  }
  if (+a.numOfLikes > +b.numOfLikes) {
    return 1;
  }
  return 0;
};

export const compareByLikesDescending = (a, b) => {
  if (+a.numOfLikes < +b.numOfLikes) {
    return 1;
  }
  if (+a.numOfLikes > +b.numOfLikes) {
    return -1;
  }
  return 0;
};
export const compareByOrdersAscending = (a, b) => {
  if (+a.numOfOrders < +b.numOfOrders) {
    return -1;
  }
  if (+a.numOfOrders > +b.numOfOrders) {
    return 1;
  }
  return 0;
};

export const compareByOrdersDescending = (a, b) => {
  if (+a.numOfOrders < +b.numOfOrders) {
    return 1;
  }
  if (+a.numOfOrders > +b.numOfOrders) {
    return -1;
  }
  return 0;
};
export const compareByPopularityAscending = (a, b) => {
  const popA = +a.numOfLikes / +a.numOfOrders;
  const popB = +b.numOfLikes / +b.numOfOrders;
  if (popA < popB) {
    return -1;
  }
  if (popA > popB) {
    return 1;
  }
  return 0;
};

export const compareByPopularityDescending = (a, b) => {
  const popA = +a.numOfLikes / +a.numOfOrders;
  const popB = +b.numOfLikes / +b.numOfOrders;
  if (popA < popB) {
    return 1;
  }
  if (popA > popB) {
    return -1;
  }
  return 0;
};

//arr is what we check, target are all values that need to be inside arr
export const checkIncludedIngredients = (ingredients, ingredientsToInclude) => {
  return ingredientsToInclude.every((v) => ingredients.includes(v));
};
export const checkExcludedIngredients = (ingredients, ingredientsToExclude) => {
  return ingredientsToExclude.every((v) => !ingredients.includes(v));
};
export const checkCalorieRange = (meal, min, max) => {
  return +meal.calories >= +min && +meal.calories <= max;
};
export const checkDietPreference = (meal, options) => {
  let checks = [];

  if (options.isVegetarian) {
    if (options.isVegetarian && meal.isVegetarian) {
      checks.push(true);
    } else {
      checks.push(false);
    }
  }
  if (options.isVegan) {
    if (options.isVegan && meal.isVegan) {
      checks.push(true);
    } else {
      checks.push(false);
    }
  }
  if (options.isKosher) {
    if (options.isKosher && meal.isKosher) {
      checks.push(true);
    } else {
      checks.push(false);
    }
  }
  if (options.isLactoseFree) {
    if (options.isLactoseFree && meal.isLactoseFree) {
      checks.push(true);
    } else {
      checks.push(false);
    }
  }
  if (options.isGlutenFree) {
    if (options.isGlutenFree && meal.isGlutenFree) {
      checks.push(true);
    } else {
      checks.push(false);
    }
  }

  if (checks.length <= 0) {
    return true;
  }
  return checks.every((v) => v === true);
};