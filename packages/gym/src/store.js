import createStore from 'react-waterfall';
import workoutPlan from './workout-plan';
import { matchVideoName } from './matchers';

export const sendMessageToSw = (type, payload) => {
  'serviceWorker' in navigator &&
    navigator.serviceWorker.controller !== null &&
    navigator.serviceWorker.controller.postMessage({ type, ...payload });
};

const allExercises = workoutPlan.reduce(
  (acc, session) => [
    ...acc,
    ...session.sections.reduce(
      (acc, section) => [
        ...acc,
        ...section.exercises.map(exercise =>
          matchVideoName(session.name, section.name, exercise.name)
        ),
      ],
      []
    ),
  ],
  []
);

const uniqueExercises = allExercises.reduce(
  (acc, val) => (acc.includes(val) ? acc : [...acc, val]),
  []
);

console.log(uniqueExercises);

sendMessageToSw('cacheAll', {
  urls: uniqueExercises.map(
    name =>
      `https://storage.googleapis.com/workout-63a97.appspot.com/${name}.m4v`
  ),
});

// Get a reference to the storage service, which is used to create references in your storage bucket

export const { Provider, connect, actions } = createStore({
  initialState: { workoutPlan },
  actionsCreators: {},
});
