export const formatDate = (dateFormat) => {
  let date = new Date(dateFormat);

  return `
    ${date.getFullYear()}
    `;
};

export const shuffle = (array) => {
  const shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap Elements
  }
  return shuffled;
};

export const truncate = (str = "", limit) => {
  if(str.length < limit){
    return str;
  }else{
    return str.substring(0, limit) + "...";
  }
}
