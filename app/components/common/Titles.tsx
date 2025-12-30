import React from 'react'

export const Title1 = ({children }: {children: React.ReactNode}) => {
    return (
        <div className='sm:text-[56px] title-animate avenir-next text-[32px] font-bold'>
            {children}
        </div>
    )
}

export const BigTitle = ({children }: {children: React.ReactNode}) => {
    return (
        <div className='md:text-[70px] title-animate avenir-next sm:text-[56px] text-[32px] font-bold'>
            {children}
        </div>
    )
}

export const CardHeading = ({children , className }: {children: React.ReactNode , className?: string})=>{
     return (
        <p className={`${className} md:text-4xl text-xl title-animate avenir-next font-bold`}>
            {children}
        </p>
    )
}

