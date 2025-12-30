import React, { type ReactNode } from 'react'

interface SectionMarginProps {
    children: ReactNode;
}

const SectionMargin: React.FC<SectionMarginProps> = ({ children }) => {
    return (
        <div className='py-[50px]'>
            {children}
        </div>
    )
}

export default SectionMargin
