fragments

Add all these below fragments in under schema fragment section in fragments file. Remove the duplicate fragments in any already exists in the fragments file. Add small description of fragmnets and have copy button to copy ability of fragment code easily on code section hover.

    fragment editAssignmentRoleButton_AssignmentRoleFragment on AssignmentRole {
        id
        name
        sortOrder
        maxNumberOfProjects
        utilizationProjectionCapInMonths
        countAsFullyAllocatedAtPercentage
        countAsOverallocatedAtPercentage
        useEndDateOfLastAssignmentOverProjectionCap
    }

    fragment editSkillCategoryButton_SkillCategoryFragment on SkillCategory {
        id
        name
    }

    fragment executivesSelect_PersonFragment on Person @inline {
        id
        name
    }

    fragment loadPursuitProjectsFromRandDwhButton_ScenarioFragment on Scenario {
        id
        isMasterPlan
    }

    fragment personCardDraggable_ScenarioFragment on Scenario {
        id
        utilization {
            personUtilizations {
                personRef
                status
            }
            ...personCard_ScenarioUtilizationFragment
        }
        ...personCard_ScenarioFragment
    }

    fragment personCardDraggable_PersonFragment on Person
    @argumentDefinitions(scenarioId: { type: "ID!" }) {
        id
        name
        assignmentRole {
            id
            name
        }
        ...personCard_PersonFragment @arguments(scenarioId: $scenarioId)
    }

    fragment personCard_ScenarioFragment on Scenario {
        id
        ...personDetailsButton_ScenarioFragment
    }

    fragment personCard_PersonFragment on Person @argumentDefinitions(scenarioId: { type: "ID!" }) {
        id
        name
        assignmentRole {
            id
            name
        }
        sumOfProjectVolume(scenarioRef: $scenarioId)
        comment
        ...personDetailsButton_PersonFragment
    }

    fragment personCard_ScenarioUtilizationFragment on ScenarioUtilization {
        personUtilizations {
            personRef
            utilizationPercentage
            status
        }
        ...personDetailsButton_ScenarioUtilizationFragment
    }

    fragment skillsDisplay_PersonFragment on Person {
        id
        skills(first: 100) {
            edges {
                node {
                    ...skillsDisplay_SkillAssociationInlineFragment
                }
            }
        }
    }

    fragment skillsDisplay_SkillAssociationInlineFragment on SkillAssociation @inline {
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
    }

    fragment personDetailsControl_PersonFragment on Person
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
    }

    fragment personDetailsControl_AssignmentListFragment on Query
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
    }

    fragment personDetailsButton_ScenarioFragment on Scenario {
        id
        gapDays {
            personGapDays {
                personRef
                gapDays
            }
        }
    }

    fragment personDetailsButton_PersonFragment on Person {
        id
        name
        comment
        assignmentRole {
            name
        }
    }

    fragment personDetailsButton_ScenarioUtilizationFragment on ScenarioUtilization {
        personUtilizations {
            personRef
            utilizationPercentage
        }
    }

    fragment projectsSelect_ProjectInlineFragment on Project @inline {
        id
        name
    }

    fragment AccountsAdminTable_AccountsListFragment on Query
    @refetchable(queryName: "AccountsTable_Refetch")
    @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" }) {
        Admin {
            Management {
                AccountsAdmin(first: $first, after: $after)
                    @connection(key: "AccountsTable_AccountsAdmin") {
                    __id
                    edges {
                        node {
                            ...AccountsAdminTable_AccountInlineFragment
                        }
                    }
                }
            }
        }
    }
    fragment AccountsAdminTable_AccountInlineFragment on Account @inline {
        id
        name
        groupAssociations {
            group {
                id
                name
            }
        }
        registeredAt
        ...EditAccountButton_AccountFragment
        ...EditUsersInAccountAdminButton_AccountFragment
        ...AnonymizeAccountButton_AccountFragment
        ...ChangeAccountGroupsAdminButton_AccountFragment
    }

    fragment AnonymizeAccountButton_AccountFragment on Account {
        id
        name
    }

    fragment AnonymizeUserButton_UserFragment on User {
        id
        name
    }


    fragment AssignmentCard_ScenarioFragment on Scenario {
        ...CheckScenarioPermissions_ScenarioFragment
        ...personDetailsButton_ScenarioFragment
        budget {
            projectBudgets {
                projectRef
                assignmentBudgets {
                    assignmentRef
                    budgetedCost
                    utilizedCost
                    months
                }
            }
        }
        utilization {
            ...personDetailsButton_ScenarioUtilizationFragment
        }
    }


    fragment AssignmentCard_AssignmentFragment on Assignment {
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
    }


    fragment AssignmentProjectCard_AssignmentFragment on Assignment {
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
    }

    fragment AssignmentRoleSelect_AssignmentRoleFragment on AssignmentRole @inline {
        id
        name
    }

    fragment AssignmentRoleSortOrderButtons_AssignmentRoleFragment on AssignmentRole {
        id
        sortOrder
    }

    fragment AssignmentRolesSelect_AssignmentRoleFragment on AssignmentRole @inline {
        id
        name
    }

    fragment AssignmentsInProjectList_ScenarioFragment on Scenario {
        id
        ...AssignmentCard_ScenarioFragment
        ...CheckScenarioPermissions_ScenarioFragment
    }

    fragment AssignmentsInProjectList_ProjectFragment on ProjectInScenario {
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
    }

    fragment ChangeAccountGroupsAdminButton_AccountFragment on Account {
        ...ChangeAccountGroupsAdminModal_AccountFragment
    }

    fragment ChangeAccountGroupsAdminModal_AccountFragment on Account {
        id
        groupAssociations {
            group {
                id
                name
            }
        }
    }

    fragment ChangeLogoForm_CurrentUser on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on AccountSettingsAccountExtension {
                            kind
                            logo {
                                id
                            }
                        }
                    }
                }
            }
        }
    }

    fragment ChangePersonActivationButton_PersonFragment on Person {
        id
        isDeactivated
    }

    fragment ChangeProjectActivationButton_ProjectFragment on Project {
        id
        isDeactivated
    }

    fragment ChangeShowBudgetForm_CurrentUser on Query {
        Viewer {
            Auth {
                currentUser {
                    user {
                        extension {
                            ... on HarkinsUserExtensionAndId {
                                showBudget
                            }
                        }
                    }
                }
            }
        }
    }

    fragment ChangeUserGroupsAdminButton_UserInAccountFragment on UserInAccount {
        ...ChangeUserGroupsAdminModal_UserInAccountFragment
    }

    fragment ChangeUserGroupsAdminModal_UserInAccountFragment on UserInAccount {
        id
        user {
            id
        }
        groups {
            id
        }
    }

    fragment CheckScenarioPermissions_ScenarioFragment on Scenario {
        isMasterPlan
    }

    fragment CloneScenarioButton_ScenarioFragment on Scenario {
        id
        name
    }

    fragment CreateAssignmentButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment CreateAssignmentsFromTemplateButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment CurrentScenarioControl_ScenarioFragment on Scenario {
        id
        name
        isMasterPlan
    }

  fragment DashboardHeader_ScenarioFragment on Scenario {
    id
    ...CurrentScenarioControl_ScenarioFragment
    ...ScenarioStatistics_ScenarioFragment
  }

    fragment DeleteAssignmentButton_AssignmentFragment on Assignment {
        id
        validAssignmentRoles {
            name
        }
    }

    fragment DivisionSelect_DivisionFragment on Division @inline{
        id
        name
    }


    fragment DivisionsTable_DivisionListFragment on Query
    @refetchable(queryName: "DivisionsTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Division {
            Divisions(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "DivisionsTable_Divisions") {
                __id
                pageInfo {
                    endCursor
                    hasPreviousPage
                    hasNextPage
                    startCursor
                }
                edges {
                    node {
                        id
                        name
                        ...EditDivisionButton_DivisionFragment
                    }
                }
            }
        }
    }

    fragment EditAccountButton_AccountFragment on Account {
        ...EditAccountModal_AccountFragment
    }

    fragment EditAccountModal_AccountFragment on Account {
        id
        name
        registeredAt
    }

    fragment EditAssignmentButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment EditAssignmentButton_AssignmentFragment on Assignment {
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
    }

    fragment EditDivisionButton_DivisionFragment on Division {
        ...EditDivisionModal_DivisionFragment
    }

    fragment EditDivisionModal_DivisionFragment on Division {
        id
        name
    }

    fragment EditPersonButton_PersonFragment on Person {
        ...EditPersonModal_PersonFragment
    }

    fragment EditPersonModal_PersonFragment on Person {
        id
        name
        email
        phone
        salary
        laborBurdenMultiplier
        startDate
        assignmentRole {
            id
            name
        }
        associatedWithDivisions {
            id
            name
        }
        associatedWithRegions {
            id
            name
        }
        address {
            lineOne
            postalCode
            city
            state
            country
            longitude
            latitude
        }
        comment
        avatar {
            id
            url
        }
    }

    fragment EditRegionButton_RegionFragment on Region {
        ...EditRegionModal_RegionFragment
    }

    fragment EditRegionModal_RegionFragment on Region {
        id
        name
    }

    fragment EditRegionModal_RegionFragment on Region {
        id
        name
    }

    fragment EditScenarioButton_ScenarioFragment on Scenario {
        id
        name
    }

    fragment EditStaffingTemplateButton_StaffingTemplateFragment on StaffingTemplate {
        ...EditStaffingTemplateModal_StaffingTemplateFragment
    }

    fragment EditStaffingTemplateModal_StaffingTemplateFragment on StaffingTemplate {
        id
        name
        assignmentRoleAssociations {
            assignmentRoleRef
            isExecutive
        }
    }
