export const getData = async (endpoint: string) => {
  try {
    console.log("Fetching data from:", endpoint);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`Data fetching Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Received data:", data);
    return data;
  } catch (error) {
    console.error("Error while fetching data:", error);
    throw error;
  }
};
