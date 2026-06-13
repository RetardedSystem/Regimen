export const getCurrentDateInfo = () => {
  const today = new Date();

  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    today,
    startOfWeek,
    endOfWeek,
  };
};
