import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Settings,
  Globe,
} from "lucide-react";

interface Section {
  id: string;
  title: { en: string; ar: string };
  content: { en: string; ar: string };
  isActive: boolean;
}

interface ContentImage {
  id: string;
  name: string;
  url: string;
  section: string;
}

const DashboardContent = () => {
  const { t, isRtl, toggleLanguage, language } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [sections, setSections] = useState<Section[]>([
    { id: "1", title: { en: "Hero Section", ar: "القسم الرئيسي" }, content: { en: "Welcome to our platform", ar: "مرحباً بكم في منصتنا" }, isActive: true },
    { id: "2", title: { en: "Services", ar: "الخدمات" }, content: { en: "Our professional services", ar: "خدماتنا المهنية" }, isActive: true },
    { id: "3", title: { en: "About Us", ar: "من نحن" }, content: { en: "About our company", ar: "عن شركتنا" }, isActive: false },
  ]);
  
  const [images, setImages] = useState<ContentImage[]>([
    { id: "1", name: "hero-banner.jpg", url: "/placeholder-1.jpg", section: "Hero" },
    { id: "2", name: "service-1.png", url: "/placeholder-2.jpg", section: "Services" },
  ]);

  const [newSection, setNewSection] = useState({ titleEn: "", titleAr: "", contentEn: "", contentAr: "" });
  const [editingSection, setEditingSection] = useState<Section | null>(null);

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
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const updateSection = () => {
    if (!editingSection) return;
    
    setSections(sections.map(s => 
      s.id === editingSection.id ? editingSection : s
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

  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: t("Overview", "نظرة عامة") },
    { id: "content", icon: FileText, label: t("Content", "المحتوى") },
    { id: "images", icon: Image, label: t("Images", "الصور") },
    { id: "sections", icon: FolderPlus, label: t("Sections", "الأقسام") },
    { id: "settings", icon: Settings, label: t("Settings", "الإعدادات") },
  ];

  return (
    <div className={`min-h-screen bg-gray-100 ${isRtl ? 'rtl' : 'ltr'}`}>
      <aside className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-full bg-white shadow-lg transition-all duration-300 z-40 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-gray-800">
              {t("Dashboard", "لوحة التحكم")}
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-testid="button-toggle-sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              data-testid={`button-tab-${item.id}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="w-full justify-start gap-3 mb-2"
            data-testid="button-toggle-language"
          >
            <Globe className="w-5 h-5" />
            {sidebarOpen && <span>{language === 'en' ? 'العربية' : 'English'}</span>}
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            data-testid="button-logout"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>{t("Logout", "تسجيل الخروج")}</span>}
          </Button>
        </div>
      </aside>

      <main className={`transition-all duration-300 ${sidebarOpen ? (isRtl ? 'mr-64' : 'ml-64') : (isRtl ? 'mr-20' : 'ml-20')} p-6`}>
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("Dashboard Overview", "نظرة عامة على لوحة التحكم")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{t("Total Sections", "إجمالي الأقسام")}</p>
                      <p className="text-3xl font-bold text-gray-800">{sections.length}</p>
                    </div>
                    <FolderPlus className="w-12 h-12 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{t("Active Sections", "الأقسام النشطة")}</p>
                      <p className="text-3xl font-bold text-green-600">{sections.filter(s => s.isActive).length}</p>
                    </div>
                    <Eye className="w-12 h-12 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{t("Total Images", "إجمالي الصور")}</p>
                      <p className="text-3xl font-bold text-purple-600">{images.length}</p>
                    </div>
                    <Image className="w-12 h-12 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("Recent Sections", "الأقسام الأخيرة")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sections.slice(0, 5).map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{isRtl ? section.title.ar : section.title.en}</p>
                        <p className="text-sm text-gray-500">{isRtl ? section.content.ar : section.content.en}</p>
                      </div>
                      <Badge variant={section.isActive ? "default" : "secondary"}>
                        {section.isActive ? t("Active", "نشط") : t("Inactive", "غير نشط")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("Manage Content", "إدارة المحتوى")}</h2>
            
            {editingSection ? (
              <Card>
                <CardHeader>
                  <CardTitle>{t("Edit Section", "تعديل القسم")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t("Title (English)", "العنوان (إنجليزي)")}</Label>
                      <Input
                        value={editingSection.title.en}
                        onChange={(e) => setEditingSection({ ...editingSection, title: { ...editingSection.title, en: e.target.value } })}
                        data-testid="input-edit-title-en"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("Title (Arabic)", "العنوان (عربي)")}</Label>
                      <Input
                        value={editingSection.title.ar}
                        onChange={(e) => setEditingSection({ ...editingSection, title: { ...editingSection.title, ar: e.target.value } })}
                        data-testid="input-edit-title-ar"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t("Content (English)", "المحتوى (إنجليزي)")}</Label>
                      <Textarea
                        value={editingSection.content.en}
                        onChange={(e) => setEditingSection({ ...editingSection, content: { ...editingSection.content, en: e.target.value } })}
                        rows={4}
                        data-testid="input-edit-content-en"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("Content (Arabic)", "المحتوى (عربي)")}</Label>
                      <Textarea
                        value={editingSection.content.ar}
                        onChange={(e) => setEditingSection({ ...editingSection, content: { ...editingSection.content, ar: e.target.value } })}
                        rows={4}
                        data-testid="input-edit-content-ar"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={updateSection} data-testid="button-save-changes">
                      <Save className="w-4 h-4 mr-2" />
                      {t("Save Changes", "حفظ التغييرات")}
                    </Button>
                    <Button variant="outline" onClick={() => setEditingSection(null)} data-testid="button-cancel-edit">
                      {t("Cancel", "إلغاء")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {sections.map((section) => (
                      <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{isRtl ? section.title.ar : section.title.en}</h3>
                            <Badge variant={section.isActive ? "default" : "secondary"}>
                              {section.isActive ? t("Active", "نشط") : t("Inactive", "غير نشط")}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{isRtl ? section.content.ar : section.content.en}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => setEditingSection(section)} data-testid={`button-edit-section-${section.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => toggleSectionStatus(section.id)} data-testid={`button-toggle-section-${section.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-red-600" onClick={() => deleteSection(section.id)} data-testid={`button-delete-section-${section.id}`}>
                            <Trash2 className="w-4 h-4" />
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

        {activeTab === "images" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("Manage Images", "إدارة الصور")}</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("Upload New Image", "رفع صورة جديدة")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Image className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      {t("Click to upload", "انقر للرفع")}
                    </span>
                    <span className="text-gray-500"> {t("or drag and drop", "أو اسحب وأفلت")}</span>
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    data-testid="input-image-upload"
                  />
                  <p className="text-sm text-gray-400 mt-2">PNG, JPG, GIF {t("up to 10MB", "حتى 10 ميجابايت")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("Image Gallery", "معرض الصور")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white"
                          onClick={() => deleteImage(image.id)}
                          data-testid={`button-delete-image-${image.id}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 truncate">{image.name}</p>
                      <Badge variant="secondary" className="text-xs">{image.section}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "sections" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("Add New Section", "إضافة قسم جديد")}</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("Section Details", "تفاصيل القسم")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("Title (English)", "العنوان (إنجليزي)")}</Label>
                    <Input
                      value={newSection.titleEn}
                      onChange={(e) => setNewSection({ ...newSection, titleEn: e.target.value })}
                      placeholder={t("Enter section title", "أدخل عنوان القسم")}
                      data-testid="input-new-section-title-en"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("Title (Arabic)", "العنوان (عربي)")}</Label>
                    <Input
                      value={newSection.titleAr}
                      onChange={(e) => setNewSection({ ...newSection, titleAr: e.target.value })}
                      placeholder={t("Enter section title in Arabic", "أدخل عنوان القسم بالعربي")}
                      data-testid="input-new-section-title-ar"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t("Content (English)", "المحتوى (إنجليزي)")}</Label>
                    <Textarea
                      value={newSection.contentEn}
                      onChange={(e) => setNewSection({ ...newSection, contentEn: e.target.value })}
                      placeholder={t("Enter section content", "أدخل محتوى القسم")}
                      rows={4}
                      data-testid="input-new-section-content-en"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("Content (Arabic)", "المحتوى (عربي)")}</Label>
                    <Textarea
                      value={newSection.contentAr}
                      onChange={(e) => setNewSection({ ...newSection, contentAr: e.target.value })}
                      placeholder={t("Enter section content in Arabic", "أدخل محتوى القسم بالعربي")}
                      rows={4}
                      data-testid="input-new-section-content-ar"
                    />
                  </div>
                </div>
                <Button onClick={addSection} className="w-full md:w-auto" data-testid="button-add-section">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("Add Section", "إضافة القسم")}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("Settings", "الإعدادات")}</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("General Settings", "الإعدادات العامة")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("Site Name", "اسم الموقع")}</Label>
                  <Input placeholder={t("Enter site name", "أدخل اسم الموقع")} data-testid="input-site-name" />
                </div>
                <div className="space-y-2">
                  <Label>{t("Site Description", "وصف الموقع")}</Label>
                  <Textarea placeholder={t("Enter site description", "أدخل وصف الموقع")} rows={3} data-testid="input-site-description" />
                </div>
                <Button data-testid="button-save-settings">
                  <Save className="w-4 h-4 mr-2" />
                  {t("Save Settings", "حفظ الإعدادات")}
                </Button>
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
