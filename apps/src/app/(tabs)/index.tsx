import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import Calender from "@/components/Calender";

export default function Index() {
  return (
    <ScreenBackground title="home">
    <ScreenBackground title="home">
      <Profile />
      <Calender />
      <KanbanBoard />
    </ScreenBackground>
  );
}
