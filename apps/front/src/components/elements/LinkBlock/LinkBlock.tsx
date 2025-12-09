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
            <Link href={linkHref} className='px-5 py-3 bg-[#772D44] rounded-[30px] text-white font-special text-lg'>
                {text}
            </Link>
        </div>
    );
};

export default LinkBlock;
