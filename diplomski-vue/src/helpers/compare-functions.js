export const compareByValueAscending = (a, b) => {
  if (a.value < b.value) {
    return -1;
  }
  if (a.value > b.value) {
    return 1;
  }
  return 0;
};

export const compareByCategoryAscending = (a, b) => {
  if (a.category < b.category) {
    return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
};

export const compareByNameAscending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const compareByNameDescending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
};
export const compareByPriceAscending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.price < +b.price) {
    return -1;
  }
  if (+a.price > +b.price) {
    return 1;
  }
  return 0;
};

export const compareByPriceDescending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.price < +b.price) {
    return 1;
  }
  if (+a.price > +b.price) {
    return -1;
  }
  return 0;
};
export const compareByCaloriesAscending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.calories < +b.calories) {
    return -1;
  }
  if (+a.calories > +b.calories) {
    return 1;
  }
  return 0;
};

export const compareByCaloriesDescending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.calories < +b.calories) {
    return 1;
  }
  if (+a.calories > +b.calories) {
    return -1;
  }
  return 0;
};

export const compareByLikesAscending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.numOfLikes < +b.numOfLikes) {
    return -1;
  }
  if (+a.numOfLikes > +b.numOfLikes) {
    return 1;
  }
  return 0;
};

export const compareByLikesDescending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.numOfLikes < +b.numOfLikes) {
    return 1;
  }
  if (+a.numOfLikes > +b.numOfLikes) {
    return -1;
  }
  return 0;
};
export const compareByOrdersAscending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.numOfOrders < +b.numOfOrders) {
    return -1;
  }
  if (+a.numOfOrders > +b.numOfOrders) {
    return 1;
  }
  return 0;
};

export const compareByOrdersDescending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.numOfOrders < +b.numOfOrders) {
    return 1;
  }
  if (+a.numOfOrders > +b.numOfOrders) {
    return -1;
  }
  return 0;
};
export const compareByPopularityAscending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.numOfLikes < +b.numOfLikes) {
    return -1;
  }
  if (+a.numOfLikes > +b.numOfLikes) {
    return 1;
  }
  return 0;
};

export const compareByPopularityDescending = (a, b) => {
  let categoryComparison = compareByCategoryAscending(a, b);
  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  if (+a.numOfLikes < +b.numOfLikes) {
    return 1;
  }
  if (+a.numOfLikes > +b.numOfLikes) {
    return -1;
  }
  return 0;
};
// export const compareByPopularityAscending = (a, b) => {
//   let categoryComparison = compareByCategoryAscending(a, b);
//   if (categoryComparison !== 0) {
//     return categoryComparison;
//   }

//   const popA = +a.numOfLikes / +a.numOfOrders;
//   const popB = +b.numOfLikes / +b.numOfOrders;
//   if (popA < popB) {
//     return -1;
//   }
//   if (popA > popB) {
//     return 1;
//   }
//   return 0;
// };

// export const compareByPopularityDescending = (a, b) => {
//   let categoryComparison = compareByCategoryAscending(a, b);
//   if (categoryComparison !== 0) {
//     return categoryComparison;
//   }

//   const popA = +a.numOfLikes / +a.numOfOrders;
//   const popB = +b.numOfLikes / +b.numOfOrders;
//   if (popA < popB) {
//     return 1;
//   }
//   if (popA > popB) {
//     return -1;
//   }
//   return 0;
// };

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
