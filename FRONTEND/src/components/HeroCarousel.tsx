import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DirectorInfo } from "@/components/DirectorInfo";
import cricket from "@/assets/cricket.jpg";
import kabaddi from "@/assets/kabaddi.jpg";
import basketball from "@/assets/basketball.jpg";
import throwball from "@/assets/throwball.jpg";
import football from "@/assets/football.jpg";
import badminton from "@/assets/badminton.jpg";

const defaultSlides = [
  { image: cricket, title: "Cricket" },
  { image: kabaddi, title: "Kabaddi" },
  { image: basketball, title: "Basketball" },
  { image: throwball, title: "Throwball" },
  { image: football, title: "Football" },
  { image: badminton, title: "Badminton" },
];

// Fetch sports data from backend
const fetchSports = async () => {
  const response = await fetch('http://localhost:5001/api/sports');
  if (!response.ok) {
    throw new Error('Failed to fetch sports data');
  }
  return response.json();
};

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: sports, isLoading, error } = useQuery({
    queryKey: ['sports'],
    queryFn: fetchSports,
    retry: 1,
  });

  // Use backend data if available, otherwise fallback to default slides
  const sportSlides = sports ? sports.map(sport => ({
    image: sport.image || cricket, // fallback to cricket image if no image
    title: sport.name
  })) : defaultSlides;

  // Add director slide as the last slide
  const slides = [...sportSlides, { type: 'director' }];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading sports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn('Failed to fetch sports from backend, using default slides:', error);
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.type === 'director' ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center">
              <DirectorInfo />
            </div>
          ) : (
            <>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-8 left-8 text-primary-foreground">
                <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
              </div>
            </>
          )}
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-accent w-8"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
