import axios from "axios";

export async function updateHydration(hydration: Number) {
  await axios.post("https://hydration-control-api.onrender.com/hydration", {
    mls: hydration,
  });

  const response = await axios.get(
    "https://hydration-control-api.onrender.com/hydration"
  );

  return response.data;
}
