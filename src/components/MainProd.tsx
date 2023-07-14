import React, { Suspense } from 'react';
import Prod1 from './Prod1';
import Loader from './Loader';

type ProductProps = {
    name?:  string;
    cat?: string;
}

function MainProd(props: ProductProps) {
  return (
    <div>
        {props.name  && <Prod1 pd={props.name} />}
        {props.cat  && 
          <Suspense fallback={<Loader />}>
            <Prod1 cate={props.cat} />
          </Suspense>
        }
    </div>
  )
}

export default MainProd