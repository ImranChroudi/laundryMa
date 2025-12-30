import React from 'react'

const SectionWrapper: React.FC<{ children: React.ReactNode , className?: string }> = ({children , className}) => {
    return (
        <section className={`${className} w-full section-animate mx-auto px-4 sm:px-15 xl:px-30 lg:px-15`}>
            {children}
        </section>
    )
}

export default SectionWrapper
