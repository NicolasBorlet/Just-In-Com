import React from 'react';
import Link from 'next/link';

interface LinkBlockProps {
    block: {
        id: number;
        text: string;
        href: string | null;
        isExternal: boolean;
    };
}

const LinkBlock: React.FC<LinkBlockProps> = ({ block }) => {
    const { text, href, isExternal } = block;

    // If no href is provided, use a default contact link
    const linkHref = href || '/contact';

    if (isExternal) {
        return (
            <div>
                <a
                    href={linkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {text}
                </a>
            </div>
        );
    }

    return (
        <div className='flex justify-center'>
            <Link
                href={linkHref}
                className='inline-flex items-center justify-center border-2 border-[#A33E5E] bg-[#A33E5E] px-8 py-3 rounded-full text-white font-sans font-semibold tracking-wide text-lg transition-all duration-300 ease-out hover:bg-white hover:text-[#A33E5E] hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A33E5E] focus-visible:ring-offset-2'
            >
                {text}
            </Link>
        </div>
    );
};

export default LinkBlock;
