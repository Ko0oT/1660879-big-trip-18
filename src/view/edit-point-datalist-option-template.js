const createDatalistOptionTemplate = (destinations) => {
  const template = destinations.reduce((prev, cur) => prev.concat(`<option value="${ cur.name }"></option>`), '');
  return template;
};

export { createDatalistOptionTemplate };
