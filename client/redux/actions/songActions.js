// actions/songActions.js
export const setSongs = (songs) => {
  return {
    type: 'SET_SONGS',
    payload: { songs }, // Wrap songs in an object
  };
};
