"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { updateHydration } from "./services/updateHydration";

type Hydration = {
  date: string;
  mls: number;
};

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("0");
  const [hydration, setHydration] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateHydration(event: FormEvent) {
    event?.preventDefault();
    setInputValue("0");
    setIsLoading(true);

    const data = await updateHydration(Number(inputValue));
    setHydration(data);

    setIsLoading(false);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event?.target.value);
  }

  function formatDate(date: string) {
    const splited = date.split("-");

    return `${splited[2]}/${splited[1]}/${splited[0]}`;
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-4 bg-blue-400">
      <h1 className="text-2xl">Quantos ml de agua voce bebeu hj?</h1>

      <form onSubmit={handleUpdateHydration} className="flex gap-4">
        <input
          className="border py-2 px-4 bg-blue-50"
          type="number"
          min={0}
          max={100000}
          onChange={handleInputChange}
          value={inputValue}
        />

        <button
          className="bg-blue-50 py-2 px-4 w-40 flex items-center justify-center"
          type="submit"
        >
          {isLoading ? "Carregando..." : "Enviar"}
        </button>
      </form>

      <div>
        {hydration &&
          hydration.map((day: Hydration) => (
            <div className="flex gap-8" key={day.date}>
              <p>{formatDate(day.date)}</p>
              <p>{day.mls} mls</p>
            </div>
          ))}
      </div>
    </main>
  );
}
