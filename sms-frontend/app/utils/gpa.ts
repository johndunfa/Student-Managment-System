export const calculateGPA = (results: any[]) => {
  if (!results || results.length === 0) return 0;

  let totalPoints = 0;

  results.forEach((r) => {
    totalPoints += r.point;
  });

  return (totalPoints / results.length).toFixed(2);
};
