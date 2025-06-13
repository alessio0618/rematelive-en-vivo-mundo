
import React from 'react';
import CategoryPageTemplate from '@/components/CategoryPageTemplate';
import { categoryData } from '@/data/categoryData';

const Coleccionables = () => {
  return <CategoryPageTemplate categoryData={categoryData.coleccionables} />;
};

export default Coleccionables;
