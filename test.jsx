import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import GettingStarted from '@/pages/GettingStarted';
import Playground from '@/pages/Playground';
import RestAPI from '@/pages/RestAPI';
import Queries from '@/pages/Queries';
import Mutations from '@/pages/Mutations';
import Types from '@/pages/Types';
import Auth from '@/pages/Auth';
import Examples from '@/pages/Examples';
import SDKs from '@/pages/SDKs';
import CORS from '@/pages/CORS';
import Projects from '@/pages/Projects';
import People from '@/pages/People';
import Scenarios from '@/pages/Scenarios';
import AssignmentRoles from '@/pages/AssignmentRoles';
import SkillCategories from '@/pages/SkillCategories';
import Skills from '@/pages/Skills';
import Divisions from '@/pages/Divisions';
import Regions from '@/pages/Regions';
import Assessments from '@/pages/Assessments';
import AssessmentTemplates from '@/pages/AssessmentTemplates';
import StaffingTemplates from '@/pages/StaffingTemplates';
import Tags from '@/pages/Tags';
import Assignments from '@/pages/Assignments';
import AccountUsers from '@/pages/AccountUsers';
import AccountPermissionsGroups from '@/pages/AccountPermissionsGroups';
import AccountSettings from '@/pages/AccountSettings';
import Fragments from '@/pages/Fragments';
// import SearchPage from '@/pages/Search';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/rest-api" element={<RestAPI />} />
          <Route path="/queries" element={<Queries />} />
          <Route path="/mutations" element={<Mutations />} />
          <Route path="/types" element={<Types />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/sdks" element={<SDKs />} />
          <Route path="/cors" element={<CORS />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/people" element={<People />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/assignment-roles" element={<AssignmentRoles />} />
          <Route path="/skill-categories" element={<SkillCategories />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessment-templates" element={<AssessmentTemplates />} />
          <Route path="/staffing-templates" element={<StaffingTemplates />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/account-users" element={<AccountUsers />} />
          <Route path="/account-permissions-groups" element={<AccountPermissionsGroups />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/fragments" element={<Fragments />} />
          {/* <Route path="/search" element={<SearchPage />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;