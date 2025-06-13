
import React from 'react';
import CategoryPageTemplate from '@/components/CategoryPageTemplate';
import { categoryData } from '@/data/categoryData';

const Sneakers = () => {
  return <CategoryPageTemplate categoryData={categoryData.sneakers} />;
};

export default Sneakers;
