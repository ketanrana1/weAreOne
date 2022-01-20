import React from 'react'
import Index from '../../components/checkoutold/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Checkout () {
    return (
        <>
            <Index />
        </>
    )
}

Checkout.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 