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
