import { useEffect } from "react";

/** "Chip26 · Elias Mäkelä" while the page is open; the plain name otherwise */
export function usePageTitle(title: string | undefined) {
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = `${title} · Elias Mäkelä`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
