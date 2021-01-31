export const getJobs = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API}/v3/jobs`, {
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

export const getJob = async (id, token) => {
  const response = await fetch(`${process.env.REACT_APP_API}/v3/jobs/${id}`, {
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

export const updateJob = async (data, token) => {
  console.log(data);
  const response = await fetch(`${process.env.REACT_APP_API}/v3/jobs`, {
    method: "PUT",
    body: JSON.stringify(data),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });
  return response;
};
