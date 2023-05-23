import ax from "axios";

const LHOST = "http://localhost:8080/v1/gila";

export const getAllCategories = async (req) => {
  const GET_URL = `${LHOST}/categories/${req.userCode}`;
  console.log("GET_URL", GET_URL, req);
  return await ax.get(GET_URL).catch((err) => {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      const resErr = err.response.data.error;
      const code = resErr.code;
      const errMess = resErr.message;
      const message = `${code} : ${errMess}`;
      const error = { code, message };
      throw error;
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      throw err;
    }
  });
};

export const getAllMessages = async (req) => {
  const GET_URL = `${LHOST}/messages/${req.userCode}`;
  return await ax.get(GET_URL).catch((err) => {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      const resErr = err.response.data.error;
      const code = resErr.code;
      const errMess = resErr.message;
      const message = `${code} : ${errMess}`;
      const error = { code, message };
      throw error;
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      throw err;
    }
  });
};

export const postMessage = async (message) => {
  const POST_URL = `${LHOST}/message`;
  console.log("POST_URL", POST_URL, JSON.stringify(message));
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await ax
    .post(POST_URL, JSON.stringify(message), config)
    .catch((err) => {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        const resErr = err.response.data.error;
        const code = resErr.code;
        const errMess = resErr.message;
        const message = `${code} : ${errMess}`;
        const error = { code, message };
        throw error;
      } else if (err.request) {
        // client never received a response, or request never left
      } else {
        throw err;
      }
    });
};
