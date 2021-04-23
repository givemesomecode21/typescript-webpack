
const examplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Example');
  }, 300);
});

const apiExampleRequest = async () => {
  return await examplePromise;
};


export default {
  apiExampleRequest
};
