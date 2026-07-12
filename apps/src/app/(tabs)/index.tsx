import Journey from "@/components/Journey";
import Profile from "@/components/Profile";
import ScreenBackground from "@/components/ScreenBackground";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { getCurrentDateInfo } from "@/constants/Date";
import { useState } from "react";

export default function Index() {
  const [date, setDate] = useState(getCurrentDateInfo());
  const currentDate = getCurrentDateInfo();
  return (
    <ScreenBackground title="home">
      <Profile />
      <Journey currentDate={currentDate} />
      <KanbanBoard />
    </ScreenBackground>
  );
}
