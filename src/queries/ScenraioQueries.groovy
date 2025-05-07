
    query ScenarioMapViewScreen_Query(
        $id: ID!
        $filterByName: String
        $filterByAssignmentRoles: [ID!]
        $filterByUtilizationStatus: [UtilizationStatus!]
        $filterBySalaryMinimum: BigDecimal
        $filterBySalaryMaximum: BigDecimal
        $filterByFreeDateMinimum: LocalDate
        $filterByFreeDateMaximum: LocalDate
        $filterByAllocatedDateMinimum: LocalDate
        $filterByAllocatedDateMaximum: LocalDate
        $filterByGapDaysMinimum: Int
        $filterByGapDaysMaximum: Int
        $filterByDistanceMinimum: Int
        $filterByDistanceMaximum: Int
        $sortByClosestToProject: ID
        $utilizationWindow: UtilizationWindowInput
    ) {
        node(id: $id) {
            ... on Scenario {
                ...ScenarioMapViewScreen_ScenarioFragment
            }
        }
        ...rosterPart_StaffFragment
            @arguments(
                filterByName: $filterByName
                scenarioRef: $id
                filterByAssignmentRoles: $filterByAssignmentRoles
                filterByUtilizationStatus: $filterByUtilizationStatus
                filterBySalaryMinimum: $filterBySalaryMinimum
                filterBySalaryMaximum: $filterBySalaryMaximum
                filterByFreeDateMinimum: $filterByFreeDateMinimum
                filterByFreeDateMaximum: $filterByFreeDateMaximum
                filterByAllocatedDateMinimum: $filterByAllocatedDateMinimum
                filterByAllocatedDateMaximum: $filterByAllocatedDateMaximum
                filterByGapDaysMinimum: $filterByGapDaysMinimum
                filterByGapDaysMaximum: $filterByGapDaysMaximum
                filterByDistanceMinimum: $filterByDistanceMinimum
                filterByDistanceMaximum: $filterByDistanceMaximum
                sortByClosestToProject: $sortByClosestToProject
                utilizationWindow: $utilizationWindow
            )
        ...baseScreen_QueryFragment
        ...rosterPart_FilterFragment
    }


    fragment ScenarioMapViewScreen_ScenarioFragment on Scenario {
        id
        ...ProjectMapPart_ScenarioFragment
        ...rosterPart_ScenarioFragment
        ...DashboardHeader_ScenarioFragment
        projects {
            edges {
                node {
                    id
                    project {
                        id
                    }
                    ...ProjectMapPart_ProjectInScenarioFragment
                }
            }
        }
    }

    fragment rosterPart_ScenarioFragment on Scenario
    {
        ...RosterList_ScenarioFragment
        ...rosterListActiveFilters_ScenarioFragment
    }
  fragment DashboardHeader_ScenarioFragment on Scenario {
    id
    ...CurrentScenarioControl_ScenarioFragment
    ...ScenarioStatistics_ScenarioFragment
  }


    fragment ProjectMapPart_ProjectInScenarioFragment on ProjectInScenario {
        project {
            name
        }
        ...AssignmentsInProjectList_ProjectFragment
        ...ProjectMap_ProjectFragment
    }


    fragment ProjectMapPart_ScenarioFragment on Scenario {
        id
        ...AssignmentsInProjectList_ScenarioFragment
    }


    fragment RosterList_ScenarioFragment on Scenario {
        id
        ...CheckScenarioPermissions_ScenarioFragment
        ...personCardDraggable_ScenarioFragment
        ...personCard_ScenarioFragment

        utilization {
            ...personCard_ScenarioUtilizationFragment
        }
    }


    fragment rosterListActiveFilters_ScenarioFragment on Scenario {
        utilization {
            personUtilizations {
                status
            }
        }
    }

    fragment CurrentScenarioControl_ScenarioFragment on Scenario {
        id
        name
        isMasterPlan
    }

    fragment ScenarioStatistics_ScenarioFragment on Scenario {
        gapDays {
            ...GapDaysDisplay_GapDaysFragment
        }
        utilization {
            ...UtilizationDisplay_UtilizationFragment
        }
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

    fragment ProjectMap_ProjectFragment on ProjectInScenario {
        id
        project {
            name
            address {
                latitude
                longitude
            }
        }
    }

    fragment AssignmentsInProjectList_ScenarioFragment on Scenario {
        id
        ...AssignmentCard_ScenarioFragment
        ...CheckScenarioPermissions_ScenarioFragment
    }

    fragment CheckScenarioPermissions_ScenarioFragment on Scenario {
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

    fragment personCard_ScenarioFragment on Scenario {
        id
        ...personDetailsButton_ScenarioFragment
    }

    fragment personCard_ScenarioUtilizationFragment on ScenarioUtilization {
        personUtilizations {
            personRef
            utilizationPercentage
            status
        }
        ...personDetailsButton_ScenarioUtilizationFragment
    }

    fragment GapDaysDisplay_GapDaysFragment on ScenarioGapDays {
        gapDays
        gapSalary
    }


    fragment UtilizationDisplay_UtilizationFragment on ScenarioUtilization {
        averageUtilizationPercentage
        unusedSalary
    }

    fragment CreateAssignmentButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment CreateAssignmentsFromTemplateButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment EditAssignmentForm_ProjectFragment on Project {
        startDate
        endDate
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

    fragment personDetailsButton_ScenarioFragment on Scenario {
        id
        gapDays {
            personGapDays {
                personRef
                gapDays
            }
        }
    }

    fragment personDetailsButton_ScenarioUtilizationFragment on ScenarioUtilization {
        personUtilizations {
            personRef
            utilizationPercentage
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

    fragment EmptyAssignmentButton_AssignmentFragment on Assignment {
        id
        validAssignmentRoles {
            name
        }
    }

    fragment DeleteAssignmentButton_AssignmentFragment on Assignment {
        id
        validAssignmentRoles {
            name
        }
    }


    fragment rosterPart_StaffFragment on Query
    @argumentDefinitions(
        scenarioRef: { type: "ID!" }
        first: { type: "Int", defaultValue: 250 }
        after: { type: "String" }
        filterByName: { type: "String" }
        filterByAssignmentRoles: { type: "[ID!]" }
        filterByUtilizationStatus: { type: "[UtilizationStatus!]" }
        filterBySalaryMinimum: { type: "BigDecimal" }
        filterBySalaryMaximum: { type: "BigDecimal" }
        filterByFreeDateMinimum: { type: "LocalDate" }
        filterByFreeDateMaximum: { type: "LocalDate" }
        filterByAllocatedDateMinimum: { type: "LocalDate" }
        filterByAllocatedDateMaximum: { type: "LocalDate" }
        filterByGapDaysMinimum: { type: "Int" }
        filterByGapDaysMaximum: { type: "Int" }
        filterByDistanceMinimum: { type: "Int" }
        filterByDistanceMaximum: { type: "Int" }
        filterBySkills: { type: "[SkillFilter!]" }
        sortByClosestToProject: { type: "ID" }
        filterByRegions: { type: "[ID!]" }
        filterByDivisions: { type: "[ID!]" }
        utilizationWindow: { type: "UtilizationWindowInput" }
    ) {
        ...RosterList_StaffFragment
            @arguments(
                first: $first
                after: $after
                filterByName: $filterByName
                scenarioRef: $scenarioRef
                filterBySkills: $filterBySkills
                filterByRegions: $filterByRegions
                filterByDivisions: $filterByDivisions
                filterByAssignmentRoles: $filterByAssignmentRoles
                filterByUtilizationStatus: $filterByUtilizationStatus
                filterBySalaryMinimum: $filterBySalaryMinimum
                filterBySalaryMaximum: $filterBySalaryMaximum
                filterByFreeDateMinimum: $filterByFreeDateMinimum
                filterByFreeDateMaximum: $filterByFreeDateMaximum
                filterByAllocatedDateMinimum: $filterByAllocatedDateMinimum
                filterByAllocatedDateMaximum: $filterByAllocatedDateMaximum
                filterByGapDaysMinimum: $filterByGapDaysMinimum
                filterByGapDaysMaximum: $filterByGapDaysMaximum
                filterByDistanceMinimum: $filterByDistanceMinimum
                filterByDistanceMaximum: $filterByDistanceMaximum
                sortByClosestToProject: $sortByClosestToProject
                utilizationWindow: $utilizationWindow
            )
    }


    fragment baseScreen_QueryFragment on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on AccountSettingsAccountExtension {
                            kind
                            logo {
                                ...BaseHeader_LogoFragment
                            }
                        }
                    }
                }
            }
        }
    }


    fragment rosterPart_FilterFragment on Query {
        ...rosterListActiveFilters_DivisionRegionFragment
    }


    fragment RosterList_StaffFragment on Query
    @refetchable(queryName: "RosterList_StaffRefetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 250 }
        after: { type: "String" }
        filterByName: { type: "String" }
        scenarioRef: { type: "ID!" }
        filterByAssignmentRoles: { type: "[ID!]" }
        filterByUtilizationStatus: { type: "[UtilizationStatus!]" }
        filterBySalaryMinimum: { type: "BigDecimal" }
        filterBySalaryMaximum: { type: "BigDecimal" }
        filterByFreeDateMinimum: { type: "LocalDate" }
        filterByFreeDateMaximum: { type: "LocalDate" }
        filterByAllocatedDateMinimum: { type: "LocalDate" }
        filterByAllocatedDateMaximum: { type: "LocalDate" }
        filterByGapDaysMinimum: { type: "Int" }
        filterByGapDaysMaximum: { type: "Int" }
        filterByDistanceMinimum: { type: "Int" }
        filterByDistanceMaximum: { type: "Int" }
        filterBySkills: { type: "[SkillFilter!]" }
        filterByStaff: { type: "[ID!]" }
        sortByClosestToProject: { type: "ID" }
        filterByRegions: { type: "[ID!]" }
        filterByDivisions: { type: "[ID!]" }
        utilizationWindow: { type: "UtilizationWindowInput" }
    ) {
        node(id: $scenarioRef) {
            ... on Scenario {
                utilizationWithStandAndEndDate(utilizationWindow: $utilizationWindow) {
                    ...personCard_ScenarioUtilizationFragment
                }
            }
        }
        Staff {
            People(
                first: $first
                after: $after
                filterByName: $filterByName
                scenarioRef: $scenarioRef
                alwaysIncludeIds: $filterByStaff
                filterByAssignmentRoles: $filterByAssignmentRoles
                filterByUtilizationStatus: $filterByUtilizationStatus
                filterBySalaryMinimum: $filterBySalaryMinimum
                filterBySalaryMaximum: $filterBySalaryMaximum
                filterByFreeDateMinimum: $filterByFreeDateMinimum
                filterByFreeDateMaximum: $filterByFreeDateMaximum
                filterByAllocatedDateMinimum: $filterByAllocatedDateMinimum
                filterByAllocatedDateMaximum: $filterByAllocatedDateMaximum
                filterByGapDaysMinimum: $filterByGapDaysMinimum
                filterByGapDaysMaximum: $filterByGapDaysMaximum
                filterByDistanceMinimum: $filterByDistanceMinimum
                filterByDistanceMaximum: $filterByDistanceMaximum
                filterBySkills: $filterBySkills
                sortByClosestToProject: $sortByClosestToProject
                filterByDivisions: $filterByDivisions
                filterByRegions: $filterByRegions
                utilizationWindow: $utilizationWindow
            ) @connection(key: "RosterList_People") {
                pageInfo {
                    endCursor
                    hasPreviousPage
                    hasNextPage
                    startCursor
                }
                edges {
                    node {
                        id
                        ...personCardDraggable_PersonFragment @arguments(scenarioId: $scenarioRef)
                        ...personCard_PersonFragment @arguments(scenarioId: $scenarioRef)

                        distance(projectRef: $sortByClosestToProject)
                        name
                        address {
                            latitude
                            longitude
                            lineOne
                            postalCode
                            city
                            state
                        }
                    }
                }
            }
        }
    }


    fragment BaseHeader_LogoFragment on File {
        url
    }

    fragment rosterListActiveFilters_DivisionRegionFragment on Query {
        Skills {
            Skills {
                edges {
                    node {
                        id
                        name
                        skillCategory {
                            id
                            name
                            sortOrder
                        }
                    }
                }
            }
            SkillCategories {
                edges {
                    node {
                        id
                        name
                        sortOrder
                    }
                }
            }
        }
        Assignments {
            AssignmentRoles {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
        Division {
            Divisions {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
        Region {
            Regions {
                edges {
                    node {
                        id
                        name
                        ...rosterListActiveFilters_RegionFragment
                    }
                }
            }
        }
    }

    fragment rosterListActiveFilters_RegionFragment on Region {
        id
        name
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


    query ScenarioProjectViewScreen_Query(
        $id: ID!
        $filterByName: String
        $filterByAssignmentRoles: [ID!]
        $filterByUtilizationStatus: [UtilizationStatus!]
        $filterBySalaryMinimum: BigDecimal
        $filterBySalaryMaximum: BigDecimal
        $filterByFreeDateMinimum: LocalDate
        $filterByFreeDateMaximum: LocalDate
        $filterByAllocatedDateMinimum: LocalDate
        $filterByAllocatedDateMaximum: LocalDate
        $filterByGapDaysMinimum: Int
        $filterByGapDaysMaximum: Int
        $filterByDistanceMinimum: Int
        $filterByDistanceMaximum: Int
        $sortByClosestToProject: ID
        $utilizationWindow: UtilizationWindowInput
        $projectFilters: ProjectWithAssignmentsFiltersInput
        $peopleOnAssignmentFilters: PersonOnAssignmentFiltersInput
    ) {
        node(id: $id) {
            ... on Scenario {
                ...ScenarioProjectViewScreen_ScenarioFragment
                    @arguments(
                        utilizationWindow: $utilizationWindow
                        projectFilters: $projectFilters
                        personOnAssignmentFilters: $peopleOnAssignmentFilters
                    )
            }
        }
        ...rosterPart_StaffFragment
            @arguments(
                filterByName: $filterByName
                scenarioRef: $id
                filterByAssignmentRoles: $filterByAssignmentRoles
                filterByUtilizationStatus: $filterByUtilizationStatus
                filterBySalaryMinimum: $filterBySalaryMinimum
                filterBySalaryMaximum: $filterBySalaryMaximum
                filterByFreeDateMinimum: $filterByFreeDateMinimum
                filterByFreeDateMaximum: $filterByFreeDateMaximum
                filterByAllocatedDateMinimum: $filterByAllocatedDateMinimum
                filterByAllocatedDateMaximum: $filterByAllocatedDateMaximum
                filterByGapDaysMinimum: $filterByGapDaysMinimum
                filterByGapDaysMaximum: $filterByGapDaysMaximum
                filterByDistanceMinimum: $filterByDistanceMinimum
                filterByDistanceMaximum: $filterByDistanceMaximum
                sortByClosestToProject: $sortByClosestToProject
                utilizationWindow: $utilizationWindow
            )
        ...ProjectsGridPart_QueryFragment

        ...baseScreen_QueryFragment
        ...rosterPart_FilterFragment

        Views {
            ViewOptions(first: 20, filterByViewType: ProjectView)
                @connection(key: "FilterViewSelector_ViewOptions") {
                __id
                edges {
                    node {
                        id
                        name
                        viewType
                        url
                        isDefault
                    }
                }
            }
        }
    }

    fragment ScenarioProjectViewScreen_ScenarioFragment on Scenario
    @argumentDefinitions(
        utilizationWindow: { type: "UtilizationWindowInput" }
        projectFilters: { type: "ProjectWithAssignmentsFiltersInput" }
        personOnAssignmentFilters: { type: "PersonOnAssignmentFiltersInput" }
    ) {
        id
        ...ProjectsGridPart_ScenarioFragment
            @arguments(
                projectFilters: $projectFilters
                personOnAssignmentFilters: $personOnAssignmentFilters
            )
        ...rosterPart_ScenarioFragment
        ...DashboardHeader_ScenarioFragment

        utilizationWithStandAndEndDate(utilizationWindow: $utilizationWindow) {
            ...personCard_ScenarioUtilizationFragment
        }
    }


    mutation addProjectToScenarioModal_AddNewMutation(
        $input: AddNewProjectToScenarioInput!
        $connectionIds: [ID!]!
    ) {
        Scenario {
            addNewProjectToScenario(input: $input) {
                edge @appendEdge(connections: $connectionIds) {
                    node {
                        id
                        ...ProjectsGridPart_ScenarioFragment
                    }
                }
            }
        }
    }

    mutation addProjectToScenarioModal_AddExistingMutation(
        $input: AddExistingProjectsToScenarioInput!
    ) {
        Scenario {
            addExistingProjectsToScenario(input: $input) {
                edge {
                    node {
                        id
                        ...ProjectsGridPart_ScenarioFragment
                    }
                }
            }
        }
    }


    fragment ProjectsGridPart_ScenarioFragment on Scenario
    @argumentDefinitions(
        projectFilters: { type: "ProjectWithAssignmentsFiltersInput" }
        personOnAssignmentFilters: { type: "PersonOnAssignmentFiltersInput" }
    ) {
        id
        ...projectsGridPartContent_ScenarioFragment
            @arguments(
                projectFilters: $projectFilters
                personOnAssignmentFilters: $personOnAssignmentFilters
            )
        ...updateAssignmentsFromDynamicsButton_ScenarioFragment
        ...projectViewFiltersPart_ScenarioFragment
        ...syncWithRandPreconDwhButton_ScenarioFragment
        ...loadPursuitProjectsFromRandDwhButton_ScenarioFragment
    }


    fragment ProjectsGridPart_QueryFragment on Query {
        ...projectStagesTabs_ProjectStages
        ...FilterViewSelector_QueryFragment @arguments(filterByViewType: ProjectView)
        ...projectViewFiltersPart_QueryFragment
        Viewer {
            Auth {
                currentAccount {
                    ...updateAssignmentsFromDynamicsButton_AccountFragment
                }
            }
        }
    }

    fragment projectsGridPartContent_ScenarioFragment on Scenario
    @argumentDefinitions(
        projectFilters: { type: "ProjectWithAssignmentsFiltersInput" }
        personOnAssignmentFilters: { type: "PersonOnAssignmentFiltersInput" }
    ) {
        id
        ...projectsGridPartContent_ScenarioRefetchableFragment
            @arguments(
                projectFilters: $projectFilters
                personOnAssignmentFilters: $personOnAssignmentFilters
            )
        ...addProjectToScenarioCard_ScenarioFragment
            @arguments(
                projectFilters: $projectFilters
                personOnAssignmentFilters: $personOnAssignmentFilters
            )
        ...projectCard_ScenarioFragment
    }

    fragment updateAssignmentsFromDynamicsButton_ScenarioFragment on Scenario {
        id
    }

    fragment projectViewFiltersPart_ScenarioFragment on Scenario {
        id
    }

    fragment syncWithRandPreconDwhButton_ScenarioFragment on Scenario {
        id
        isMasterPlan
    }

    fragment loadPursuitProjectsFromRandDwhButton_ScenarioFragment on Scenario {
        id
        isMasterPlan
    }

    fragment projectStagesTabs_ProjectStages on Query {
        Project {
            ProjectStages(first: 100) {
                edges {
                    node {
                        id
                        name
                        sortOrder
                        ...projectStagesTab_ProjectStageFragment
                    }
                }
            }
        }
    }

    fragment projectStagesTab_ProjectStageFragment on ProjectStage {
        id
        name
        sortOrder
    }

    fragment FilterViewSelector_QueryFragment on Query
    @argumentDefinitions(filterByViewType: { type: "ViewType!" }) {
        Views {
            ViewOptions(first: 20, filterByViewType: $filterByViewType)
                @connection(key: "FilterViewSelector_ViewOptions") {
                __id
                edges {
                    node {
                        id
                        name
                        viewType
                        url
                        isDefault
                    }
                }
            }
        }
    }

    fragment projectViewFiltersPart_QueryFragment on Query {
        Division {
            Divisions {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
        Region {
            Regions {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
        Project {
            ProjectStages(first: 100) {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }

    fragment updateAssignmentsFromDynamicsButton_AccountFragment on Account {
        id
    }

    fragment projectsGridPartContent_ScenarioRefetchableFragment on Scenario
    @refetchable(queryName: "projectsGridPartContent_Refetch")
    @argumentDefinitions(
        projectFilters: { type: "ProjectWithAssignmentsFiltersInput" }
        personOnAssignmentFilters: { type: "PersonOnAssignmentFiltersInput" }
    ) {
        projects(
            projectWithAssignmentsFilters: $projectFilters
            peopleOnAssignmentFilters: $personOnAssignmentFilters
        ) {
            edges {
                node {
                    id
                    ...projectsGridPartContent_ProjectInScenarioInlineFragment
                }
            }
        }
    }

    fragment addProjectToScenarioCard_ScenarioFragment on Scenario
    @argumentDefinitions(
        projectFilters: { type: "ProjectWithAssignmentsFiltersInput" }
        personOnAssignmentFilters: { type: "PersonOnAssignmentFiltersInput" }
    ) {
        ...addProjectToScenarioModal_ScenarioFragment
            @arguments(
                projectFilters: $projectFilters
                personOnAssignmentFilters: $personOnAssignmentFilters
            )
        isMasterPlan
    }

    fragment projectCard_ScenarioFragment on Scenario {
        id
        ...AssignmentsInProjectList_ScenarioFragment

        budget {
            projectBudgets {
                projectRef
                maximumBudget
                budgetedCost
                utilizedCost
            }
        }
    }

    fragment projectsGridPartContent_ProjectInScenarioInlineFragment on ProjectInScenario @inline {
        id
        project {
            name
            startDate
            endDate
            stage {
                id
                name
            }

            division {
                id
            }
            region {
                id
            }
        }
        assignments {
            edges {
                node {
                    isExecutive
                    validAssignmentRoles {
                        name
                    }
                    project {
                        id
                    }
                    person {
                        id
                        assignmentRole {
                            name
                            id
                        }
                    }
                }
            }
        }
        ...projectCard_ProjectFragment
    }

    fragment addProjectToScenarioModal_ScenarioFragment on Scenario
    @argumentDefinitions(
        projectFilters: { type: "ProjectWithAssignmentsFiltersInput" }
        personOnAssignmentFilters: { type: "PersonOnAssignmentFiltersInput" }
    ) {
        id
        projects(
            projectWithAssignmentsFilters: $projectFilters
            peopleOnAssignmentFilters: $personOnAssignmentFilters
        ) {
            edges {
                node {
                    id
                    project {
                        name
                        source
                    }
                }
            }
        }
    }

fragment projectCard_ProjectFragment on ProjectInScenario {
        id
        project {
            id
            name
            startDate
            endDate
            address {
                lineOne
                city
                country
                postalCode
                state
                latitude
                longitude
            }
            stage {
                color
            }
            ...editProjectButton_ProjectFragment
            ...ProjectDateTimeDisplay_ProjectFragment
        }
        assignments {
            edges {
                node {
                    person {
                        id
                    }
                }
            }
        }
        ...AssignmentsInProjectList_ProjectFragment
        ...projectDetailsButton_ProjectInScenario
    }
  fragment editProjectButton_ProjectFragment on Project {
        id
        name
        startDate
        endDate
        address {
            lineOne
            city
            postalCode
            state
            country
            latitude
            longitude
        }
        source
        architectName
        clientName
        stage {
            id
            name
        }
        skills {
            id
        }
        volume
        generalConditionsPercentage
        budgetedLaborCosts
        division {
            id
        }
        region {
            id
        }
        projectIdentifier
        durationInMonths
        avatar {
            id
            url
        }
        milestones {
            name
            date
        }
        comments
        source
    }
 fragment ProjectDateTimeDisplay_ProjectFragment on Project {
        startDate
        endDate
        durationInMonths
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
    fragment CreateAssignmentButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment CreateAssignmentsFromTemplateButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment EditAssignmentForm_ProjectFragment on Project {
        startDate
        endDate
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

    fragment personDetailsButton_PersonFragment on Person {
        id
        name
        comment
        assignmentRole {
            name
        }
    }

    fragment EditAssignmentButton_ProjectFragment on Project {
        id
        ...EditAssignmentForm_ProjectFragment
    }

    fragment EditAssignmentForm_ProjectFragment on Project {
        startDate
        endDate
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

    fragment EmptyAssignmentButton_AssignmentFragment on Assignment {
        id
        validAssignmentRoles {
            name
        }
    }

    fragment DeleteAssignmentButton_AssignmentFragment on Assignment {
        id
        validAssignmentRoles {
            name
        }
    }

    fragment projectDetailsButton_ProjectInScenario on ProjectInScenario {
        project {
            id
            name
        }
    }


    query ScenariosTable_Query($first: Int, $filterByName: String) {
        ...ScenariosTable_ScenariosListFragment
            @arguments(first: $first, filterByName: $filterByName)
    }

    fragment ScenariosTable_ScenariosListFragment on Query
    @refetchable(queryName: "ScenariosTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Scenario {
            Scenarios(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "ScenariosTable_Scenarios") {
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
                        ...ScenariosTable_ScenarioFragment
                    }
                }
            }
        }
    }

    fragment ScenariosTable_ScenarioFragment on Scenario @inline {
        id
        name
        isMasterPlan
        lastUpdatedAt
        ...EditScenarioButton_ScenarioFragment
        ...CheckScenarioPermissions_ScenarioFragment
        ...MakeMasterPlanButton_ScenarioFragment
        ...CloneScenarioButton_ScenarioFragment
        ...ToggleVisibilityButton_ScenarioFragment
    }

    fragment EditScenarioButton_ScenarioFragment on Scenario {
        id
        name
    }

    fragment CheckScenarioPermissions_ScenarioFragment on Scenario {
        isMasterPlan
    }

    fragment MakeMasterPlanButton_ScenarioFragment on Scenario {
        id
        isMasterPlan
    }

    fragment CloneScenarioButton_ScenarioFragment on Scenario {
        id
        name
    }

    fragment ToggleVisibilityButton_ScenarioFragment on Scenario {
        id
        isPublic
        isMasterPlan
    }


    query UserScenariosTable_Query($first: Int, $onlyShowMine: Boolean) {
        ...UserScenariosTable_ScenariosListFragment
            @arguments(first: $first, onlyShowMine: $onlyShowMine)
    }

    fragment UserScenariosTable_ScenariosListFragment on Query
    @refetchable(queryName: "UserScenariosTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        onlyShowMine: { type: "Boolean" }
    ) {
        Scenario {
            Scenarios(first: $first, after: $after, onlyShowMine: $onlyShowMine)
                @connection(key: "UserScenariosTable_Scenarios") {
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
                        ...UserScenariosTable_ScenarioFragment
                    }
                }
            }
        }
    }

    fragment UserScenariosTable_ScenarioFragment on Scenario @inline {
        id
        name
        isMasterPlan
        lastUpdatedAt
        gapDays {
            gapDays
            gapSalary
        }
        utilization {
            unusedSalary
            averageUtilizationPercentage
        }
        ...CheckScenarioPermissions_ScenarioFragment
        ...MakeMasterPlanButton_ScenarioFragment
        ...CloneScenarioButton_ScenarioFragment
        ...ToggleVisibilityButton_ScenarioFragment
    }

    query scenarioSelectField_Query(
        $last: Int
        $after: String
        $before: String
        $filterByName: String
        $onlyMaster: Boolean
        $onlyMine: Boolean
        $alwaysIncludeIds: [ID!]
        $excludeIds: [ID!]
    ) {
        Scenario {
            Scenarios(
                first: 20
                last: $last
                after: $after
                before: $before
                alwaysIncludeIds: $alwaysIncludeIds
                excludeIds: $excludeIds
                filterByName: $filterByName
                onlyMaster: $onlyMaster
                onlyShowMine: $onlyMine
            ) {
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        id
                        ...scenarioSelectField_ScenarioInlineFragment
                    }
                }
            }
        }
    }

    fragment scenarioSelectField_ScenarioInlineFragment on Scenario @inline {
        id
        name
        isMasterPlan
        isPublic
    }

    query availabilityForecastScreen_Query($id: ID!) {
        node(id: $id) {
            ... on Scenario {
                ...availabilityForecastScreen_ScenarioFragment
            }
        }
        ...baseScreen_QueryFragment
    }

    fragment availabilityForecastScreen_ScenarioFragment on Scenario {
        id
        ...DashboardHeader_ScenarioFragment
    }

    query ScenarioStaffViewScreen_Query($id: ID!) {
        node(id: $id) {
            ... on Scenario {
                ...ScenarioStaffViewScreen_ScenarioFragment
            }
        }
        ...baseScreen_QueryFragment
        ...FilterViewSelector_QueryFragment @arguments(filterByViewType: StaffView)
        ...staffViewFiltersPart_QueryFragment

        Views {
            ViewOptions(first: 20, filterByViewType: StaffView)
                @connection(key: "FilterViewSelector_ViewOptions") {
                __id
                edges {
                    node {
                        id
                        name
                        viewType
                        url
                        isDefault
                    }
                }
            }
        }
    }

    fragment ScenarioStaffViewScreen_ScenarioFragment on Scenario {
        id
        ...DashboardHeader_ScenarioFragment
        ...staffViewFiltersPart_ScenarioFragment
        ...updateAssignmentsFromDynamicsButton_ScenarioFragment
        ...syncWithRandPreconDwhButton_ScenarioFragment
        ...loadPursuitProjectsFromRandDwhButton_ScenarioFragment
    }


    fragment staffViewFiltersPart_ScenarioFragment on Scenario {
        id
        utilization {
            personUtilizations {
                status
            }
        }
    }

    fragment staffViewFiltersPart_QueryFragment on Query {
        Assignments {
            AssignmentRoles {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
        Division {
            Divisions {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
        Region {
            Regions {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }


    query StartScreen_Query {
        Scenario {
            Scenarios(first: 1, onlyMaster: true) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
        ...baseScreen_QueryFragment
    }

    mutation CloneScenarioButton_CloneMutation($input: CloneScenarioInput!, $connections: [ID!]!) {
        Scenario {
            cloneScenario(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...UserScenariosTable_ScenarioFragment
                        ...ScenariosTable_ScenarioFragment
                    }
                }
            }
        }
    }

    mutation DeleteScenariosButton_DeleteMutation($input: DeleteScenarioInput!, $connections: [ID!]!) {
        Scenario {
            deleteScenario(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation EditScenarioButton_EditMutation($input: EditScenarioInput!) {
        Scenario {
            editScenario(input: $input) {
                edge {
                    node {
                        id
                        name
                        isMasterPlan
                    }
                }
            }
        }
    }

   

    mutation ExportScenariosButton_ExportMutation {
        Scenario {
            exportScenarios(input: {}) {
                file {
                    url
                }
            }
        }
    }

   
    mutation ImportScenariosButton_ImportMutation($input: ImportScenariosInput!) {
        Scenario {
            importScenarios(input: $input) {
                result {
                    editedEntities
                    newEntities
                    issues {
                        row
                        issue
                    }
                }
            }
        }
    }

    mutation MakeMasterPlanButton_MakeMasterPlanMutation($input: ChangeMasterPlanInput!) {
        Scenario {
            changeMasterPlan(input: $input) {
                edge {
                    node {
                        ...MakeMasterPlanButton_ScenarioFragment
                    }
                }
            }
        }
    }

    mutation ToggleVisibilityButton_ToggleVisibilityMutation($input: ChangeScenarioVisibilityInput!) {
        Scenario {
            changeScenarioVisibility(input: $input) {
                edge {
                    node {
                        ...ToggleVisibilityButton_ScenarioFragment
                    }
                }
            }
        }
    }

    mutation CreateScenarioButton_CreateMutation($input: CreateScenarioInput!, $connectionId: ID!) {
        Scenario {
            createScenario(input: $input) {
                edge @appendEdge(connections: [$connectionId]) {
                    node {
                        id
                        name
                        isMasterPlan
                    }
                }
            }
        }
    }
