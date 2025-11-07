import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
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

// Mock data - will be replaced with actual data from backend
const mockData: Record<string, any> = {
  cricket: {
    coach: "Mr. Suresh Raina",
    captain: "Virat Sharma",
    years: ["2024", "2023", "2022"],
    matches: [
      {
        date: "2024-01-15",
        captain: "Virat Sharma",
        opponent: "St. Xavier's College",
        winner: "Our College",
        position: "1st",
      },
      {
        date: "2024-02-20",
        captain: "Virat Sharma",
        opponent: "Delhi University",
        winner: "Delhi University",
        position: "2nd",
      },
      {
        date: "2024-03-10",
        captain: "Virat Sharma",
        opponent: "Mumbai College",
        winner: "Our College",
        position: "1st",
      },
    ],
  },
  kabaddi: {
    coach: "Mr. Anup Kumar",
    captain: "Rahul Chaudhary",
    years: ["2024", "2023", "2022"],
    matches: [
      {
        date: "2024-01-20",
        captain: "Rahul Chaudhary",
        opponent: "Jaipur College",
        winner: "Our College",
        position: "1st",
      },
    ],
  },
  basketball: {
    coach: "Mr. Michael Johnson",
    captain: "Arjun Singh",
    years: ["2024", "2023", "2022"],
    matches: [
      {
        date: "2024-02-05",
        captain: "Arjun Singh",
        opponent: "Bangalore Institute",
        winner: "Bangalore Institute",
        position: "2nd",
      },
    ],
  },
  throwball: {
    coach: "Ms. Priya Sharma",
    captain: "Neha Patel",
    years: ["2024", "2023", "2022"],
    matches: [
      {
        date: "2024-01-25",
        captain: "Neha Patel",
        opponent: "Women's College Delhi",
        winner: "Our College",
        position: "1st",
      },
    ],
  },
  football: {
    coach: "Mr. Carlos Rodriguez",
    captain: "Sunil Chhetri Jr.",
    years: ["2024", "2023", "2022"],
    matches: [
      {
        date: "2024-03-15",
        captain: "Sunil Chhetri Jr.",
        opponent: "Kolkata Sports Academy",
        winner: "Our College",
        position: "1st",
      },
    ],
  },
  badminton: {
    coach: "Ms. Saina Nehwal",
    captain: "Lakshya Sen",
    years: ["2024", "2023", "2022"],
    matches: [
      {
        date: "2024-02-28",
        captain: "Lakshya Sen",
        opponent: "Hyderabad Institute",
        winner: "Our College",
        position: "1st",
      },
    ],
  },
};

export default function SportDetails() {
  const { sport } = useParams<{ sport: string }>();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("2024");

  const sportData = sport ? mockData[sport] : null;

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
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-gradient-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Coach</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{sportData.coach}</p>
          </div>
          
          <div className="bg-gradient-card rounded-xl p-6 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Captain</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{sportData.captain}</p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="flex justify-center">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[200px] bg-primary text-primary-foreground">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              {sportData.years.map((year: string) => (
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
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-bold">Date</TableHead>
                  <TableHead className="text-primary-foreground font-bold">Captain</TableHead>
                  <TableHead className="text-primary-foreground font-bold">Opponent Team</TableHead>
                  <TableHead className="text-primary-foreground font-bold">Winner</TableHead>
                  <TableHead className="text-primary-foreground font-bold">Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sportData.matches.map((match: any, index: number) => (
                  <TableRow 
                    key={index}
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
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold">
                        {match.position}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
