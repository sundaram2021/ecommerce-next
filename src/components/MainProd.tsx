import React, { Suspense } from 'react';
import Prod1 from './Prod1';
import Loader from './Loader';

type ProductProps = {
    name?:  string;
    cat?: string;
    pagination?: boolean;
    scrolling?: boolean;
}

function MainProd(props: ProductProps) {
  return (
    <div>
        {props.name  && <Prod1 pd={props.name} pagination={true} />}
        {props.cat  && 
          <Suspense fallback={<Loader />}>
            <Prod1 cate={props.cat} scrolling={true} />
          </Suspense>
        }
    </div>
  )
}

export default MainProd