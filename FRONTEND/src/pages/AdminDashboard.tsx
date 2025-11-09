import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, LogOut, ArrowLeft, Trophy } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Sport {
  _id: string;
  name: string;
  description: string;
  image: string;
  rules: string;
  equipment: string;
  coach: string;
  captain: string;
  academicYears: string[];
}

interface Match {
  _id: string;
  sport: string;
  date: string;
  captain: string;
  opponent: string;
  winner: string;
  position: string;
  tournament: string;
  year: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [sports, setSports] = useState<Sport[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddMatchDialogOpen, setIsAddMatchDialogOpen] = useState(false);
  const [editingSport, setEditingSport] = useState<Sport | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    rules: "",
    equipment: "",
    coach: "",
    captain: "",
    academicYears: ["2024-25"],
  });
  const [matchFormData, setMatchFormData] = useState({
    sport: "",
    date: "",
    captain: "",
    opponent: "",
    winner: "",
    position: "",
    tournament: "",
    year: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }
    fetchSports();
    fetchMatches();
  }, [isAuthenticated, navigate]);

  const fetchSports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/sports', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSports(data);
        if (!selectedSport && data.length > 0) {
          setSelectedSport(data[0].name.toLowerCase());
        }
      } else {
        toast.error("Failed to fetch sports");
      }
    } catch (error) {
      toast.error("Network error");
      console.error('Fetch sports error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('token');
      // Fetch matches for all sports
      const allMatches = [];
      for (const sport of ['cricket', 'kabaddi', 'basketball', 'throwball', 'football', 'badminton']) {
        try {
          const response = await fetch(`http://localhost:5001/api/matches/${sport}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            allMatches.push(...data);
          }
        } catch (err) {
          // Continue if one sport fails
        }
      }
      setMatches(allMatches);
    } catch (error) {
      console.log("Network error fetching matches - this is expected if MongoDB is not available");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = editingSport
        ? `http://localhost:5001/api/sports/${editingSport._id}`
        : 'http://localhost:5001/api/sports';

      const method = editingSport ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingSport ? "Sport updated successfully!" : "Sport added successfully!");
        fetchSports();
        setIsAddDialogOpen(false);
        setEditingSport(null);
        setFormData({ name: "", description: "", image: "", rules: "", equipment: "", coach: "", captain: "", academicYears: ["2024-25"] });
      } else {
        toast.error("Failed to save sport");
      }
    } catch (error) {
      toast.error("Network error");
      console.error('Save sport error:', error);
    }
  };

  const handleEdit = (sport: Sport) => {
    setEditingSport(sport);
    setFormData({
      name: sport.name,
      description: sport.description,
      image: sport.image,
      rules: sport.rules,
      equipment: sport.equipment,
      coach: sport.coach || "",
      captain: sport.captain || "",
      academicYears: sport.academicYears || ["2024-25"],
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5001/api/sports/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Sport deleted successfully!");
        fetchSports();
      } else {
        toast.error("Failed to delete sport");
      }
    } catch (error) {
      toast.error("Network error");
      console.error('Delete sport error:', error);
    }
  };

  const handleMatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const url = editingMatch
        ? `http://localhost:5001/api/matches/${editingMatch._id}`
        : 'http://localhost:5001/api/matches';

      const method = editingMatch ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...matchFormData,
          sport: selectedSport.toLowerCase(),
        }),
      });

      if (response.ok) {
        toast.success(editingMatch ? "Match updated successfully!" : "Match added successfully!");
        fetchMatches();
        setIsAddMatchDialogOpen(false);
        setEditingMatch(null);
        setMatchFormData({
          sport: "",
          date: "",
          captain: "",
          opponent: "",
          winner: "",
          position: "",
          tournament: "",
          year: new Date().getFullYear().toString(),
        });
      } else {
        toast.error("Failed to save match");
      }
    } catch (error) {
      toast.error("Network error");
      console.error('Save match error:', error);
    }
  };

  const handleEditMatch = (match: Match) => {
    setEditingMatch(match);
    setMatchFormData({
      sport: match.sport,
      date: match.date,
      captain: match.captain,
      opponent: match.opponent,
      winner: match.winner,
      position: match.position,
      tournament: match.tournament,
      year: match.year,
    });
    setIsAddMatchDialogOpen(true);
  };

  const handleDeleteMatch = async (id: string) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5001/api/matches/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Match deleted successfully!");
        fetchMatches();
      } else {
        toast.error("Failed to delete match");
      }
    } catch (error) {
      toast.error("Network error");
      console.error('Delete match error:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {user?.username}</span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs for Sports and Matches */}
        <Tabs value={selectedSport || "sports"} onValueChange={setSelectedSport} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger
              value="sports"
              className={`text-yellow-500 hover:bg-green-500 hover:text-white transition-colors ${selectedSport === "sports" ? 'bg-yellow-500 text-black' : ''}`}
            >
              Sports
            </TabsTrigger>
            {sports.map((sport) => {
              const hasMatches = matches.some(match => match.sport === sport.name.toLowerCase());
              return (
                <TabsTrigger
                  key={sport._id}
                  value={sport.name.toLowerCase()}
                  className={`hover:bg-green-500 hover:text-white transition-colors ${selectedSport === sport.name.toLowerCase() ? 'bg-yellow-500 text-black' : ''}`}
                >
                  {sport.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="sports" className="mt-6">
            {/* Add Sport Button */}
            <div className="mb-6">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Sport
                  </Button>
                </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingSport ? "Edit Sport" : "Add New Sport"}</DialogTitle>
                <DialogDescription>
                  {editingSport ? "Update the sport information." : "Fill in the details for the new sport."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rules">Rules</Label>
                    <Textarea
                      id="rules"
                      value={formData.rules}
                      onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Equipment</Label>
                    <Textarea
                      id="equipment"
                      value={formData.equipment}
                      onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="coach">Coach</Label>
                    <Input
                      id="coach"
                      value={formData.coach}
                      onChange={(e) => setFormData({ ...formData, coach: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="captain">Captain</Label>
                    <Input
                      id="captain"
                      value={formData.captain}
                      onChange={(e) => setFormData({ ...formData, captain: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYears">Academic Years</Label>
                  <div className="space-y-2">
                    {formData.academicYears.map((year, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={year}
                          onChange={(e) => {
                            const newYears = [...formData.academicYears];
                            newYears[index] = e.target.value;
                            setFormData({ ...formData, academicYears: newYears });
                          }}
                          placeholder="e.g., 2024-25"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newYears = formData.academicYears.filter((_, i) => i !== index);
                            setFormData({ ...formData, academicYears: newYears });
                          }}
                          disabled={formData.academicYears.length === 1}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          academicYears: [...formData.academicYears, ""]
                        });
                      }}
                    >
                      Add Year
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setEditingSport(null);
                      setFormData({ name: "", description: "", image: "", rules: "", equipment: "", coach: "", captain: "", academicYears: ["2024-25"] });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingSport ? "Update Sport" : "Add Sport"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <Card key={sport._id} className="overflow-hidden border-t-2 border-black">
              <div className="aspect-video bg-muted">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{sport.name}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(sport)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Sport</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{sport.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(sport._id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {sport.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Rules:</strong> {sport.rules.substring(0, 50)}...</p>
                  <p><strong>Equipment:</strong> {sport.equipment.substring(0, 50)}...</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No sports found. Add your first sport!</p>
          </div>
        )}
          </TabsContent>

          {/* Match Tabs for each sport */}
          {sports.map((sport) => (
            <TabsContent key={sport._id} value={sport.name.toLowerCase()} className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary">{sport.name} Matches</h2>
                <Dialog open={isAddMatchDialogOpen} onOpenChange={setIsAddMatchDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Match
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingMatch ? "Edit Match" : "Add New Match"}</DialogTitle>
                      <DialogDescription>
                        {editingMatch ? "Update the match information." : "Fill in the details for the new match."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleMatchSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="match-date">Date</Label>
                          <Input
                            id="match-date"
                            type="date"
                            value={matchFormData.date}
                            onChange={(e) => setMatchFormData({ ...matchFormData, date: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="match-captain">Captain</Label>
                          <Input
                            id="match-captain"
                            value={matchFormData.captain}
                            onChange={(e) => setMatchFormData({ ...matchFormData, captain: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="match-opponent">Opponent Team</Label>
                          <Input
                            id="match-opponent"
                            value={matchFormData.opponent}
                            onChange={(e) => setMatchFormData({ ...matchFormData, opponent: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="match-winner">Winner</Label>
                          <Input
                            id="match-winner"
                            value={matchFormData.winner}
                            onChange={(e) => setMatchFormData({ ...matchFormData, winner: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="match-position">Position</Label>
                          <Input
                            id="match-position"
                            value={matchFormData.position}
                            onChange={(e) => setMatchFormData({ ...matchFormData, position: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="match-tournament">Tournament</Label>
                          <Input
                            id="match-tournament"
                            value={matchFormData.tournament}
                            onChange={(e) => setMatchFormData({ ...matchFormData, tournament: e.target.value })}
                            placeholder="e.g., Inter College Tournament"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="match-year">Year</Label>
                        <Input
                          id="match-year"
                          value={matchFormData.year}
                          onChange={(e) => setMatchFormData({ ...matchFormData, year: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsAddMatchDialogOpen(false);
                            setEditingMatch(null);
                            setMatchFormData({
                              sport: "",
                              date: "",
                              captain: "",
                              opponent: "",
                              winner: "",
                              position: "",
                              tournament: "",
                              year: new Date().getFullYear().toString(),
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingMatch ? "Update Match" : "Add Match"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Matches Table */}
              <div className="bg-card rounded-xl shadow-md border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary hover:bg-primary">
                        <TableHead className="text-primary-foreground font-bold">Date</TableHead>
                        <TableHead className="text-primary-foreground font-bold">Captain</TableHead>
                        <TableHead className="text-primary-foreground font-bold">Opponent</TableHead>
                        <TableHead className="text-primary-foreground font-bold">Winner</TableHead>
                        <TableHead className="text-primary-foreground font-bold">Position</TableHead>
                        <TableHead className="text-primary-foreground font-bold">Tournament</TableHead>
                        <TableHead className="text-primary-foreground font-bold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {matches
                        .filter((match) => match.sport === sport.name.toLowerCase())
                        .map((match) => (
                          <TableRow key={match._id} className="hover:bg-secondary/50 transition-colors">
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
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditMatch(match)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Match</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this match? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteMatch(match._id)}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {matches.filter((match) => match.sport === sport.name.toLowerCase()).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No matches found for {sport.name}. Add the first match!</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
