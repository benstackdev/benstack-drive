export const createRootDirectory = async () => {
  try {
    const response = await fetch("http://localhost:8080/drive/dir/init", {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);

    return result;
  } catch (error) {
    throw error;
  }
};
