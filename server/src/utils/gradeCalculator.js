const calculateGrade = (score) => {
  let grade = "";
  let point = 0;

  if (score >= 90 && score <= 100) {
    grade = "A+";
    point = 4.0;
  } else if (score >= 85 && score <= 89) {
    grade = "A";
    point = 4.0;
  } else if (score >= 80 && score <= 84) {
    grade = "A-";
    point = 3.79;
  } else if (score >= 75 && score <= 79) {
    grade = "B+";
    point = 3.5;
  } else if (score >= 70 && score <= 74) {
    grade = "B";
    point = 3.0;
  } else if (score >= 65 && score <= 69) {
    grade = "B-";
    point = 2.79;
  } else if (score >= 60 && score <= 64) {
    grade = "C+";
    point = 2.5;
  } else if (score >= 55 && score <= 59) {
    grade = "C";
    point = 2.0;
  } else if (score >= 50 && score <= 54) {
    grade = "C-";
    point = 1.79;
  } else {
    grade = "F";
    point = 0.0;
  }

  return { grade, point };
};

module.exports = calculateGrade;