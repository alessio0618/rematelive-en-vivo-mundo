
# RemateLive - Live Auction Streaming Platform

RemateLive is a mobile-first live streaming platform where sellers can host live auctions and buyers can participate in real-time bidding. Think of it as a combination of live streaming, e-commerce, and auction house all in one app.

## 🚀 Features

### For Buyers
- **Live Stream Viewing**: Watch sellers showcase products in real-time
- **Real-time Bidding**: Slide-to-bid interface for seamless auction participation
- **Interactive Chat**: Engage with sellers and other viewers
- **Boost System**: Support favorite sellers with monetary boosts
- **Category Browsing**: Explore streams by product categories
- **Heart Reactions**: Show appreciation with floating heart animations

### For Sellers
- **Live Streaming**: Broadcast product showcases to engaged audiences
- **Auction Management**: Set starting bids, manage auction flow
- **Inventory Management**: Track and manage product listings
- **Schedule Shows**: Plan and announce upcoming live auctions
- **Real-time Analytics**: Monitor viewer engagement and bidding activity
- **Direct Messaging**: Communicate with potential buyers

### Platform Features
- **Mobile-First Design**: Optimized for mobile devices with touch interactions
- **Real-time Updates**: Live bidding, chat, and notifications
- **Social Features**: Follow sellers, share streams, build community
- **Secure Payments**: Integrated payment processing for transactions
- **Push Notifications**: Stay updated on followed sellers and auction results

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: CSS animations and transitions
- **Build Tool**: Vite

## 📱 Architecture

### Design System
- **Color Scheme**: Minimalist black/white with selective red accents for live indicators
- **Typography**: Clean, readable fonts optimized for mobile
- **Components**: Reusable shadcn/ui components with custom styling
- **Interactions**: Touch-optimized with swipe gestures and slide-to-bid

### Key Components
- **Live Stream Interface**: Full-screen video with overlay controls
- **Auction System**: Real-time bidding with increment logic
- **Category Navigation**: Horizontal scrolling category bar
- **Mobile Navigation**: Bottom tab bar for main sections

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rematelive
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   ├── profile/        # User profile components
│   └── notifications/  # Notification components
├── pages/              # Route components
│   └── categories/     # Category-specific pages
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── data/              # Static data and mock data
├── lib/               # Utility functions
└── styles/            # Global styles and Tailwind config
```

## 🎯 Core User Flows

### Buyer Journey
1. **Discovery**: Browse live streams by category or search
2. **Engagement**: Watch streams, chat with sellers, react with hearts
3. **Bidding**: Use slide-to-bid for auction participation
4. **Support**: Send boosts to favorite sellers
5. **Purchase**: Complete transactions for won auctions

### Seller Journey
1. **Setup**: Create profile, add products to inventory
2. **Scheduling**: Plan and announce upcoming shows
3. **Broadcasting**: Go live and showcase products
4. **Auction Management**: Start auctions, manage bids, close sales
5. **Community Building**: Engage with viewers, build following

## 🔧 Customization

### Adding New Categories
1. Add category data to `src/data/categoryData.ts`
2. Create new page in `src/pages/categories/`
3. Add route to `src/App.tsx`
4. Update navigation in `src/components/CategoryBar.tsx`

### Modifying Auction Logic
- Bid increments: `src/hooks/useBidIncrement.ts`
- Countdown timers: `src/hooks/useAuctionCountdown.ts`
- Live stream state: `src/hooks/useLiveStreamState.ts`

## 📱 Mobile Optimizations

- Touch-friendly interactions (minimum 44px touch targets)
- Swipe gestures for navigation
- Pull-to-refresh functionality
- Responsive design with mobile-first approach
- Optimized performance for mobile devices

## 🎨 Design Guidelines

### Color Usage
- **Primary**: Black (#000000) and White (#FFFFFF)
- **Accents**: Red for live indicators only
- **Interactive**: Yellow (#FFD600) for call-to-action elements
- **Grays**: Various shades for cards, borders, and muted content

### Typography
- Clean, readable fonts
- Consistent sizing scale
- High contrast for accessibility

### Interactions
- Smooth transitions and animations
- Touch-optimized controls
- Visual feedback for all interactions

## 🚀 Deployment

This project is configured for deployment on various platforms:

- **Lovable**: Direct deployment from the editor
- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop build folder or connect repository
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the development team.

---

Built with ❤️ for the live auction community
```
