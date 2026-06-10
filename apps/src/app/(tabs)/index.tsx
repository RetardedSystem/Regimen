import Calender from "@/components/Calender";
import KanbanBoard from "@/components/KanbanBoard";
import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import {background} from "@/constants/Images";

export default function Index() {
  return (
    <ScreenBackground image={background.homeBg}>
      <Profile />
      <Calender />
      <KanbanBoard />
    </ScreenBackground>
  );
}
