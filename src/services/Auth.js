export const login = async (data) => {
  const response = await fetch(`${process.env.REACT_APP_API}/v3/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (response.ok === true) {
    const token = response.headers.get("Vojo-Authorization");
    const loggedUser = await loggedInfo(token);

    localStorage.setItem("auth", JSON.stringify({ token, ...loggedUser.data }));
  }
  return response;
};

export const logout = () => {
  localStorage.removeItem("auth");
};

export const isLoggedIn = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};

export const getUserLoggedInfo = () => {
  return localStorage.getItem("auth");
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("auth")).token;
};

export const loggedInfo = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API}/v3/auth/me`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });

  return await response.json();
};
