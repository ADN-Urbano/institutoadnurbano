"use client";

import { useState } from "react";

/** Paginación visual del archivo. La paginación real llega en Fase 2. */
export default function Pagination() {
  const [page, setPage] = useState(1);
  const items: (number | string)[] = ["←", 1, 2, 3, 4, "…", 39, "→"];

  return (
    <div className="flex justify-center gap-1 mb-16">
      {items.map((it, i) => {
        const isPage = typeof it === "number";
        const active = isPage && it === page;
        return (
          <button
            key={i}
            onClick={() => isPage && setPage(it)}
            className={`min-w-[42px] h-[42px] px-3 rounded-lg font-mono text-[13px] border transition-all ${
              active
                ? "bg-turquoise text-white border-turquoise"
                : "bg-white text-ink-soft border-rule hover:border-turquoise hover:text-turquoise"
            }`}
          >
            {it}
          </button>
        );
      })}
    </div>
  );
}
