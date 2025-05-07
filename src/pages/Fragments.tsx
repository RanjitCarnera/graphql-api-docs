
import React, { useEffect } from 'react';
import DocsLayout from '../components/DocsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Fragments = () => {
  const { toast } = useToast();
  
  const handleCopyToClipboard = (fragmentId: string, fragmentName: string) => {
    const fragmentUrl = `${window.location.origin}/fragments#${fragmentId}`;
    navigator.clipboard.writeText(fragmentUrl);
    toast({
      title: "Link copied!",
      description: `Direct link to ${fragmentName} has been copied to clipboard.`,
      duration: 2000,
    });
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <DocsLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GraphQL Fragments</h1>
        
        <p className="mb-8 text-gray-600">
          Fragments are reusable units in GraphQL that let you build sets of fields, and then include them in queries where you need to. 
          Below are all the fragments available in our API.
        </p>

        <div className="space-y-8">
          {/* Assignment Fragments */}
          <section id="assignmentCard" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentCard_AssignmentFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentCard', 'Assignment Card Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentCard_AssignmentFragment on Assignment {
  id
  comment
  person {
    name
    assignmentRole {
      id
    }
    ...personDetailsButton_PersonFragment
  }
  project {
    id
    ...EditAssignmentButton_ProjectFragment
  }
  startDate
  endDate
  validAssignmentRoles {
    id
    name
  }
  isExecutive
  ...EditAssignmentButton_AssignmentFragment
  ...EmptyAssignmentButton_AssignmentFragment
  ...DeleteAssignmentButton_AssignmentFragment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Assignment</p>
                  <p><strong>Description:</strong> Comprehensive fragment for assignment details including person and project information.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="assignmentProjectCard" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentProjectCard_AssignmentFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentProjectCard', 'Assignment Project Card Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentProjectCard_AssignmentFragment on Assignment {
  id
  project {
    name
    id
    isDeactivated
  }
  person {
    name
  }
  startDate
  endDate
  validAssignmentRoles {
    id
    name
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Assignment</p>
                  <p><strong>Description:</strong> Fragment for assignment project card details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="assignmentRoleSelect" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentRoleSelect_AssignmentRoleFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentRoleSelect', 'Assignment Role Select Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentRoleSelect_AssignmentRoleFragment on AssignmentRole @inline {
  id
  name
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> AssignmentRole</p>
                  <p><strong>Description:</strong> Fragment for assignment role selection components.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="assignmentRoleSortOrderButtons" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentRoleSortOrderButtons_AssignmentRoleFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentRoleSortOrderButtons', 'Assignment Role Sort Order Buttons Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentRoleSortOrderButtons_AssignmentRoleFragment on AssignmentRole {
  id
  sortOrder
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> AssignmentRole</p>
                  <p><strong>Description:</strong> Fragment for assignment role sort order buttons.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="assignmentRolesSelect" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentRolesSelect_AssignmentRoleFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentRolesSelect', 'Assignment Roles Select Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentRolesSelect_AssignmentRoleFragment on AssignmentRole @inline {
  id
  name
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> AssignmentRole</p>
                  <p><strong>Description:</strong> Fragment for assignment roles selection components.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="assignmentsInProjectListScenario" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentsInProjectList_ScenarioFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentsInProjectListScenario', 'Assignments In Project List Scenario Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentsInProjectList_ScenarioFragment on Scenario {
  id
  ...AssignmentCard_ScenarioFragment
  ...CheckScenarioPermissions_ScenarioFragment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Scenario</p>
                  <p><strong>Description:</strong> Fragment for assignments in project list within a scenario.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="assignmentsInProjectListProject" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>AssignmentsInProjectList_ProjectFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('assignmentsInProjectListProject', 'Assignments In Project List Project Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment AssignmentsInProjectList_ProjectFragment on ProjectInScenario {
  id
  project {
    ...CreateAssignmentButton_ProjectFragment
    ...CreateAssignmentsFromTemplateButton_ProjectFragment
  }
  assignments {
    __id
    edges {
      node {
        id
        endDate
        ...AssignmentCard_AssignmentFragment
        validAssignmentRoles {
          sortOrder
        }
      }
    }
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> ProjectInScenario</p>
                  <p><strong>Description:</strong> Fragment for assignments in project list details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="editAssignmentButtonAssignment" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>EditAssignmentButton_AssignmentFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('editAssignmentButtonAssignment', 'Edit Assignment Button Assignment Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment EditAssignmentButton_AssignmentFragment on Assignment {
  id
  startDate
  endDate
  person {
    id
  }
  validAssignmentRoles {
    id
  }
  importId
  isExecutive
  comment
  weight
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Assignment</p>
                  <p><strong>Description:</strong> Fragment for editing assignment details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="emptyAssignmentButtonAssignment" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>EmptyAssignmentButton_AssignmentFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('emptyAssignmentButtonAssignment', 'Empty Assignment Button Assignment Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment EmptyAssignmentButton_AssignmentFragment on Assignment {
  id
  validAssignmentRoles {
    name
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Assignment</p>
                  <p><strong>Description:</strong> Fragment for emptying assignment details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="deleteAssignmentButtonAssignment" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>DeleteAssignmentButton_AssignmentFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('deleteAssignmentButtonAssignment', 'Delete Assignment Button Assignment Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment DeleteAssignmentButton_AssignmentFragment on Assignment {
  id
  validAssignmentRoles {
    name
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Assignment</p>
                  <p><strong>Description:</strong> Fragment for deleting assignment details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="editAssignmentRoleButtonAssignmentRole" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>editAssignmentRoleButton_AssignmentRoleFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('editAssignmentRoleButtonAssignmentRole', 'Edit Assignment Role Button Assignment Role Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment editAssignmentRoleButton_AssignmentRoleFragment on AssignmentRole {
  id
  name
  sortOrder
  maxNumberOfProjects
  utilizationProjectionCapInMonths
  countAsFullyAllocatedAtPercentage
  countAsOverallocatedAtPercentage
  useEndDateOfLastAssignmentOverProjectionCap
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> AssignmentRole</p>
                  <p><strong>Description:</strong> Contains fields for assignment role details including allocation percentages and utilization settings.</p>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Person Fragments */}
          <section id="executivesSelectPerson" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>executivesSelect_PersonFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('executivesSelectPerson', 'Executives Select Person Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment executivesSelect_PersonFragment on Person @inline {
  id
  name
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Person</p>
                  <p><strong>Description:</strong> Contains basic person identification fields with the inline directive.</p>
                </div>
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Used In:</strong> This fragment is used in the <a href="/queries#executives-query-example" className="text-blue-600 hover:underline">executivesSelect_Query</a> to fetch executive persons with their basic info.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personCardDraggableScenario" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personCardDraggable_ScenarioFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personCardDraggableScenario', 'Person Card Draggable Scenario Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personCardDraggable_ScenarioFragment on Scenario {
  id
  utilization {
    personUtilizations {
      personRef
      status
    }
    ...personCard_ScenarioUtilizationFragment
  }
  ...personCard_ScenarioFragment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Scenario</p>
                  <p><strong>Description:</strong> Fragment for draggable person card within a scenario.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personCardDraggablePerson" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personCardDraggable_PersonFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personCardDraggablePerson', 'Person Card Draggable Person Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personCardDraggable_PersonFragment on Person
@argumentDefinitions(scenarioId: { type: "ID!" }) {
  id
  name
  assignmentRole {
    id
    name
  }
  ...personCard_PersonFragment @arguments(scenarioId: $scenarioId)
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Person</p>
                  <p><strong>Description:</strong> Fragment for draggable person card details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personCardScenario" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personCard_ScenarioFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personCardScenario', 'Person Card Scenario Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personCard_ScenarioFragment on Scenario {
  id
  ...personDetailsButton_ScenarioFragment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Scenario</p>
                  <p><strong>Description:</strong> Fragment for person card within a scenario.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personCardPerson" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personCard_PersonFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personCardPerson', 'Person Card Person Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personCard_PersonFragment on Person @argumentDefinitions(scenarioId: { type: "ID!" }) {
  id
  name
  assignmentRole {
    id
    name
  }
  sumOfProjectVolume(scenarioRef: $scenarioId)
  comment
  ...personDetailsButton_PersonFragment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Person</p>
                  <p><strong>Description:</strong> Fragment for person card details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personCardScenarioUtilization" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personCard_ScenarioUtilizationFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personCardScenarioUtilization', 'Person Card Scenario Utilization Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personCard_ScenarioUtilizationFragment on ScenarioUtilization {
  personUtilizations {
    personRef
    utilizationPercentage
    status
  }
  ...personDetailsButton_ScenarioUtilizationFragment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> ScenarioUtilization</p>
                  <p><strong>Description:</strong> Fragment for person card scenario utilization details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="skillsDisplayPerson" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>skillsDisplay_PersonFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('skillsDisplayPerson', 'Skills Display Person Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment skillsDisplay_PersonFragment on Person {
  id
  skills(first: 100) {
    edges {
      node {
        ...skillsDisplay_SkillAssociationInlineFragment
      }
    }
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Person</p>
                  <p><strong>Description:</strong> Fragment for displaying skills of a person.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="skillsDisplaySkillAssociationInline" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>skillsDisplay_SkillAssociationInlineFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('skillsDisplaySkillAssociationInline', 'Skills Display Skill Association Inline Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment skillsDisplay_SkillAssociationInlineFragment on SkillAssociation @inline {
  id
  data {
    value {
      ... on NumericalAssessmentValue {
        kind
        number
      }
      ... on BinaryAssessmentValue {
        hasSkill
        kind
      }
    }
    skill {
      id
      name
      dimension {
        kind
        ... on NumericalDimension {
          kind
          dimensionCount
        }
      }
      skillCategory {
        id
        name
      }
    }
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> SkillAssociation</p>
                  <p><strong>Description:</strong> Fragment for displaying skill association details.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personDetailsControlPerson" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personDetailsControl_PersonFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personDetailsControlPerson', 'Person Details Control Person Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personDetailsControl_PersonFragment on Person
@argumentDefinitions(scenarioId: { type: "ID!" }) {
  id
  name
  assignmentRole {
    name
  }
  phone
  email
  address {
    lineOne
    postalCode
    city
    country
    state
    latitude
    longitude
  }
  comment
  avatar {
    url
  }
  associatedWithRegions {
    id
    name
  }
  associatedWithDivisions {
    id
    name
  }
  ...skillsDisplay_PersonFragment
  ...UtilizationOverTimeGraph_PersonFragment @arguments(scenarioId: $scenarioId)
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Person</p>
                  <p><strong>Description:</strong> Fragment for person details control.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personDetailsControlAssignmentList" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personDetailsControl_AssignmentListFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personDetailsControlAssignmentList', 'Person Details Control Assignment List Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personDetailsControl_AssignmentListFragment on Query
@refetchable(queryName: "PersonDetailsControl_Refetch")
@argumentDefinitions(
  first: { type: "Int", defaultValue: 50 }
  after: { type: "String" }
  filterByPerson: { type: "ID" }
  filterByScenario: { type: "ID" }
) {
  Assignments {
    Assignments(
      first: $first
      after: $after
      filterByPerson: $filterByPerson
      filterByScenario: $filterByScenario
    ) @connection(key: "PersonDetailsControl_Assignments") {
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
        startCursor
      }
      edges {
        node {
          id
          time
          ...AssignmentProjectCard_AssignmentFragment
        }
      }
    }
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Query</p>
                  <p><strong>Description:</strong> Fragment for person details control assignment list.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personDetailsButtonScenario" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personDetailsButton_ScenarioFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personDetailsButtonScenario', 'Person Details Button Scenario Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personDetailsButton_ScenarioFragment on Scenario {
  id
  gapDays {
    personGapDays {
      personRef
      gapDays
    }
  }
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Scenario</p>
                  <p><strong>Description:</strong> Fragment for person details button within a scenario.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="personDetailsButtonPerson" className="scroll-mt-16">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5 text-blue-500" />
                  <span>personDetailsButton_PersonFragment</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCopyToClipboard('personDetailsButtonPerson', 'Person Details Button Person Fragment')}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="code-block overflow-x-auto">
                  <code>{`fragment personDetailsButton_PersonFragment on Person {
  id
  name
  comment
}`}</code>
                </pre>
                <div className="mt-4 text-sm">
                  <p><strong>Type:</strong> Person</p>
                  <p><strong>Description:</strong> Fragment for person details button.</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </DocsLayout>
  );
};

export default Fragments;
