
import { TagProvider } from "@/contexts/TagContext";
import { UserProvider } from "@/contexts/UserContext";
import TagDashboard from "@/components/tag/TagDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <UserProvider>
        <TagProvider>
          <TagDashboard />
        </TagProvider>
      </UserProvider>
    </div>
  );
};

export default Index;
