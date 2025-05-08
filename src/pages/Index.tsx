
import { TagProvider } from "@/contexts/TagContext";
import { UserProvider } from "@/contexts/UserContext";
import { ActivityProvider } from "@/contexts/ActivityContext";
import TagDashboard from "@/components/tag/TagDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ActivityProvider>
        <UserProvider>
          <TagProvider>
            <TagDashboard />
          </TagProvider>
        </UserProvider>
      </ActivityProvider>
    </div>
  );
};

export default Index;
