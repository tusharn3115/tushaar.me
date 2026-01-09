import React, { useEffect, useState } from 'react';
import { getOrCreateVisitorId } from '../../lib/fingerprint';

export function VisitorCount({ className }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function trackAndFetchStats() {
            try {
                const fingerprint = getOrCreateVisitorId();

                // Note: This expects an API route at /api/visitors to exist on your server
                await fetch('/api/visitors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fingerprint }),
                    cache: 'no-store'
                });

                const response = await fetch('/api/visitors', {
                    method: 'GET',
                    cache: 'no-store'
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        uniqueVisitors: data.uniqueVisitors || 0
                    });
                }
            } catch (error) {
                console.error('Failed to fetch visitor stats:', error);
            } finally {
                setLoading(false);
            }
        }

        trackAndFetchStats();
    }, []);

    if (loading) {
        return <div className={className}>Loading...</div>;
    }

    if (!stats) {
        return <div className={className}>—</div>;
    }

    return (
        <div className={className}>
            <span className="font-medium">{stats.uniqueVisitors.toLocaleString()}</span> visitors
        </div>
    );
}
