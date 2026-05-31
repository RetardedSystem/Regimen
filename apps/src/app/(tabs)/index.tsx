import KanbanColumn from "@/components/KanbanColumn";
import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import background from "@/constants/Backgrounds";

export default function Index() {
  return (
    <ScreenBackground
      image={background.homeBg}
    >
      <Profile />
      <KanbanColumn title="todo" />
      <KanbanColumn title="in_progress" />
      <KanbanColumn title="done" />
      <KanbanColumn title="missed" />
    </ScreenBackground>
  );
}
