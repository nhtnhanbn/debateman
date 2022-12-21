const toCache = [
	"./",
	"index.html",
	"timers.css",
	"timers.js",
	"Foot 2.m4a",
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open("cache").then(cache => {
			cache.addAll(toCache)
		})
	)
});

self.addEventListener("fetch", fetchEvent => {
	if (fetchEvent.request.headers.get("range")) {
		const pos = Number(/^bytes\=(\d+)\-$/g.exec(fetchEvent.request.headers.get("range"))[1]);
		console.log("Range request for", fetchEvent.request.url, ", starting position:", pos);
		fetchEvent.respondWith(
			caches.open("cache").then(cache => {
				return cache.match(fetchEvent.request.url);
			}).then(res => {
				if (!res) {
					return fetch(fetchEvent.request).then(res => {
						return res.arrayBuffer();
					});
				} else return res.arrayBuffer();
			}).then(ab => {
				return new Response(
					ab.slice(pos),
					{
						status: 206,
						statusText: "Partial Content",
						headers: [
							["Content-Range",
							"bytes " + pos + "-" + (ab.byteLength - 1) + "/" + ab.byteLength]
						]
					});
			}));
	} else {
		fetchEvent.respondWith(
			caches.match(fetchEvent.request).then(res => {
				return res || fetch(fetchEvent.request)
			})
		)
	}
});
