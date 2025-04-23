import React, { useState } from 'react';
import { User, Mail, Building, Edit, Camera, Save } from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import PageHeading from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    company: 'Acme Corporation',
    role: 'Marketing Manager',
    location: 'New York, NY',
    bio: 'Marketing professional with 8+ years of experience in digital strategy and brand management. Passionate about data-driven marketing and creative content that drives results.',
  });
  
  const [formData, setFormData] = useState({ ...profileData });  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setProfileData({ ...formData });
    setIsEditing(false);
    toast("Profile Updated", {
        description: "Your profile information has been saved successfully.",
      });
  };
  
  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
  };
  
  return (
    <DashboardLayout>
      <PageHeading
        title="User Profile"
        subtitle="View and manage your profile settings"
      />
      
      <div className="glass p-6 md:p-8 rounded-xl shadow-elevation">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 border-4 border-white shadow-md">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User Avatar" />
                  <AvatarFallback className="text-3xl bg-tagit-mint text-tagit-darkblue">AJ</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-tagit-blue text-white p-2 rounded-full shadow-lg hover:bg-tagit-darkblue transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-tagit-darkblue">{profileData.name}</h2>
              <p className="text-tagit-blue">{profileData.role}</p>
              <p className="text-sm text-muted-foreground mt-1">{profileData.location}</p>
            </div>
            
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-tagit-darkblue mb-2">Storage Usage</h3>
                <Progress value={65} className="h-2" />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">6.5 GB used</span>
                  <span className="text-xs text-muted-foreground">10 GB total</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-tagit-darkblue mb-2">Account Type</h3>
                <div className="flex items-center justify-between">
                  <span className="text-tagit-blue">Pro Plan</span>
                  <span className="text-xs bg-tagit-mint/30 text-tagit-darkblue px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Renews on Oct 15, 2023</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-tagit-darkblue mb-2">Account Created</h3>
                <p className="text-tagit-blue">January 12, 2022</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-tagit-darkblue">Personal Information</h3>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave} className="bg-tagit-blue text-white hover:bg-tagit-darkblue">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 tagit-input"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 tagit-input"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="pl-10 tagit-input"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Job Title</Label>
                        <Input
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="tagit-input"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="tagit-input"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="tagit-input w-full resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p className="text-tagit-darkblue">{profileData.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="text-tagit-darkblue">{profileData.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Company</p>
                        <p className="text-tagit-darkblue">{profileData.company}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Job Title</p>
                        <p className="text-tagit-darkblue">{profileData.role}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="text-tagit-darkblue">{profileData.location}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bio</p>
                      <p className="text-tagit-darkblue whitespace-pre-line">{profileData.bio}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="activity" className="animate-fade-in">
                <h3 className="text-lg font-medium text-tagit-darkblue mb-6">Recent Activity</h3>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-tagit-mint/10 rounded-full mr-3">
                            <span className="h-5 w-5 flex items-center justify-center text-tagit-blue">
                              {i % 3 === 0 ? '↑' : i % 3 === 1 ? '↓' : '✓'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-tagit-darkblue">
                              {i % 3 === 0 
                                ? 'Uploaded quarterly-report-2023.pdf' 
                                : i % 3 === 1 
                                ? 'Downloaded marketing-strategy.docx' 
                                : 'Updated tags for financial-analysis.xlsx'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {i % 2 === 0 ? 'Today' : 'Yesterday'}, {i + 8}:{i * 10 < 10 ? '0' + i * 10 : i * 10} {i % 2 === 0 ? 'AM' : 'PM'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="animate-fade-in">
                <h3 className="text-lg font-medium text-tagit-darkblue mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-tagit-darkblue mb-2">Password</h4>
                    <p className="text-tagit-blue mb-4">Last changed 3 months ago</p>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-tagit-darkblue mb-2">Two-Factor Authentication</h4>
                    <p className="text-tagit-blue mb-4">Enhance your account security by enabling two-factor authentication.</p>
                    <Button className="bg-tagit-blue text-white hover:bg-tagit-darkblue">Enable 2FA</Button>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-tagit-darkblue mb-2">Active Sessions</h4>
                    <div className="space-y-3 mt-4">
                      <div className="p-3 rounded-lg border border-border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-tagit-darkblue">Current Session</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Windows 11 • Chrome • New York, USA
                            </p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Active Now
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg border border-border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-tagit-darkblue">Mobile App</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              iOS 16 • Tag-it App • New York, USA
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            2 days ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">Log Out All Devices</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;