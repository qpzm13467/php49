function getQueryParams(d){var c=d.search.substr(1),e=c.split("&"),a=e.length,g={};for(var b=0;b<a;b++){var f=e[b].split("=");g[f[0]]=decodeURIComponent(f[1])}return g};