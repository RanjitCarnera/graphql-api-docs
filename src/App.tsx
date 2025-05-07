
import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages
import Index from './pages/Index';
import GettingStarted from './pages/GettingStarted';
import Queries from './pages/Queries';
import Mutations from './pages/Mutations';
import Fragments from './pages/Fragments';
import Types from './pages/Types';
import Auth from './pages/Auth';
import CORS from './pages/CORS';
import Examples from './pages/Examples';
import SDKs from './pages/SDKs';
import NotFound from './pages/NotFound';
import Playground from './pages/Playground';
import People from './pages/People';
import Projects from './pages/Projects';
import Scenarios from './pages/Scenarios';
import AssignmentRoles from './pages/AssignmentRoles';
import SkillCategories from './pages/SkillCategories';
import Skills from './pages/Skills';
import Divisions from './pages/Divisions';
import Regions from './pages/Regions';
import Assessments from './pages/Assessments';
import AssessmentTemplates from './pages/AssessmentTemplates';
import StaffingTemplates from './pages/StaffingTemplates';
import Tags from './pages/Tags';
import Assignments from './pages/Assignments';
import AccountUsers from './pages/AccountUsers';
import AccountPermissionsGroups from './pages/AccountPermissionsGroups';
import AccountSettings from './pages/AccountSettings';
import SkillAssessment from './pages/SkillAssessment';

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />
  },
  {
    path: "/getting-started",
    element: <GettingStarted />
  },
  {
    path: "/queries",
    element: <Queries />
  },
  {
    path: "/mutations",
    element: <Mutations />
  },
  {
    path: "/fragments",
    element: <Fragments />
  },
  {
    path: "/types",
    element: <Types />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/cors",
    element: <CORS />
  },
  {
    path: "/examples",
    element: <Examples />
  },
  {
    path: "/sdks",
    element: <SDKs />
  },
  {
    path: "/playground",
    element: <Playground />
  },
  {
    path: "/people",
    element: <People />
  },
  {
    path: "/projects",
    element: <Projects />
  },
  {
    path: "/scenarios",
    element: <Scenarios />
  },
  {
    path: "/assignment-roles",
    element: <AssignmentRoles />
  },
  {
    path: "/skill-categories",
    element: <SkillCategories />
  },
  {
    path: "/skills",
    element: <Skills />
  },
  {
    path: "/skills-assessment",
    element: <SkillAssessment />
  },
  {
    path: "/divisions",
    element: <Divisions />
  },
  {
    path: "/regions",
    element: <Regions />
  },
  {
    path: "/assessments",
    element: <Assessments />
  },
  {
    path: "/assessment-templates",
    element: <AssessmentTemplates />
  },
  {
    path: "/staffing-templates",
    element: <StaffingTemplates />
  },
  {
    path: "/tags",
    element: <Tags />
  },
  {
    path: "/assignments",
    element: <Assignments />
  },
  {
    path: "/account-users",
    element: <AccountUsers />
  },
  {
    path: "/account-permissions-groups",
    element: <AccountPermissionsGroups />
  },
  {
    path: "/account-settings",
    element: <AccountSettings />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
