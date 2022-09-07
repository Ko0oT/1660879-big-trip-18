const createDatalistOptionTemplate = (destinations, destination) => {
  const firstTemplate = `<option value="${ destination.name }" selected>${ destination.name }</option>`;
  const secondTemplate = destinations
    .filter((it) => it.name !== destination.name)
    .reduce((prev, cur) => prev.concat(`<option value="${ cur.name }">${ cur.name }</option>`), '');
  const finalTemplate = firstTemplate + secondTemplate;
  return finalTemplate;
};

export { createDatalistOptionTemplate };
