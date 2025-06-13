
import React from 'react';
import CategoryPageTemplate from '@/components/CategoryPageTemplate';
import { categoryData } from '@/data/categoryData';

const Juguetes = () => {
  return <CategoryPageTemplate categoryData={categoryData.juguetes} />;
};

export default Juguetes;
