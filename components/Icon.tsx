import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
    const icons: Record<string, React.ReactNode> = {
        dashboard: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h-1.5m1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m1-1.5l1 1.5m0 0l.5 1.5m-1.5-2.25l1.5 2.25m6-7.5l-1.5-1.5m1.5 1.5l-1.5 1.5m1.5-1.5l1.5 1.5m-1.5-1.5l1.5-1.5M6 6.75h.008v.008H6V6.75zm.75 0h.008v.008H6.75V6.75zm.75 0h.008v.008H7.5V6.75zm.75 0h.008v.008H8.25V6.75zm.75 0h.008v.008H9V6.75zm.75 0h.008v.008H9.75V6.75zm.75 0h.008v.008H10.5V6.75zm.75 0h.008v.008H11.25V6.75zm.75 0h.008v.008H12V6.75zm.75 0h.008v.008H12.75V6.75zm.75 0h.008v.008H13.5V6.75zm.75 0h.008v.008H14.25V6.75z" />,
        quiz: <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />,
        check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
        xmark: <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
        chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
        ai: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L12 5.25l2.846.813a4.5 4.5 0 013.09 3.09L21.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM12 12V2.25" />,
        menu: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />,
        close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
        search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
        documentText: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`icon ${className}`}>
            {icons[name]}
        </svg>
    );
};