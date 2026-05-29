// Service worker "kill-switch".
// ADN Local no usa service worker. Este archivo existe solo para neutralizar
// cualquier SW antiguo que hubiera quedado registrado en este origen (p. ej.
// de otro proyecto previo en localhost:3000). Se desregistra, borra sus cachés
// y recarga las pestañas abiertas para limpiar HTML cacheado obsoleto que
// provocaba errores de hidratación.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch {}
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      for (const client of clients) {
        try {
          client.navigate(client.url);
        } catch {}
      }
    })(),
  );
});
