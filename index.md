---
title: DebateMan
---

![Under construction]({{ '/files/underconstruction.gif' | relative_url }})

Here is an easy-to-use set of timers for 3v3 debating. If there are broken links anywhere, please [email me](mailto:nhtnhanbn@gmail.com).

## Index

{% for page in site.pages %}
  {% if page.tool %}
- [{{ page.title }}]({{ page.url | relative_url }})
  {% endif %}
{% endfor %}