import { Header } from "@/components/Header";
import { HeroCarousel } from "@/components/HeroCarousel";
import { DirectorInfo } from "@/components/DirectorInfo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Carousel */}
        <HeroCarousel />
        
        {/* Welcome Section */}
        <div className="text-center py-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-mono">
            Welcome to DATARENA
          </h2>
          <div className="text-lg text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>
              Your comprehensive platform for college sports data and analytics.
            </p>
            <ul className="list-disc list-inside space-y-2 text-left max-w-2xl mx-auto">
              <li>Real-time sports statistics and performance tracking</li>
              <li>Detailed match records and historical data</li>
              <li>Comprehensive player and team analytics</li>
              <li>Interactive dashboards for data visualization</li>
              <li>Admin tools for managing sports data</li>
            </ul>
          </div>
        </div>
      </main>
      
      {/* Director Info Section */}
      <div className="container mx-auto px-4 py-8">
        <DirectorInfo />
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-16">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm">
            © 2024-25 DATARENA - College Sports Data Portal. All rights reserved.
          </p>
          <div className="border-t border-primary-foreground/20 pt-4">
            <h3 className="text-lg font-semibold mb-2">Sports Incharge</h3>
            <p className="text-sm">
              <strong>Director of Sports:</strong> Dr. Sreerama<br />
              <strong>Contact:</strong> sports@vnrvjiet.in | 9440121314
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
