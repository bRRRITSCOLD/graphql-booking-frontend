export const post = async (url, options) => {
  try {
    if (!options.body) throw new Error('please provide a body with a post request');

    const postResponse = await fetch(url, {
      ...options,
      method: 'POST'
    });

    return postResponse;
  } catch (err) {
    throw err;
  }
};
