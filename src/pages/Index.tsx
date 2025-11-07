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
        
        {/* Director Info */}
        <DirectorInfo />
        
        {/* Welcome Section */}
        <div className="text-center py-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome to DATARENA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your central hub for comprehensive college sports statistics, achievements, and records. 
            Select a sport from the menu above to explore detailed match data and performance history.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto mt-8">
            {[
              { number: "6", label: "Sports" },
              { number: "100+", label: "Matches" },
              { number: "50+", label: "Trophies" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 DATARENA - College Sports Data Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
