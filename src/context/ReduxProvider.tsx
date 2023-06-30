'use client'

import React from 'react'
import { Provider } from 'react-redux';
import Store from '../reducers/Store';

function ReduxProvider({children}: {children: React.ReactNode}) {
  return (
    <Provider store={Store}>{children}</Provider>
  )
}

export default ReduxProvider