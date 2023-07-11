import React from 'react';
import Prod1 from './Prod1';

type ProductProps = {
    name?:  string;
    cat?: string;
}

function MainProd(props: ProductProps) {
  return (
    <div>
        {props.name  && <Prod1 pd={props.name} />}
        {props.cat  && <Prod1 pd={props.cat} />}
    </div>
  )
}

export default MainProd