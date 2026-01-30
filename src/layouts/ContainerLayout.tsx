import React from 'react'

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-[90%] xl:w-[75%] mt-30 mx-auto'>
      {children}
    </section>
  )
}

export default ContainerLayout