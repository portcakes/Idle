import React, { createContext, useState } from "react";
import { Resource } from "../types/game";

interface GameStateContextType {
  resources: { [key: string]: Resource };
  updateResources: (newResources: { [key: string]: Resource }) => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined
);

export { GameStateContext };

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resources, setResources] = useState<{ [key: string]: Resource }>({});

  const updateResources = (newResources: { [key: string]: Resource }) => {
    setResources(newResources);
  };

  return (
    <GameStateContext.Provider value={{ resources, updateResources }}>
      {children}
    </GameStateContext.Provider>
  );
};
