import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../../App/AppLayout';
import Monsters from '../../Components/Monsters/Monsters';
import MonsterPage from '../../Components/MonsterPage/MonsterPage';
import InitiativeMain from '../Initiative/InitiativeMain';
import { EncounterPage } from '../Encounter/EncounterPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, 
    children: [
      { index: true, element: <Monsters /> }, 
      { path: 'monsters/:index', element: <MonsterPage /> },
      { path: 'initiative', element: <InitiativeMain /> },
      { path: 'randomEncounter', element: <EncounterPage/> },
      
    ],
  },
]);