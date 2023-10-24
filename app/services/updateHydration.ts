import axios from "axios";

export async function updateHydration(hydration: Number) {
  await axios.post("http://localhost:3333/hydration", {
    mls: hydration,
  });

  const response = await axios.get("http://localhost:3333/hydration");

  return response.data;
}
