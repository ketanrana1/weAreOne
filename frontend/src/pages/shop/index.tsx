import React from 'react'
import Index from '../../components/shop/Index'
import LayoutNew from 'components/common/LayoutNew'

export default function Shop() {
    return (
        <Index />
    )
}

Shop.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  } 
