import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import KanbanBoard from "@/components/KanbanBoard";
import background from "@/constants/Backgrounds";
import Calender from "@/components/Calender";

export default function Index() {
  return (
    <ScreenBackground image={background.homeBg}>
      <Profile />
      <Calender />
      <KanbanBoard />
    </ScreenBackground>
  );
}
