class LocalStorageCache {
    constructor(prefix) {
        this.prefix = prefix || 'stock_metadata_';
    }

    setItem(key, value, expiration) {
        const item = {
            value,
            expires: expiration ? Date.now() + expiration : null,
        };
        localStorage.setItem(this.prefix + key, JSON.stringify(item));
    }

    getItem(key) {
        const itemString = localStorage.getItem(this.prefix + key);
        if (!itemString) return null;

        const item = JSON.parse(itemString);
        if (item.expires && Date.now() > item.expires) {
            this.removeItem(key);
            return null;
        }

        return item.value;
    }

    removeItem(key) {
        localStorage.removeItem(this.prefix + key);
    }

    clear() {
        localStorage.clear();
    }
}

export default LocalStorageCache;