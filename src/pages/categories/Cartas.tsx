
import React from 'react';
import CategoryPageTemplate from '@/components/CategoryPageTemplate';
import { categoryData } from '@/data/categoryData';

const Cartas = () => {
  return <CategoryPageTemplate categoryData={categoryData.cartas} />;
};

export default Cartas;
