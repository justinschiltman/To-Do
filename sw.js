/* To-Do service worker.
   Stale-while-revalidate: the app opens instantly from cache and works with no
   network at all; a new version is fetched in the background and picked up the
   next time the app is launched. */

const CACHE = "todo-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg",
  "./icons/favicon-32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      // Not addAll: one 404 would reject the whole install and leave the app
      // without a worker.
      .then(cache => Promise.all(ASSETS.map(url =>
        cache.add(new Request(url, { cache: "reload" })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // A navigation always resolves to the app shell, so a deep link or a
  // refresh never lands on a 404 while offline.
  const isNav = req.mode === "navigate";

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = isNav ? "./index.html" : req;
    const cached = await cache.match(key, { ignoreSearch: isNav });

    const network = fetch(req).then(res => {
      if (res && res.ok && res.type === "basic") cache.put(key, res.clone());
      return res;
    }).catch(() => null);

    // Cached copy wins on speed; the network refreshes it for next launch.
    if (cached) { event.waitUntil(network); return cached; }

    const res = await network;
    if (res) return res;
    if (isNav) {
      const shell = await cache.match("./index.html", { ignoreSearch: true });
      if (shell) return shell;
    }
    return new Response("Offline", { status: 503, statusText: "Offline" });
  })());
});
