
import React from 'react';
import CategoryPageTemplate from '@/components/CategoryPageTemplate';
import { categoryData } from '@/data/categoryData';

const Electronicos = () => {
  return <CategoryPageTemplate categoryData={categoryData.electronicos} />;
};

export default Electronicos;
