
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Video, Star } from 'lucide-react';
import { Purchase, Sale, LiveStream, Review } from '@/hooks/useActivityData';

interface ActivitySectionsProps {
  activeSection: string;
  purchases: Purchase[];
  sales: Sale[];
  liveStreams: LiveStream[];
  reviews: Review[];
}

const ActivitySections: React.FC<ActivitySectionsProps> = ({
  activeSection,
  purchases,
  sales,
  liveStreams,
  reviews
}) => {
  const renderPurchases = () => (
    <div className="space-y-3">
      {purchases.map((purchase) => (
        <Card key={purchase.id} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-foreground font-medium text-sm">{purchase.item}</h3>
                  <p className="text-muted-foreground text-xs">{purchase.date}</p>
                  <p className="text-foreground font-semibold text-sm">{purchase.price}</p>
                </div>
              </div>
              <Badge 
                variant={purchase.status === 'Entregado' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {purchase.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSales = () => (
    <div className="space-y-3">
      {sales.map((sale) => (
        <Card key={sale.id} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground font-medium text-sm">{sale.item}</h3>
                <p className="text-muted-foreground text-xs">Vendido a {sale.buyer}</p>
                <p className="text-muted-foreground text-xs">{sale.date}</p>
                <p className="text-foreground font-semibold text-sm">{sale.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStreams = () => (
    <div className="space-y-3">
      {liveStreams.map((stream) => (
        <Card key={stream.id} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground font-medium text-sm">{stream.title}</h3>
                <p className="text-muted-foreground text-xs">{stream.date}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-muted-foreground text-xs">⏱️ {stream.duration}</span>
                  <span className="text-muted-foreground text-xs">👥 {stream.viewers} viewers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-3">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground font-medium text-sm">{review.item}</h3>
                <div className="flex items-center space-x-1 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.rating ? 'rating-star-filled' : 'rating-star-empty'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-xs">{review.comment}</p>
                <p className="text-muted-foreground text-xs">{review.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  switch (activeSection) {
    case 'purchases':
      return renderPurchases();
    case 'sales':
      return renderSales();
    case 'streams':
      return renderStreams();
    case 'reviews':
      return renderReviews();
    default:
      return null;
  }
};

export default ActivitySections;
