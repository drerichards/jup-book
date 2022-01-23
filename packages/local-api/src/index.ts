// send back index.html or index.js for React app
// find and send back list of cells stored in filename arg
// take list of cells and store into the file
export const serve = (port: number, filename: string, dir: string) => {
  console.log("file", filename);
  console.log("port", port);
  console.log("dir", dir);
};
