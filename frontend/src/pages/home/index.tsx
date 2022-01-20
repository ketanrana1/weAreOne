import React from 'react';
import Index from '../../components/home/Index';
import LayoutNew from 'components/common/LayoutNew';


export default function Home() {
    return (
        <>

            <Index />

        </>
    )
}

Home.getLayout = function getLayout(page: any) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  }
