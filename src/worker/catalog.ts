const worker = globalThis as unknown as ServiceWorkerGlobalScope;

const cachePrefix = "zummo-catalog-";
const cacheName = `${cachePrefix}v2`;
const home = "/";
const logo = "/zumo-egresados.jpg";
const catalogAsset = /^\/(?:_next\/static\/|icons\/|favicon\.ico$|zumo-egresados\.jpg$)/;

async function cacheCatalog(response: Response) {
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
    return;
  }

  const html = await response.clone().text();
  const assets = new Set([logo]);
  for (const [, path] of html.matchAll(/(?:href|src)="(\/[^"/][^"]*)"/g)) {
    if (catalogAsset.test(new URL(path, worker.location.origin).pathname)) {
      assets.add(path);
    }
  }

  const cache = await caches.open(cacheName);
  const missingAssets = await Promise.all(
    [...assets].map(async (asset) => ((await cache.match(asset)) ? null : asset)),
  );
  await cache.addAll(missingAssets.filter((asset): asset is string => asset !== null));
  await cache.put(home, response);
}

worker.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const response = await fetch(home, { cache: "reload" });
      await cacheCatalog(response);
    })(),
  );
});

worker.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith(cachePrefix) && name !== cacheName)
          .map((name) => caches.delete(name)),
      );
      await worker.clients.claim();
    })(),
  );
});

worker.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== worker.location.origin) {
    return;
  }

  if (request.mode === "navigate" && url.pathname === home) {
    const network = fetch(request);
    const cacheUpdate = network.then((response) => cacheCatalog(response.clone()));
    event.waitUntil(cacheUpdate.catch(() => undefined));
    event.respondWith(
      network.catch(async () => {
        const cache = await caches.open(cacheName);
        return (await cache.match(home)) ?? Response.error();
      }),
    );
    return;
  }

  if (catalogAsset.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(cacheName);
        return (await cache.match(request)) ?? fetch(request);
      })(),
    );
  }
});
