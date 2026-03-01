import { useState, useEffect } from "react";
import { fetchPokemonSprite, fetchItemSprite, getDefaultItemIcon } from "@/lib/pokemon-sprites";

/**
 * Custom hook for loading Pokemon sprites with loading state
 */
export function usePokemonSprite(species: string | null) {
  const [sprite, setSprite] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPokemonSprite(species)
      .then(setSprite)
      .finally(() => setLoading(false));
  }, [species]);

  return { sprite, loading };
}

/**
 * Custom hook for loading item sprites with loading state
 */
export function useItemSprite(itemName: string | null) {
  const [sprite, setSprite] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!itemName) {
      setSprite(getDefaultItemIcon());
      return;
    }

    setLoading(true);
    fetchItemSprite(itemName)
      .then(setSprite)
      .finally(() => setLoading(false));
  }, [itemName]);

  return { sprite, loading };
}