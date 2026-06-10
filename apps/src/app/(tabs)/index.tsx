import Calender from "@/components/Calender";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";

export default function Index() {
  return (
    <ScreenBackground title="home">
      <Profile />
      <Calender />
      <KanbanBoard />
    </ScreenBackground>
  );
}
