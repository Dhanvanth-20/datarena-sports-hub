import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Users, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Fetch sport data from backend
const fetchSportData = async (sport: string) => {
  const response = await fetch(`http://localhost:5001/api/sports`);
  if (!response.ok) {
    throw new Error('Failed to fetch sports data');
  }
  const sports = await response.json();
  return sports.find((s: any) => s.name.toLowerCase() === sport);
};

// Fetch matches data from backend
const fetchMatches = async (sport: string, year: string) => {
  const response = await fetch(`http://localhost:5001/api/matches/${sport}?year=${year}`);
  if (!response.ok) {
    throw new Error('Failed to fetch matches data');
  }
  return response.json();
};

// Mock coach and captain data - will be moved to backend later (keeping for fallback)
const mockCoachCaptainData: Record<string, any> = {
  cricket: {
    coach: "Mr. Suresh Raina",
    captain: "Virat Sharma",
  },
  kabaddi: {
    coach: "Mr. Anup Kumar",
    captain: "Rahul Chaudhary",
  },
  basketball: {
    coach: "Mr. Michael Johnson",
    captain: "Arjun Singh",
  },
  throwball: {
    coach: "Ms. Priya Sharma",
    captain: "Neha Patel",
  },
  football: {
    coach: "Mr. Carlos Rodriguez",
    captain: "Sunil Chhetri Jr.",
  },
  badminton: {
    coach: "Ms. Saina Nehwal",
    captain: "Lakshya Sen",
  },
};

export default function SportDetails() {
  const { sport } = useParams<{ sport: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedYear, setSelectedYear] = useState("2024-25");

  // Fetch sport data from backend
  const { data: sportData, isLoading: sportLoading } = useQuery({
    queryKey: ['sport', sport],
    queryFn: () => fetchSportData(sport!),
    enabled: !!sport,
  });

  // Fetch matches data
  const { data: matches = [], isLoading: matchesLoading, error } = useQuery({
    queryKey: ['matches', sport, selectedYear],
    queryFn: () => fetchMatches(sport!, selectedYear),
    enabled: !!sport,
  });

  if (sportLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading sport details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!sportData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive">Sport not found</h2>
            <Button onClick={() => navigate("/")} className="mt-4">
              Go Back Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sportName = sport!.charAt(0).toUpperCase() + sport!.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Sport Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            {sportName}
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto rounded-full" />
        </div>

        {/* Coach and Captain Info */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-gradient-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Coach</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{sportData.coach || 'Not assigned'}</p>
          </div>

          <div className="bg-gradient-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Captain</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{sportData.captain || 'Not assigned'}</p>
          </div>

          <div className="bg-gradient-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-6 w-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-foreground">Academic Year</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{sportData.academicYears?.join(', ') || '2024-25'}</p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="flex justify-center">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[200px] bg-primary text-primary-foreground">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {(sportData.academicYears || ["2024-25"]).map((year: string) => (
                <SelectItem key={year} value={year} className="hover:bg-secondary cursor-pointer">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Matches Table */}
        <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            {matchesLoading ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Loading matches...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-destructive">Failed to load matches data</p>
              </div>
            ) : matches.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No matches found for {selectedYear}</p>
                {isAuthenticated && (
                  <p className="text-sm text-muted-foreground mt-2">
                    As an admin, you can add matches from the admin dashboard.
                  </p>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-bold">Date</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Captain</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Opponent Team</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Winner</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Position</TableHead>
                    <TableHead className="text-primary-foreground font-bold">Tournament</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match: any, index: number) => (
                    <TableRow
                      key={match._id || index}
                      className="hover:bg-secondary/50 transition-colors"
                    >
                      <TableCell className="font-medium">{match.date}</TableCell>
                      <TableCell>{match.captain}</TableCell>
                      <TableCell>{match.opponent}</TableCell>
                      <TableCell>
                        <span
                          className={`font-semibold ${
                            match.winner === "Our College"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {match.winner}
                        </span>
                      </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                  match.position === "1" || match.position === "1st"
                                    ? "bg-green-500 text-white"
                                    : match.position === "2" || match.position === "2nd"
                                    ? "bg-yellow-500 text-black"
                                    : "bg-accent text-accent-foreground"
                                }`}
                              >
                                {match.position}
                              </span>
                            </TableCell>
                            <TableCell>{match.tournament}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
