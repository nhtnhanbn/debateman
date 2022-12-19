---
layout:
title: DebateMan Timers
tool: true
permalink: /timers/
---

<head>
<link rel="manifest" href="manifest.json">
{% seo %}
</head>

{% include_relative timers/timers.html %}

<script>
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("serviceWorker.js registered"))
      .catch(err => console.log("serviceWorker.js not registered", err))
    })
};
</script>