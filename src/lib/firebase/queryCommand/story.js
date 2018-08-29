const ROOT_NAME = 'Storys/'

export const queryByCategory = (database, categoryId) => {
  const ref = database
    .ref(ROOT_NAME)
    .orderByChild(`categorys/${categoryId}`)
    .equalTo(true)
  return ref
}
