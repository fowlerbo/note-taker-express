function findByID(id, array) {
  const result = array.filter((note) => {
    return note.id === id;
  })[0];
  return result;
}
