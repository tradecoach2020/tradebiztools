import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Plus, Edit, Trash2, Clock, MapPin, Phone, Mail, User, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "project" | "appointment";
  status: "scheduled" | "in-progress" | "completed" | "quoted";
  client: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  description: string;
  estimatedValue?: number;
  quotedValue?: number;
  actualValue?: number;
  duration: string;
  notes: string;
  createdAt: Date;
}

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "appointments">("appointments");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    date: selectedDate,
    time: "09:00",
    type: "appointment" as "project" | "appointment",
    status: "scheduled" as CalendarEvent["status"],
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
    description: "",
    estimatedValue: "",
    duration: "1",
    notes: ""
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = getFromLocalStorage<CalendarEvent[]>("calendar-events", []);
    setEvents(savedEvents);
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    saveToLocalStorage("calendar-events", events);
  }, [events]);

  const resetForm = () => {
    setFormData({
      title: "",
      date: selectedDate,
      time: "09:00",
      type: "appointment",
      status: "scheduled",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientAddress: "",
      description: "",
      estimatedValue: "",
      duration: "2",
      notes: ""
    });
    setEditingEvent(null);
  };

  const handleSaveEvent = () => {
    if (!formData.title || !formData.clientName || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newEvent: CalendarEvent = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: formData.status,
      client: {
        name: formData.clientName,
        phone: formData.clientPhone,
        email: formData.clientEmail,
        address: formData.clientAddress
      },
      description: formData.description,
      estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
      duration: formData.duration,
      notes: formData.notes,
      createdAt: editingEvent?.createdAt || new Date()
    };

    if (editingEvent) {
      setEvents(events.map(event => event.id === editingEvent.id ? newEvent : event));
      toast({
        title: "Event Updated",
        description: `${newEvent.title} has been updated`
      });
    } else {
      setEvents([...events, newEvent]);
      toast({
        title: "Event Created",
        description: `${newEvent.title} has been added to your calendar`
      });
    }

    setShowEventDialog(false);
    resetForm();
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      status: event.status,
      clientName: event.client.name,
      clientPhone: event.client.phone,
      clientEmail: event.client.email,
      clientAddress: event.client.address,
      description: event.description,
      estimatedValue: event.estimatedValue?.toString() || "",
      duration: event.duration,
      notes: event.notes
    });
    setShowEventDialog(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your calendar"
    });
  };

  const convertToProject = (appointmentId: string) => {
    setEvents(events.map(event => 
      event.id === appointmentId 
        ? { ...event, type: "project", status: "scheduled" }
        : event
    ));
    toast({
      title: "Converted to Project",
      description: "Appointment has been converted to a project"
    });
  };

  const getStatusColor = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "scheduled": return "bg-blue-500";
      case "in-progress": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      case "quoted": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getUpcomingEvents = (type: "project" | "appointment") => {
    const now = new Date();
    return events
      .filter(event => event.type === type)
      .filter(event => new Date(`${event.date}T${event.time}`) >= now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
      .slice(0, 5);
  };

  const getTodaysEvents = (type: "project" | "appointment") => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.type === type && event.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <Card className="max-w-6xl mx-auto bg-gray-900/90 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <CalendarIcon className="text-primary" />
            Job Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "projects" | "appointments")}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-gray-800 border border-gray-700">
                <TabsTrigger value="appointments" className="data-[state=active]:bg-primary">
                  Appointments ({events.filter(e => e.type === "appointment").length})
                </TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-primary">
                  Projects ({events.filter(e => e.type === "project").length})
                </TabsTrigger>
              </TabsList>

              <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add {activeTab === "projects" ? "Project" : "Appointment"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEvent ? "Edit" : "Add"} {formData.type === "project" ? "Project" : "Appointment"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., Kitchen Installation, Plumbing Repair"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={formData.type} onValueChange={(value: "project" | "appointment") => setFormData({...formData, type: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="appointment">Appointment (Quote)</SelectItem>
                          <SelectItem value="project">Project (Booked Job)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value: CalendarEvent["status"]) => setFormData({...formData, status: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="quoted">Quoted</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <h3 className="text-lg font-medium mb-2">Client Details</h3>
                    </div>

                    <div>
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientPhone">Phone Number</Label>
                      <Input
                        id="clientPhone"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientEmail">Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        step="0.5"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="clientAddress">Address</Label>
                      <Input
                        id="clientAddress"
                        value={formData.clientAddress}
                        onChange={(e) => setFormData({...formData, clientAddress: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe the work to be done..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="estimatedValue">Estimated Value (£)</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        value={formData.estimatedValue}
                        onChange={(e) => setFormData({...formData, estimatedValue: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Additional notes..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEvent}>
                      {editingEvent ? "Update" : "Create"} {formData.type === "project" ? "Project" : "Appointment"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="appointments">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Today's Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getTodaysEvents("appointment").length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No appointments today</p>
                      ) : (
                        <div className="space-y-3">
                          {getTodaysEvents("appointment").map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getStatusColor(event.status)} text-white`}>
                                    {event.status}
                                  </Badge>
                                  <span className="font-medium">{event.time}</span>
                                </div>
                                <h4 className="font-medium mt-1">{event.title}</h4>
                                <p className="text-sm text-gray-400">{event.client.name}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => convertToProject(event.id)}
                                  className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getUpcomingEvents("appointment").length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No upcoming appointments</p>
                      ) : (
                        <div className="space-y-3">
                          {getUpcomingEvents("appointment").map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getStatusColor(event.status)} text-white`}>
                                    {event.status}
                                  </Badge>
                                  <span className="text-sm text-gray-400">{event.date} at {event.time}</span>
                                </div>
                                <h4 className="font-medium mt-1">{event.title}</h4>
                                <p className="text-sm text-gray-400">{event.client.name}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => convertToProject(event.id)}
                                  className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                                  title="Convert to Project"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)} className="text-red-400 hover:bg-red-900/20">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Today's Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getTodaysEvents("project").length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No projects today</p>
                      ) : (
                        <div className="space-y-3">
                          {getTodaysEvents("project").map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getStatusColor(event.status)} text-white`}>
                                    {event.status}
                                  </Badge>
                                  <span className="font-medium">{event.time}</span>
                                </div>
                                <h4 className="font-medium mt-1">{event.title}</h4>
                                <p className="text-sm text-gray-400">{event.client.name}</p>
                                {event.estimatedValue && (
                                  <p className="text-sm text-green-400">£{event.estimatedValue.toLocaleString()}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {getUpcomingEvents("project").length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No upcoming projects</p>
                      ) : (
                        <div className="space-y-3">
                          {getUpcomingEvents("project").map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getStatusColor(event.status)} text-white`}>
                                    {event.status}
                                  </Badge>
                                  <span className="text-sm text-gray-400">{event.date} at {event.time}</span>
                                </div>
                                <h4 className="font-medium mt-1">{event.title}</h4>
                                <p className="text-sm text-gray-400">{event.client.name}</p>
                                {event.estimatedValue && (
                                  <p className="text-sm text-green-400">£{event.estimatedValue.toLocaleString()}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleEditEvent(event)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDeleteEvent(event.id)} className="text-red-400 hover:bg-red-900/20">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default Calendar;