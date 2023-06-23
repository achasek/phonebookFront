const base = "https://api.modrinth.com/v2/project/";

// slug is a parameter containing a string of the particular mod to search
const getDownloads = (slug) => {
    fetch(`${base}${slug}`)
      .then((response) => response.json())
      .then((data) => console.log(data.downloads));
};

// axios version
// const getDownloads = (slug) => {
//   const request = axios.get(`${test}${slug}`)
//   request.then((response) => response.data)
// }

const exports = {
    getDownloads
};
  
  export default exports;