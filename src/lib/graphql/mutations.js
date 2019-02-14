export const createUser = (email, password) => {
  try {
    return `
      mutation {
        createUser(input: { email: "${email}", password: "${password}" }) {
          _id,
          email,
          password,
          createdEvents {
            _id
          },
          bookedEvents {
            _id
          }
        }
      }
    `;
  } catch (err) {
    throw err;
  }
}