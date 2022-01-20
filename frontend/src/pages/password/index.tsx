import React from 'react'
import Index from '../../components/password/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Password() {
    return (
        <>
            <Index />
        </>
    )
}

Password.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