----



    fragment EditUserButton_UserFragment on User {
        id
        name
        email
        activated
    }

    fragment EditUsersInAccountAdminButton_AccountFragment on Account {
        ...EditUsersInAccountAdminModal_AccountFragment
    }

    fragment EditUsersInAccountAdminModal_AccountFragment on Account {
        id
        name
        registeredAt
    }

    fragment EmailTemplatesTable_EmailTemplatesListFragment on Query @refetchable(queryName: "EmailTemplatesTable_Refetch") @argumentDefinitions(
        first: {type: "Int"},
        after: {type: "String"},
    ){
        Admin {
            Email {
                PersonalizedEmailTemplates( first: $first, after: $after) @connection(key: "EmailTemplatesTable_PersonalizedEmailTemplates") {
                    pageInfo {
                        endCursor
                        hasPreviousPage
                        hasNextPage
                        startCursor
                    }
                    edges {
                        node {
                            id
                            template {
                                key
                                subject
                            }
                        }
                    }
                }
            }
        }
        ...NewEmailTemplateButton_AvailableTemplatesFragment
    }

    fragment EmptyAssignmentButton_AssignmentFragment on Assignment {
        id
        validAssignmentRoles {
            name
        }
    }

    fragment FilesTable_FilesListFragment on Query
    @refetchable(queryName: "FilesTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
        filterByFileTypes: { type: "[String!]" }
        filterByFromDateTimeInclusive: { type: "ZonedDateTIme" }
        filterByToDateTimeInclusive: { type: "ZonedDateTIme" }
        tagsIncluded: { type: "[String!]" }
    ) {
        Admin {
            Files {
                Files(
                    first: $first
                    after: $after
                    name: $filterByName
                    fileType: $filterByFileTypes
                    fromDateTimeInclusive: $filterByFromDateTimeInclusive
                    toDateTimeInclusive: $filterByToDateTimeInclusive
                    tagsIncluded: $tagsIncluded
                ) @connection(key: "FilesTable_Files") {
                    __id
                    pageInfo {
                        endCursor
                        hasPreviousPage
                        hasNextPage
                        startCursor
                    }
                    edges {
                        node {
                            id
                            name
                            fileType
                            accessType
                            uploadDateTime
                            thumbnail
                            url
                        }
                    }
                }
            }
        }
    }

    fragment GapDaysDisplay_GapDaysFragment on ScenarioGapDays {
        gapDays
        gapSalary
    }

    fragment GoogleMapsClickout_AddressFragment on Address {
        latitude
        longitude
    }

    fragment InvitationsTable_InvitationsListFragment on Query @refetchable(queryName: "InvitationsTable_Refetch") @argumentDefinitions(
        first: {type: "Int", defaultValue: 20},
        after: {type: "String"},
    ){
        Management {
            InvitationsToAccount(first: $first, after: $after)  @connection(key: "InvitationsTable_InvitationsToAccount"){
                __id
                edges {
                    node {
                        id
                        email
                        invitingUserName
                    }
                }
            }
        }
    }

    fragment MakeMasterPlanButton_ScenarioFragment on Scenario {
        id
        isMasterPlan
    }

    fragment NewEmailTemplateButton_AvailableTemplatesFragment on Query {
        Admin {
            Email {
                AvailableSystemTemplates {
                    key
                    previewText
                    subject
                    body
                    variables
                }
            }
        }
    }

    fragment PeopleTable_PeopleListFragment on Query
    @refetchable(queryName: "PeopleTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 250 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Staff {
            People(
                first: $first
                after: $after
                filterByName: $filterByName
                showDeactivated: true
            ) @connection(key: "PeopleTable_People") {
                __id
                pageInfo {
                    endCursor
                    hasPreviousPage
                    hasNextPage
                    startCursor
                }
                edges {
                    node {
                        id
                        ...PeopleTable_PersonFragment
                    }
                }
            }
        }
    }

    fragment PeopleTable_PersonFragment on Person @inline {
        id
        isDeactivated
        name
        address {
            longitude
            latitude
            ...GoogleMapsClickout_AddressFragment
        }
        startDate
        assignmentRole {
            name
        }
        associatedWithDivisions {
            id
            name
        }
        associatedWithRegions {
            id
            name
        }
        skills(first: 100) {
            edges {
                node {
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
                    }
                }
            }
        }
        avatar {
            url
        }
        comment
        ...EditPersonButton_PersonFragment
        ...editPersonSkillAssociationsButton_PersonFragment
        ...ChangePersonActivationButton_PersonFragment
    }

    fragment PersonSelect_PersonFragment on Person @inline {
        id
        name
    }

    fragment ProjectDateTimeDisplay_ProjectFragment on Project {
        startDate
        endDate
        durationInMonths
    }

    fragment ProjectStageSelect_ProjectStageFragment on ProjectStage @inline{
        id
        name
    }


    fragment ProjectStageSortOrderButtons_ProjectStageFragment on ProjectStage {
        id
        sortOrder
    }

    fragment ProjectStagesSelect_ProjectStageFragment on ProjectStage @inline{
        id
        name
    }


    fragment ProjectStagesTable_ProjectStageListFragment on Query
    @refetchable(queryName: "ProjectStagesTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Project {
            ProjectStages(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "ProjectStagesTable_ProjectStages") {
                __id
                pageInfo {
                    endCursor
                    hasPreviousPage
                    hasNextPage
                    startCursor
                }
                edges {
                    node {
                        ...ProjectStagesTable_ProjectStageFragment
                    }
                }
            }
        }
    }

    fragment ProjectStagesTable_ProjectStageFragment on ProjectStage @inline {
        id
        name
        sortOrder
        reverseProjectOrderInReports
        color
        ...ProjectStageSortOrderButtons_ProjectStageFragment
        ...editProjectStageButton_ProjectStageFragment
    }
---
80

