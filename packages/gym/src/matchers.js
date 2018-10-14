export const matchSession = (workoutPlan, activeSession) =>
  workoutPlan.find(({ name }) => name === activeSession);

export const matchSection = (session, activeSection) =>
  session.find(({ name }) => name === activeSection);

export const matchVideoName = (sessionName, sectionName, exerciseName) =>
  `${
    sectionName === 'strength' ||
    (sectionName === 'stretch' && sessionName !== 'leg')
      ? `${sectionName}--${sessionName}`
      : sectionName
  }--${exerciseName}`;
