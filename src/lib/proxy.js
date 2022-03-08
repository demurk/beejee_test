const proxy = (url) => {
  if (window.location.origin === "http://localhost:3000") {
    return "http://127.0.0.1:8000" + url;
  } else {
    return window.location.origin + url; // production address
  }
};

export default proxy;
