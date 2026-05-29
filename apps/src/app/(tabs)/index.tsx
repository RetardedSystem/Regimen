import ScreenBackground from "@/components/ScreenBackground";
import Profile from "@/components/Profile";
import KanbanColumn from "@/components/KanbanColumn";

export default function Index() {
  return (
    <ScreenBackground
      image={require("../../../assets/Backgrounds/Home_bg.png")}
    >
      <Profile />
      <KanbanColumn title="todo" />
      <KanbanColumn title="in_progress" />
      <KanbanColumn title="done" />
    </ScreenBackground>
  );
}
