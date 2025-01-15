import { LRUCache } from "lru-cache";


type CacheEntry = {
    firstSeen: Date;
    lastSeen: Date;
    count: number;
}

const options = {
  max: 1024,
}

const cache = new LRUCache<string, CacheEntry>(options);


function trackUsage(url:string) {
    const entry = cache.get(url) || {
        firstSeen: new Date(),
        lastSeen: new Date(),
        count: 0,
    };
    entry.lastSeen = new Date();
    entry.count++;
    cache.set(url, entry);
    console.log('cached', url);
    console.log('cache', cache.dump());
}

function getUsage() {
    return cache.dump();
}

export {
    getUsage,
    trackUsage,
}
