import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const MainLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            Agba Tapper Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default MainLayout;
