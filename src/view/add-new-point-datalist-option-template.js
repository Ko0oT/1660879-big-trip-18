const createDatalistOptionTemplate = (destinations) => {
  let template = '';
  for (let i = 0; i < destinations.length; i++) {
    template += `<option value="${ destinations[i].name }"></option>`;
  }
  return template;
};

export { createDatalistOptionTemplate };
