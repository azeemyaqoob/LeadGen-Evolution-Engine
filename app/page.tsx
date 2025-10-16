"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { OutreachDashboard } from "@/components/outreach-dashboard";
import { ApiSetupGuide } from "@/components/api-setup-guide";
import {
  Download,
  Search,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  BarChart3,
  AlertCircle,
  Sparkles,
  Target,
  Zap,
  Crown,
  Rocket,
  Palette,
  TrendingUp,
  Users,
  DollarSign,
  Building,
  MapPin,
  Star,
  Eye,
  Calendar,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Lightbulb,
  Shield,
  Gauge,
  Smartphone,
  SearchCheck,
  Send,
  BarChart4,
  TargetIcon,
  Clock,
  CheckCircle2,
  XCircle,
  PlayCircle,
  PauseCircle,
  MailOpen,
  MessageCircle,
  PhoneCall,
  PieChart,
  Activity,
  Trophy,
  TrendingDown,
  Users2,
  CalendarDays,
} from "lucide-react";

interface Business {
  id: string;
  name: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  score: number;
  issues: string[];
  redesignUrl?: string;
  outreachMessages: {
    email: string;
    whatsapp: string;
    sms: string;
  };
}

export default function WebsiteRevolutionPro() {
  const [location, setLocation] = useState("");
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [apiSetupRequired, setApiSetupRequired] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeSection, setActiveSection] = useState<"discover" | "engagement" | "analytics">("discover");

  const handleSearch = async () => {
    if (!location.trim() || !niche.trim()) return;

    setIsLoading(true);
    setApiSetupRequired(false);
    setError(null);

    try {
      const response = await fetch("/api/businesses-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, niche }),
      });

      const data = await response.json();

      if (!data.success) {
        if (data.setupRequired) {
          setApiSetupRequired(true);
        } else {
          setError(data.details || data.error || "An error occurred");
        }
        setBusinesses([]);
      } else {
        setBusinesses(data.businesses || []);
      }
    } catch (error) {
      console.error("Error analyzing businesses:", error);
      setError("Network error occurred. Please try again.");
      setBusinesses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetch("/api/csv-file-export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businesses,
          includeOutreach: true,
          includeAnalysis: true,
          niche,
          location,
        }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `website-revolution-${location.replace(
        /[^a-zA-Z0-9]/g,
        "-"
      )}-${niche.replace(/[^a-zA-Z0-9]/g, "-")}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const getPriority = (score: number) => {
    if (score < 50) return { label: "Critical", color: "bg-rose-500", text: "text-rose-600", bg: "bg-rose-50" };
    if (score < 70) return { label: "High", color: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50" };
    return { label: "Good", color: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" };
  };

  // Mock data
  const engagementStats = {
    totalContacts: businesses.length,
    contacted: Math.floor(businesses.length * 0.3),
    responded: Math.floor(businesses.length * 0.15),
    meetings: Math.floor(businesses.length * 0.05),
    activeCampaigns: 5,
    scheduled: 15,
    opened: 20,
    clicked: 10
  };

  const analyticsData = {
    totalValue: businesses.filter(b => b.score < 70).length * 2500,
    conversionRate: 22,
    avgResponseTime: "3.1 hours",
    topPerformingNiche: niche,
    successRate: 60,
    growth: 10
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-20"></div>
              <Rocket className="h-12 w-12 text-purple-600 relative z-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            LeadGen Evolution Engine
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your map to local digital transformation opportunities.
          </p>
        </div>

        {/* Search Section - Single Row */}
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              {/* Location */}
              <div className="flex-1 w-full">
                <Label className="text-sm font-semibold flex items-center gap-2 text-slate-700 mb-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  Target Location
                </Label>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter any city, region, or country (e.g., New York, Tokyo, Berlin)"
                  className="w-full h-12 border-2 border-slate-200 focus:border-purple-500 rounded-xl bg-white/50 px-3"
                />
              </div>

              {/* Niche */}
              <div className="flex-1 w-full">
                <Label className="text-sm font-semibold flex items-center gap-2 text-slate-700 mb-2">
                  <Building className="h-4 w-4 text-orange-500" />
                  Business Category
                </Label>
                <Input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="Enter business type (e.g., restaurants, dentists, hotels)"
                  className="w-full h-12 border-2 border-slate-200 focus:border-purple-500 rounded-xl bg-white/50 px-3"
                />
              </div>

              {/* Search Button */}
              <div className="w-full lg:w-auto">
                <Button
                  onClick={handleSearch}
                  disabled={!location.trim() || !niche.trim() || isLoading}
                  className="w-full lg:w-auto h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl px-8"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Scanning...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Launch Opportunity Scan
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-500 flex flex-col lg:flex-row gap-1 lg:gap-4">
              <span>💡 Examples: "London, UK" • "New York, USA" • "Tokyo, Japan" • "Berlin, Germany"</span>
              <span>🏢 Examples: "restaurants" • "dentists" • "hotels" • "consultants"</span>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            onClick={() => setActiveSection("discover")}
            variant={activeSection === "discover" ? "default" : "outline"}
            className={`rounded-xl px-6 py-3 ${
              activeSection === "discover" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "border-2 border-slate-200"
            }`}
          >
            <SearchCheck className="h-4 w-4 mr-2" />
            Discover Opportunities
          </Button>
          <Button
            onClick={() => setActiveSection("engagement")}
            variant={activeSection === "engagement" ? "default" : "outline"}
            className={`rounded-xl px-6 py-3 ${
              activeSection === "engagement" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "border-2 border-slate-200"
            }`}
          >
            <Send className="h-4 w-4 mr-2" />
            Engagement Hub
          </Button>
          <Button
            onClick={() => setActiveSection("analytics")}
            variant={activeSection === "analytics" ? "default" : "outline"}
            className={`rounded-xl px-6 py-3 ${
              activeSection === "analytics" 
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                : "border-2 border-slate-200"
            }`}
          >
            <BarChart4 className="h-4 w-4 mr-2" />
            Performance Metrics
          </Button>
        </div>

        {/* Discover Opportunities Section */}
        {activeSection === "discover" && (
          <div className="space-y-6">
            {businesses.length > 0 && (
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Digital Readiness Report
                  </h2>
                  <p className="text-slate-600">Found {businesses.length} opportunities in {location}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    className="border-2 border-slate-200 rounded-xl"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {viewMode === "grid" ? "List View" : "Grid View"}
                  </Button>
                  <Button
                    onClick={handleExportCSV}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            )}

            {apiSetupRequired ? (
              <ApiSetupGuide />
            ) : error ? (
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-rose-600 mb-2">Scan Failed</p>
                  <p className="text-sm text-slate-600">{error}</p>
                  <Button
                    onClick={() => setActiveSection("discover")}
                    variant="outline"
                    className="mt-4 rounded-xl border-2"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            ) : isLoading ? (
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
                      <Rocket className="h-6 w-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">Scanning Digital Footprints</p>
                  <p className="text-sm text-slate-600 mt-2">
                    Analyzing websites and identifying modernization opportunities...
                  </p>
                </CardContent>
              </Card>
            ) : businesses.length === 0 ? (
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <SearchCheck className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-slate-600">Ready to Discover Opportunities</p>
                  <p className="text-sm text-slate-500">
                    Enter any location and business category to find digital transformation candidates worldwide
                  </p>
                </CardContent>
              </Card>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {businesses.map((business) => {
                  const priority = getPriority(business.score);
                  return (
                    <Card key={business.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                      <div className="absolute top-4 right-4">
                        <Badge className={`${priority.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                          {priority.label} Priority
                        </Badge>
                      </div>
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl group-hover:scale-110 transition-transform duration-200">
                            <Building className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl text-slate-900 mb-1">{business.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1 text-slate-600">
                              <MapPin className="h-3 w-3" />
                              <span className="text-sm truncate">{business.address}</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Digital Score */}
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-2xl border border-slate-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-slate-700">Digital Presence Score</span>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span className={`text-lg font-bold ${priority.text}`}>{business.score}/100</span>
                            </div>
                          </div>
                          <Progress value={business.score} className="h-2 rounded-full" />
                        </div>

                        {/* Contact Quick Actions */}
                        <div className="grid grid-cols-3 gap-3">
                          <Button variant="outline" size="sm" className="rounded-lg h-10" asChild>
                            <a href={`tel:${business.phone}`}>
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg h-10" asChild>
                            <a href={`mailto:${business.email}`}>
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg h-10" asChild>
                            <a href={business.website} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-3 w-3 mr-1" />
                              Visit
                            </a>
                          </Button>
                        </div>

                        {/* Improvement Opportunities */}
                        {business.issues.length > 0 && (
                          <div className="border-l-4 border-amber-400 bg-amber-50/50 p-4 rounded-2xl">
                            <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-amber-600" />
                              Key Opportunities
                            </h4>
                            <div className="space-y-2">
                              {business.issues.slice(0, 3).map((issue, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                  <span>{issue}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                            onClick={() => setActiveSection("engagement")}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Start Engagement
                          </Button>
                          {business.redesignUrl && (
                            <Button variant="outline" size="sm" asChild className="rounded-xl">
                              <a href={business.redesignUrl} target="_blank" rel="noopener noreferrer">
                                <Palette className="h-4 w-4 mr-1" />
                                Preview
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {businesses.map((business) => {
                  const priority = getPriority(business.score);
                  return (
                    <Card key={business.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Business Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
                                <Building className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 text-lg">{business.name}</h3>
                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {business.address}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3 text-blue-500" />
                                {business.website}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-green-500" />
                                {business.phone}
                              </span>
                            </div>
                          </div>

                          {/* Score & Actions */}
                          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start lg:items-end gap-4">
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${priority.text} mb-1`}>
                                {business.score}
                              </div>
                              <Badge variant="outline" className={priority.text}>
                                Digital Score
                              </Badge>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => setActiveSection("engagement")}
                              >
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Engage
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg">
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Engagement Hub Section */}
        {activeSection === "engagement" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{engagementStats.totalContacts}</h3>
                  <p className="text-slate-600 font-semibold">Total Prospects</p>
                  <p className="text-sm text-slate-500 mt-1">Ready for outreach</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{engagementStats.responded}</h3>
                  <p className="text-slate-600 font-semibold">Positive Responses</p>
                  <p className="text-sm text-slate-500 mt-1">Engaged prospects</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{engagementStats.meetings}</h3>
                  <p className="text-slate-600 font-semibold">Meetings Booked</p>
                  <p className="text-sm text-slate-500 mt-1">Conversion success</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Campaign Manager */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-blue-600" />
                    Campaign Manager
                  </CardTitle>
                  <CardDescription>Active outreach campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold">Email Sequence</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold">LinkedIn Outreach</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-50">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="font-semibold">Follow-up Calls</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-50">Paused</Badge>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl">
                    <Send className="h-4 w-4 mr-2" />
                    Launch New Campaign
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Immediate engagement tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2">
                    <Mail className="h-4 w-4 mr-3 text-blue-500" />
                    Bulk Email Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2">
                    <PhoneCall className="h-4 w-4 mr-3 text-green-500" />
                    Call List Generator
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2">
                    <MessageCircle className="h-4 w-4 mr-3 text-purple-500" />
                    SMS Broadcast
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-2">
                    <Calendar className="h-4 w-4 mr-3 text-orange-500" />
                    Schedule Meetings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-slate-600" />
                  Recent Engagement Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businesses.slice(0, 5).map((business, index) => (
                    <div key={business.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          index % 3 === 0 ? 'bg-green-500' : 
                          index % 3 === 1 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}></div>
                        <span className="font-medium">{business.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {index % 3 === 0 ? 'Email Sent' : index % 3 === 1 ? 'Call Scheduled' : 'Needs Follow-up'}
                        </Badge>
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500">2h ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Performance Metrics Section */}
        {activeSection === "analytics" && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600">Total Value</p>
                      <h3 className="text-2xl font-bold text-slate-800">£{analyticsData.totalValue.toLocaleString()}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">+12.4%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600">Success Rate</p>
                      <h3 className="text-2xl font-bold text-slate-800">{analyticsData.successRate}%</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">+5.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600">Response Time</p>
                      <h3 className="text-2xl font-bold text-slate-800">{analyticsData.avgResponseTime}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">-1.2h</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600">Conversion Rate</p>
                      <h3 className="text-2xl font-bold text-slate-800">{analyticsData.conversionRate}%</h3>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <TargetIcon className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-semibold">+3.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Campaign Performance
                  </CardTitle>
                  <CardDescription>Last 30 days engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <MailOpen className="h-5 w-5 text-blue-500" />
                        <span>Email Open Rate</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">68%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                        <span>Response Rate</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">42%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <PhoneCall className="h-5 w-5 text-purple-500" />
                        <span>Call Success Rate</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">78%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-orange-500" />
                        <span>Meeting Conversion</span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">35%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Top Performing Categories
                  </CardTitle>
                  <CardDescription>Most responsive business types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Restaurants</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24 h-2" />
                        <span className="text-sm font-semibold text-green-600">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dentists</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-24 h-2" />
                        <span className="text-sm font-semibold text-blue-600">72%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Plumbers</span>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="w-24 h-2" />
                        <span className="text-sm font-semibold text-amber-600">68%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Consultants</span>
                      <div className="flex items-center gap-2">
                        <Progress value={55} className="w-24 h-2" />
                        <span className="text-sm font-semibold text-slate-600">55%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export & Reports */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-slate-600" />
                  Reports & Exports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 rounded-xl border-2 justify-start">
                    <PieChart className="h-5 w-5 mr-3 text-blue-500" />
                    <div className="text-left">
                      <div className="font-semibold">Performance Report</div>
                      <div className="text-xs text-slate-500">Detailed analytics</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16 rounded-xl border-2 justify-start">
                    <Users2 className="h-5 w-5 mr-3 text-green-500" />
                    <div className="text-left">
                      <div className="font-semibold">Client Portfolio</div>
                      <div className="text-xs text-slate-500">All prospects</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16 rounded-xl border-2 justify-start">
                    <BarChart4 className="h-5 w-5 mr-3 text-purple-500" />
                    <div className="text-left">
                      <div className="font-semibold">Revenue Forecast</div>
                      <div className="text-xs text-slate-500">Projected income</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16 rounded-xl border-2 justify-start">
                    <CalendarDays className="h-5 w-5 mr-3 text-orange-500" />
                    <div className="text-left">
                      <div className="font-semibold">Schedule Report</div>
                      <div className="text-xs text-slate-500">Automated exports</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}