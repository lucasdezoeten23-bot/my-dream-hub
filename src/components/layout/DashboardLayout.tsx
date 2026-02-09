import Sidebar from './Sidebar';
import ChatBubble from '@/components/chat/ChatBubble';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <ChatBubble />
    </div>
  );
};

export default DashboardLayout;
