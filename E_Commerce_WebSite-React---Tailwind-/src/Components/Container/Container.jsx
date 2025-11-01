import React from 'react';

const Container = ({ children }) => {
  return (
    <div className='mx-auto max-w-7xl px-4 bg-grey-300'>
      {children}
    </div>
  );
};

export default Container;
