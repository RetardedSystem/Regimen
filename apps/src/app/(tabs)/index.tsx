<<<<<<< HEAD
import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import Calender from "@/components/Calender";

export default function Index() {
  return (
    <ScreenBackground title="home">
=======
import Calender from "@/components/Calender";
import KanbanBoard from "@/components/KanbanBoard";
import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import {background} from "@/constants/Images";

export default function Index() {
  return (
    <ScreenBackground image={background.homeBg}>
>>>>>>> main
      <Profile />
      <Calender />
      <KanbanBoard />
    </ScreenBackground>
  );
}
