const toCache = [
	"timer.html",
	"timer.css",
	"timer.js",
	"Foot 2.m4a",
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open("assets").then(cache => {
			cache.addAll(toCache)
		})
	)
});

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
});
