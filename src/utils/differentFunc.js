export const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const findNewCurrentIdx = (state, operation) => {
  let newIdx;
  if (operation === '-') {
    newIdx = state.idx - 1;
  } else {
    newIdx = state.idx + 1;
  }

  const hasIdx = (newIdx <= state.maxIdx) && newIdx > -1;
  if (!hasIdx) {
    return state;
  }

  return {
    ...state,
    idx: newIdx,
  };
};
