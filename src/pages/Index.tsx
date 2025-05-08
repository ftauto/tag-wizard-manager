
import { TagProvider } from "@/contexts/TagContext";
import TagDashboard from "@/components/tag/TagDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TagProvider>
        <TagDashboard />
      </TagProvider>
    </div>
  );
};

export default Index;
