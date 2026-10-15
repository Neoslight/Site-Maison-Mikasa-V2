import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * false au rendu serveur et pendant l'hydratation, true ensuite. Pour les valeurs qui
 * dépendent de l'URL (query string absente du HTML prérendu) : React ne corrige pas un
 * attribut différent à l'hydratation, il faut donc les appliquer au rendu suivant.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
