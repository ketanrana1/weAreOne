import React from 'react'
import Index from '../../components/logout/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Logout() {
    return (
        <>
            <Index />
        </>
    )
}

Logout.getLayout = function getLayout(page) {
    return (
        <LayoutNew>
                {page}
        </LayoutNew>
    )
  } 
