import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sports = [
  { value: "cricket", label: "Cricket" },
  { value: "kabaddi", label: "Kabaddi" },
  { value: "basketball", label: "Basketball" },
  { value: "throwball", label: "Throwball" },
  { value: "football", label: "Football" },
  { value: "badminton", label: "Badminton" },
];

export const Header = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<string>("");

  const handleSportChange = (value: string) => {
    setSelectedSport(value);
    navigate(`/sport/${value}`);
  };

  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/en/e/e5/Official_logo_of_VNRVJIET.png" alt="VNRVJIET Logo" className="h-14 w-14 object-contain" />
          </div>

          {/* Center: DATARENA Title + Sport Selector */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight font-mono">
              DATARENA
            </h1>
            <Select value={selectedSport} onValueChange={handleSportChange}>
              <SelectTrigger className="w-[180px] bg-primary text-primary-foreground border-primary hover:bg-primary/90 transition-colors">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                {sports.map((sport) => (
                  <SelectItem
                    key={sport.value}
                    value={sport.value}
                    className="hover:bg-secondary cursor-pointer"
                  >
                    {sport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right: Admin Login */}
          <Button
            onClick={() => navigate("/admin")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-sm transition-all hover:shadow-md"
          >
            Admin Login
          </Button>
        </div>
      </div>
    </header>
  );
};
