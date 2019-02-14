export const login = (email, password) => {
  try {
    return `
    query {
      login(email: "${email}", password: "${password}") {
        userId,
        token,
        tokenExpiration
      }
    }
  `
  } catch (err) {
    throw err;
  }
}