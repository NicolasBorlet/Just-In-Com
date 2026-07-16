import React from 'react';
import Button, { ButtonWidth } from '@/components/atoms/Button';

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
    const linkHref = href || '/contact';

    return (
        <div className='flex justify-center'>
            <Button
              href={linkHref}
              isExternal={isExternal}
              width={ButtonWidth.FIT}
              ariaLabel={text}
            >
              {text}
            </Button>
        </div>
    );
};

export default LinkBlock;
