import React, {useState} from 'react';
import {Copy} from 'lucide-react';

export const HeaderLinkCopier = ({headerId}: { headerId: string }) => {
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        const currentUrl = window.location.href.split('#')[0];
        const decodedId = decodeURIComponent(headerId);
        const fullUrl = `${currentUrl}#${decodedId}`;

        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={copyLink}
            className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            title="Copy link to this section"
        >
            <Copy size={16}/>
            {copied && (
                <span className="ml-2 text-xs">Copied!</span>
            )}
        </button>
    );
};