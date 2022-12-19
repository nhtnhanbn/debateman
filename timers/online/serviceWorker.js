const toCache = [
	"../",
	"../index.html",
	"../timers",
	"../timers.html",
	"../timers.css",
	"../timers.js",
	"../Foot 2.m4a",
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open("cache").then(cache => {
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
