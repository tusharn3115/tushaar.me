export function getOrCreateVisitorId() {
    if (typeof window === 'undefined') return null;

    const STORAGE_KEY = 'visitor_id';
    let visitorId = localStorage.getItem(STORAGE_KEY);

    if (!visitorId) {
        visitorId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem(STORAGE_KEY, visitorId);
    }

    return visitorId;
}
