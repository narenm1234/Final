const hostname = window.location.hostname;
const getHeaders = () => {
  let headers = {};
  if (hostname.includes("dev")) {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else if (hostname.includes("local")) {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else if (hostname.includes("stage")) {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("ForgeRockToken")}`,
    };
  } else if (hostname.includes("test")) {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  return headers;
};

export default getHeaders;
