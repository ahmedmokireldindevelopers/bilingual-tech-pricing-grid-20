import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, User, LogIn, Shield } from "lucide-react";

const LoginContent = () => {
  const { t, isRtl } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast({
          title: t("Login Successful", "تم تسجيل الدخول بنجاح"),
          description: t("Welcome to the admin dashboard", "مرحباً بك في لوحة التحكم"),
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: t("Login Failed", "فشل تسجيل الدخول"),
          description: t("Invalid username or password", "اسم المستخدم أو كلمة المرور غير صحيحة"),
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
      </div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {t("Admin Login", "تسجيل دخول المدير")}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {t("Enter your credentials to access the dashboard", "أدخل بيانات الاعتماد للوصول إلى لوحة التحكم")}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                {t("Username", "اسم المستخدم")}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("Enter username", "أدخل اسم المستخدم")}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  data-testid="input-username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                {t("Password", "كلمة المرور")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("Enter password", "أدخل كلمة المرور")}
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  data-testid="input-password"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("Logging in...", "جاري تسجيل الدخول...")}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  {t("Login", "تسجيل الدخول")}
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              {t("Demo credentials:", "بيانات تجريبية:")}
              <br />
              <span className="font-mono text-blue-600">admin / admin123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <LanguageProvider>
      <LoginContent />
    </LanguageProvider>
  );
};

export default AdminLogin;
