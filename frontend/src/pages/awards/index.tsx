import Index from'../../components/awards/Index'
import LayoutNew from 'components/common/LayoutNew';

export default function Awards() {
    return (
        <>
            <Index />
            </>
    );
}

Awards.getLayout = function getLayout(page) {
    return (
      <LayoutNew>
            {page}
      </LayoutNew>
    )
  }  
 