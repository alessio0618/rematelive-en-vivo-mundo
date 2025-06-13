
import { useState } from 'react';

export interface Purchase {
  id: number;
  item: string;
  price: string;
  date: string;
  status: string;
}

export interface Sale {
  id: number;
  item: string;
  price: string;
  date: string;
  buyer: string;
}

export interface LiveStream {
  id: number;
  title: string;
  date: string;
  duration: string;
  viewers: number;
}

export interface Review {
  id: number;
  item: string;
  rating: number;
  comment: string;
  date: string;
}

export const useActivityData = () => {
  const [activeSection, setActiveSection] = useState('purchases');

  const purchases: Purchase[] = [
    {
      id: 1,
      item: 'Zapatos deportivos Nike',
      price: '$120',
      date: '2024-11-15',
      status: 'Entregado'
    },
    {
      id: 2,
      item: 'Camiseta casual',
      price: '$35',
      date: '2024-11-10',
      status: 'En camino'
    }
  ];

  const sales: Sale[] = [
    {
      id: 1,
      item: 'Reloj vintage',
      price: '$85',
      date: '2024-11-12',
      buyer: 'Usuario123'
    }
  ];

  const liveStreams: LiveStream[] = [
    {
      id: 1,
      title: 'Venta de ropa de invierno',
      date: '2024-11-14',
      duration: '45 min',
      viewers: 23
    },
    {
      id: 2,
      title: 'Subasta de electrónicos',
      date: '2024-11-08',
      duration: '1h 20min',
      viewers: 67
    }
  ];

  const reviews: Review[] = [
    {
      id: 1,
      item: 'Zapatos deportivos',
      rating: 5,
      comment: 'Excelente calidad y envío rápido',
      date: '2024-11-16'
    },
    {
      id: 2,
      item: 'Camiseta casual',
      rating: 4,
      comment: 'Buena calidad, talla correcta',
      date: '2024-11-11'
    }
  ];

  return {
    activeSection,
    setActiveSection,
    purchases,
    sales,
    liveStreams,
    reviews
  };
};
