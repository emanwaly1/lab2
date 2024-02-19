self.addEventListener("install", (event) => { 
  console.log("service worker installed");
 
  event.waitUntil(
    caches
      .open("myown-apps")
      .then((cache) => {
        return cache.addAll([
          "index.html",
          "styles/index.css",
          "js/main.js",
          "other.html",
          "styles/other.css",
          "js/other.js",
        ]);
      })
      .catch((err) => console.log(err))
  );
});

self.addEventListener("activate", () => {
  console.log("Inside activate phase");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((file) => {
        if (file) {
          console.log("founded in cache");
          return file;
        }
        console.log(event.request.url);
        return fetch(event.request.url);
      })
      .catch((err) => console.log(err))
  );
});
