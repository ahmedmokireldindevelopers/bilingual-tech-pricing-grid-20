import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  FileText,
  Image,
  FolderPlus,
  LogOut,
  Menu,
  X,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Settings,
  Globe,
  Users,
  Building2,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  Download,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Home,
  Bell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface Section {
  id: string;
  title: { en: string; ar: string };
  content: { en: string; ar: string };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContentImage {
  id: string;
  name: string;
  url: string;
  section: string;
  uploadedAt: string;
}

interface PropertySubmission {
  id: string;
  ownerName: string;
  email: string;
  phone: string;
  propertyType: string;
  listingType: string;
  city: string;
  country: string;
  price: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface DashboardStats {
  totalSections: number;
  activeSections: number;
  totalImages: number;
  totalSubmissions: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
  todaySubmissions: number;
  weeklyGrowth: number;
}

const DashboardContent = () => {
  const { t, isRtl, toggleLanguage, language } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [sections, setSections] = useState<Section[]>([
    { id: "1", title: { en: "Hero Section", ar: "القسم الرئيسي" }, content: { en: "Welcome to our platform", ar: "مرحباً بكم في منصتنا" }, isActive: true, createdAt: "2026-01-20", updatedAt: "2026-01-24" },
    { id: "2", title: { en: "Services", ar: "الخدمات" }, content: { en: "Our professional services", ar: "خدماتنا المهنية" }, isActive: true, createdAt: "2026-01-19", updatedAt: "2026-01-23" },
    { id: "3", title: { en: "About Us", ar: "من نحن" }, content: { en: "About our company", ar: "عن شركتنا" }, isActive: true, createdAt: "2026-01-18", updatedAt: "2026-01-22" },
    { id: "4", title: { en: "Real Estate", ar: "العقارات" }, content: { en: "Property listings", ar: "قوائم العقارات" }, isActive: true, createdAt: "2026-01-24", updatedAt: "2026-01-24" },
    { id: "5", title: { en: "Contact", ar: "تواصل معنا" }, content: { en: "Get in touch", ar: "تواصل معنا" }, isActive: false, createdAt: "2026-01-17", updatedAt: "2026-01-21" },
  ]);
  
  const [images, setImages] = useState<ContentImage[]>([
    { id: "1", name: "hero-banner.jpg", url: "/placeholder-1.jpg", section: "Hero", uploadedAt: "2026-01-24" },
    { id: "2", name: "service-1.png", url: "/placeholder-2.jpg", section: "Services", uploadedAt: "2026-01-23" },
    { id: "3", name: "property-1.jpg", url: "/placeholder-3.jpg", section: "Real Estate", uploadedAt: "2026-01-24" },
  ]);

  const [submissions, setSubmissions] = useState<PropertySubmission[]>([
    { id: "1", ownerName: "Ahmed Mohamed", email: "ahmed@example.com", phone: "+201234567890", propertyType: "Apartment", listingType: "Sale", city: "Cairo", country: "Egypt", price: "2,500,000 EGP", status: "pending", submittedAt: "2026-01-24 10:30" },
    { id: "2", ownerName: "Sara Ali", email: "sara@example.com", phone: "+201098765432", propertyType: "Villa", listingType: "Rent", city: "Alexandria", country: "Egypt", price: "25,000 EGP/month", status: "approved", submittedAt: "2026-01-23 15:45" },
    { id: "3", ownerName: "Mohamed Hassan", email: "mohamed@example.com", phone: "+201555666777", propertyType: "Duplex", listingType: "Sale", city: "Giza", country: "Egypt", price: "4,200,000 EGP", status: "pending", submittedAt: "2026-01-24 09:15" },
    { id: "4", ownerName: "Fatma Ibrahim", email: "fatma@example.com", phone: "+201333444555", propertyType: "Land", listingType: "Sale", city: "New Cairo", country: "Egypt", price: "8,000,000 EGP", status: "rejected", submittedAt: "2026-01-22 11:20" },
    { id: "5", ownerName: "Omar Khaled", email: "omar@example.com", phone: "+201777888999", propertyType: "Office", listingType: "Rent", city: "6th October", country: "Egypt", price: "15,000 EGP/month", status: "approved", submittedAt: "2026-01-24 14:00" },
  ]);

  const [newSection, setNewSection] = useState({ titleEn: "", titleAr: "", contentEn: "", contentAr: "" });
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const stats: DashboardStats = {
    totalSections: sections.length,
    activeSections: sections.filter(s => s.isActive).length,
    totalImages: images.length,
    totalSubmissions: submissions.length,
    pendingSubmissions: submissions.filter(s => s.status === 'pending').length,
    approvedSubmissions: submissions.filter(s => s.status === 'approved').length,
    rejectedSubmissions: submissions.filter(s => s.status === 'rejected').length,
    todaySubmissions: submissions.filter(s => s.submittedAt.startsWith('2026-01-24')).length,
    weeklyGrowth: 23.5,
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const addSection = () => {
    if (!newSection.titleEn.trim()) {
      toast({
        title: t("Error", "خطأ"),
        description: t("Please enter a section title", "الرجاء إدخال عنوان القسم"),
        variant: "destructive",
      });
      return;
    }

    const section: Section = {
      id: Date.now().toString(),
      title: { en: newSection.titleEn, ar: newSection.titleAr || newSection.titleEn },
      content: { en: newSection.contentEn, ar: newSection.contentAr || newSection.contentEn },
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setSections([...sections, section]);
    setNewSection({ titleEn: "", titleAr: "", contentEn: "", contentAr: "" });
    
    toast({
      title: t("Section Added", "تم إضافة القسم"),
      description: t("New section has been created successfully", "تم إنشاء القسم الجديد بنجاح"),
    });
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    toast({
      title: t("Section Deleted", "تم حذف القسم"),
      description: t("Section has been removed", "تم إزالة القسم"),
    });
  };

  const toggleSectionStatus = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive, updatedAt: new Date().toISOString().split('T')[0] } : s
    ));
  };

  const updateSection = () => {
    if (!editingSection) return;
    
    setSections(sections.map(s => 
      s.id === editingSection.id ? { ...editingSection, updatedAt: new Date().toISOString().split('T')[0] } : s
    ));
    setEditingSection(null);
    
    toast({
      title: t("Section Updated", "تم تحديث القسم"),
      description: t("Changes have been saved", "تم حفظ التغييرات"),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage: ContentImage = {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        section: "General",
        uploadedAt: new Date().toISOString().split('T')[0],
      };
      setImages([...images, newImage]);
      
      toast({
        title: t("Image Uploaded", "تم رفع الصورة"),
        description: t("Image has been added successfully", "تم إضافة الصورة بنجاح"),
      });
    }
  };

  const deleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    toast({
      title: t("Image Deleted", "تم حذف الصورة"),
      description: t("Image has been removed", "تم إزالة الصورة"),
    });
  };

  const updateSubmissionStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
    toast({
      title: t("Status Updated", "تم تحديث الحالة"),
      description: t("Submission status has been updated", "تم تحديث حالة الطلب"),
    });
  };

  const filteredSubmissions = submissions.filter(s => {
    if (submissionFilter !== 'all' && s.status !== submissionFilter) return false;
    if (searchQuery && !s.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !s.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t("Data Refreshed", "تم تحديث البيانات"),
        description: t("All data has been refreshed", "تم تحديث جميع البيانات"),
      });
    }, 1000);
  };

  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: t("Overview", "نظرة عامة") },
    { id: "submissions", icon: Building2, label: t("Properties", "العقارات"), badge: stats.pendingSubmissions },
    { id: "content", icon: FileText, label: t("Content", "المحتوى") },
    { id: "sections", icon: FolderPlus, label: t("Sections", "الأقسام") },
    { id: "images", icon: Image, label: t("Media", "الوسائط") },
    { id: "analytics", icon: BarChart3, label: t("Analytics", "التحليلات") },
    { id: "settings", icon: Settings, label: t("Settings", "الإعدادات") },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`}>
      <aside className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl transition-all duration-300 z-40 ${sidebarCollapsed ? 'w-16' : 'w-56'}`}>
        <div className="p-3 border-b border-slate-700 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">{t("Admin Panel", "لوحة الإدارة")}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8"
            data-testid="button-toggle-sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        <nav className="p-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
              data-testid={`button-tab-${item.id}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-slate-700">
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="w-full justify-start gap-2 text-slate-400 hover:text-white hover:bg-slate-700 text-sm h-9"
            data-testid="button-toggle-language"
          >
            <Globe className="w-4 h-4" />
            {!sidebarCollapsed && <span>{language === 'en' ? 'العربية' : 'English'}</span>}
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 text-sm h-9"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span>{t("Logout", "تسجيل الخروج")}</span>}
          </Button>
        </div>
      </aside>

      <main className={`transition-all duration-300 ${sidebarCollapsed ? (isRtl ? 'mr-16' : 'ml-16') : (isRtl ? 'mr-56' : 'ml-56')} p-4`}>
        <header className="flex items-center justify-between mb-4 bg-white rounded-lg shadow-sm p-3">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading} data-testid="button-refresh">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" size="sm" className="relative" data-testid="button-notifications">
              <Bell className="w-4 h-4" />
              {stats.pendingSubmissions > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {stats.pendingSubmissions}
                </span>
              )}
            </Button>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-xs">{t("Total Properties", "إجمالي العقارات")}</p>
                      <p className="text-2xl font-bold">{stats.totalSubmissions}</p>
                    </div>
                    <Building2 className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100 text-xs">{t("Pending", "قيد الانتظار")}</p>
                      <p className="text-2xl font-bold">{stats.pendingSubmissions}</p>
                    </div>
                    <Clock className="w-8 h-8 text-amber-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-xs">{t("Approved", "موافق عليه")}</p>
                      <p className="text-2xl font-bold">{stats.approvedSubmissions}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-xs">{t("Today", "اليوم")}</p>
                      <p className="text-2xl font-bold">{stats.todaySubmissions}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    {t("Recent Submissions", "الطلبات الأخيرة")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {submissions.slice(0, 4).map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Home className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-xs">{sub.ownerName}</p>
                            <p className="text-xs text-gray-500">{sub.propertyType} - {sub.city}</p>
                          </div>
                        </div>
                        <Badge variant={sub.status === 'approved' ? 'default' : sub.status === 'rejected' ? 'destructive' : 'secondary'} className="text-xs">
                          {sub.status === 'pending' ? t('Pending', 'قيد الانتظار') : 
                           sub.status === 'approved' ? t('Approved', 'موافق') : t('Rejected', 'مرفوض')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FolderPlus className="w-4 h-4" />
                    {t("Website Sections", "أقسام الموقع")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {sections.slice(0, 4).map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                        <div>
                          <p className="font-medium text-xs">{isRtl ? section.title.ar : section.title.en}</p>
                          <p className="text-xs text-gray-500">{t("Updated", "محدث")}: {section.updatedAt}</p>
                        </div>
                        <Switch
                          checked={section.isActive}
                          onCheckedChange={() => toggleSectionStatus(section.id)}
                          data-testid={`switch-section-${section.id}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  {t("Quick Stats", "إحصائيات سريعة")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-gray-800">{stats.totalSections}</p>
                    <p className="text-xs text-gray-500">{t("Sections", "الأقسام")}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-green-600">{stats.activeSections}</p>
                    <p className="text-xs text-gray-500">{t("Active", "نشط")}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-purple-600">{stats.totalImages}</p>
                    <p className="text-xs text-gray-500">{t("Images", "صور")}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-blue-600">+{stats.weeklyGrowth}%</p>
                    <p className="text-xs text-gray-500">{t("Growth", "النمو")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <CardTitle className="text-sm">{t("Property Submissions", "طلبات العقارات")}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder={t("Search...", "بحث...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-8 text-sm w-48"
                        data-testid="input-search"
                      />
                    </div>
                    <div className="flex gap-1">
                      {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
                        <Button
                          key={filter}
                          variant={submissionFilter === filter ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSubmissionFilter(filter)}
                          className="text-xs h-8"
                          data-testid={`button-filter-${filter}`}
                        >
                          {filter === 'all' ? t('All', 'الكل') :
                           filter === 'pending' ? t('Pending', 'قيد الانتظار') :
                           filter === 'approved' ? t('Approved', 'موافق') : t('Rejected', 'مرفوض')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium text-gray-600">{t("Owner", "المالك")}</th>
                        <th className="text-left p-2 font-medium text-gray-600">{t("Property", "العقار")}</th>
                        <th className="text-left p-2 font-medium text-gray-600">{t("Location", "الموقع")}</th>
                        <th className="text-left p-2 font-medium text-gray-600">{t("Price", "السعر")}</th>
                        <th className="text-left p-2 font-medium text-gray-600">{t("Status", "الحالة")}</th>
                        <th className="text-left p-2 font-medium text-gray-600">{t("Actions", "إجراءات")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <div>
                              <p className="font-medium text-xs">{sub.ownerName}</p>
                              <p className="text-xs text-gray-500">{sub.email}</p>
                            </div>
                          </td>
                          <td className="p-2">
                            <p className="text-xs">{sub.propertyType}</p>
                            <p className="text-xs text-gray-500">{sub.listingType}</p>
                          </td>
                          <td className="p-2 text-xs">{sub.city}, {sub.country}</td>
                          <td className="p-2 text-xs font-medium">{sub.price}</td>
                          <td className="p-2">
                            <Badge variant={sub.status === 'approved' ? 'default' : sub.status === 'rejected' ? 'destructive' : 'secondary'} className="text-xs">
                              {sub.status === 'pending' ? t('Pending', 'قيد الانتظار') : 
                               sub.status === 'approved' ? t('Approved', 'موافق') : t('Rejected', 'مرفوض')}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateSubmissionStatus(sub.id, 'approved')} data-testid={`button-approve-${sub.id}`}>
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => updateSubmissionStatus(sub.id, 'rejected')} data-testid={`button-reject-${sub.id}`}>
                                <XCircle className="w-3 h-3 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-4">
            {editingSection ? (
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">{t("Edit Section", "تعديل القسم")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">{t("Title (English)", "العنوان (إنجليزي)")}</Label>
                      <Input
                        value={editingSection.title.en}
                        onChange={(e) => setEditingSection({ ...editingSection, title: { ...editingSection.title, en: e.target.value } })}
                        className="h-8 text-sm"
                        data-testid="input-edit-title-en"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{t("Title (Arabic)", "العنوان (عربي)")}</Label>
                      <Input
                        value={editingSection.title.ar}
                        onChange={(e) => setEditingSection({ ...editingSection, title: { ...editingSection.title, ar: e.target.value } })}
                        className="h-8 text-sm"
                        data-testid="input-edit-title-ar"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">{t("Content (English)", "المحتوى (إنجليزي)")}</Label>
                      <Textarea
                        value={editingSection.content.en}
                        onChange={(e) => setEditingSection({ ...editingSection, content: { ...editingSection.content, en: e.target.value } })}
                        rows={3}
                        className="text-sm"
                        data-testid="input-edit-content-en"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">{t("Content (Arabic)", "المحتوى (عربي)")}</Label>
                      <Textarea
                        value={editingSection.content.ar}
                        onChange={(e) => setEditingSection({ ...editingSection, content: { ...editingSection.content, ar: e.target.value } })}
                        rows={3}
                        className="text-sm"
                        data-testid="input-edit-content-ar"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={updateSection} data-testid="button-save-changes">
                      <Save className="w-3 h-3 mr-1" />
                      {t("Save", "حفظ")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingSection(null)} data-testid="button-cancel-edit">
                      {t("Cancel", "إلغاء")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">{t("Manage Content", "إدارة المحتوى")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{isRtl ? section.title.ar : section.title.en}</p>
                            <Badge variant={section.isActive ? "default" : "secondary"} className="text-xs">
                              {section.isActive ? t("Active", "نشط") : t("Inactive", "غير نشط")}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{isRtl ? section.content.ar : section.content.en}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" onClick={() => setEditingSection(section)} data-testid={`button-edit-${section.id}`}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => toggleSectionStatus(section.id)} data-testid={`button-toggle-${section.id}`}>
                            {section.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteSection(section.id)} data-testid={`button-delete-${section.id}`}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "sections" && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">{t("Add New Section", "إضافة قسم جديد")}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">{t("Title (English)", "العنوان (إنجليزي)")} *</Label>
                    <Input
                      value={newSection.titleEn}
                      onChange={(e) => setNewSection({ ...newSection, titleEn: e.target.value })}
                      placeholder={t("Enter title", "أدخل العنوان")}
                      className="h-8 text-sm"
                      data-testid="input-new-title-en"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t("Title (Arabic)", "العنوان (عربي)")}</Label>
                    <Input
                      value={newSection.titleAr}
                      onChange={(e) => setNewSection({ ...newSection, titleAr: e.target.value })}
                      placeholder={t("Enter title", "أدخل العنوان")}
                      className="h-8 text-sm"
                      data-testid="input-new-title-ar"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">{t("Content (English)", "المحتوى (إنجليزي)")}</Label>
                    <Textarea
                      value={newSection.contentEn}
                      onChange={(e) => setNewSection({ ...newSection, contentEn: e.target.value })}
                      placeholder={t("Enter content", "أدخل المحتوى")}
                      rows={3}
                      className="text-sm"
                      data-testid="input-new-content-en"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">{t("Content (Arabic)", "المحتوى (عربي)")}</Label>
                    <Textarea
                      value={newSection.contentAr}
                      onChange={(e) => setNewSection({ ...newSection, contentAr: e.target.value })}
                      placeholder={t("Enter content", "أدخل المحتوى")}
                      rows={3}
                      className="text-sm"
                      data-testid="input-new-content-ar"
                    />
                  </div>
                </div>
                <Button size="sm" onClick={addSection} data-testid="button-add-section">
                  <Plus className="w-3 h-3 mr-1" />
                  {t("Add Section", "إضافة قسم")}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "images" && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{t("Media Library", "مكتبة الوسائط")}</CardTitle>
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-700">
                      <Plus className="w-3 h-3" />
                      {t("Upload", "رفع")}
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      data-testid="input-upload-image"
                    />
                  </Label>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="destructive" className="h-7" onClick={() => deleteImage(img.id)} data-testid={`button-delete-image-${img.id}`}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 truncate">{img.name}</p>
                      <p className="text-xs text-gray-400">{img.uploadedAt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">{t("Submissions by Type", "الطلبات حسب النوع")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    {['Apartment', 'Villa', 'Duplex', 'Land', 'Office'].map((type, idx) => {
                      const count = submissions.filter(s => s.propertyType === type).length;
                      const percentage = (count / submissions.length) * 100;
                      return (
                        <div key={type} className="flex items-center gap-2">
                          <span className="text-xs w-20">{type}</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">{t("Submissions by Status", "الطلبات حسب الحالة")}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-amber-50 rounded-lg">
                      <Clock className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-amber-600">{stats.pendingSubmissions}</p>
                      <p className="text-xs text-gray-500">{t("Pending", "قيد الانتظار")}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-green-600">{stats.approvedSubmissions}</p>
                      <p className="text-xs text-gray-500">{t("Approved", "موافق")}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
                      <p className="text-lg font-bold text-red-600">{stats.rejectedSubmissions}</p>
                      <p className="text-xs text-gray-500">{t("Rejected", "مرفوض")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">{t("Submissions by Location", "الطلبات حسب الموقع")}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['Cairo', 'Alexandria', 'Giza', 'New Cairo', '6th October'].map((city) => {
                    const count = submissions.filter(s => s.city === city).length;
                    return (
                      <div key={city} className="p-3 bg-gray-50 rounded-lg text-center">
                        <MapPin className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                        <p className="text-lg font-bold">{count}</p>
                        <p className="text-xs text-gray-500">{city}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">{t("General Settings", "الإعدادات العامة")}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{t("Notifications", "الإشعارات")}</p>
                    <p className="text-xs text-gray-500">{t("Receive email notifications", "استلام إشعارات البريد")}</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-notifications" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{t("Auto-approve", "الموافقة التلقائية")}</p>
                    <p className="text-xs text-gray-500">{t("Auto-approve new submissions", "الموافقة تلقائياً على الطلبات")}</p>
                  </div>
                  <Switch data-testid="switch-auto-approve" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{t("Dark Mode", "الوضع الداكن")}</p>
                    <p className="text-xs text-gray-500">{t("Enable dark theme", "تفعيل السمة الداكنة")}</p>
                  </div>
                  <Switch data-testid="switch-dark-mode" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">{t("Export Data", "تصدير البيانات")}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" data-testid="button-export-csv">
                    <Download className="w-3 h-3 mr-1" />
                    {t("Export CSV", "تصدير CSV")}
                  </Button>
                  <Button size="sm" variant="outline" data-testid="button-export-pdf">
                    <Download className="w-3 h-3 mr-1" />
                    {t("Export PDF", "تصدير PDF")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <LanguageProvider>
      <DashboardContent />
    </LanguageProvider>
  );
};

export default AdminDashboard;
