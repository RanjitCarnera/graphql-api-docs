
    mutation AssignmentCard_AssignMutation($input: FillAssignmentInput!) {
        Scenario {
            fillAssignment(input: $input) {
                update {
                    project {
                        id
                        ...projectCard_ProjectFragment
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

    mutation CreateAssignmentButton_CreateMutation($input: CreateAssignmentInput!) {
        Scenario {
            createAssignment(input: $input) {
                edge {
                    node {
                        id
                        ...AssignmentsInProjectList_ProjectFragment
                        ...projectCard_ProjectFragment
                    }
                }
            }
        }
    }


    mutation CreateAssignmentsFromTemplateButton_CreateMutation(
        $input: CreateAssignmentsFromTemplateInput!
    ) {
        Scenario {
            createAssignmentsFromTemplate(input: $input) {
                edge {
                    node {
                        id
                        ...AssignmentsInProjectList_ProjectFragment
                        ...projectCard_ProjectFragment
                    }
                }
            }
        }
    }

    mutation DeleteAssignmentButton_DeleteMutation($input: DeleteAssignmentInput!) {
        Scenario {
            deleteAssignment(input: $input) {
                update {
                    project {
                        id
                        ...projectCard_ProjectFragment
                    }
                }
            }
        }
    }

    mutation EditAssignmentButton_EditMutation($input: EditAssignmentInput!) {
        Scenario {
            editAssignment(input: $input) {
                update {
                    project {
                        id
                        ...AssignmentsInProjectList_ProjectFragment
                        ...projectCard_ProjectFragment

                        assignments {
                            edges {
                                node {
                                    ...EditAssignmentButton_AssignmentFragment
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    mutation EmptyAssignmentButton_EmptyMutation($input: EmptyAssignmentInput!) {
        Scenario {
            emptyAssignment(input: $input) {
                update {
                    project {
                        id
                        ...projectCard_ProjectFragment
                    }
                }
            }
        }
    }
 mutation ExportAssignmentsButton_ExportMutation($input: ExportAssignmentsInput!) {
        Scenario {
            exportAssignments(input: $input) {
                file {
                    url
                }
            }
        }
    }

     mutation ImportAssignmentsButton_ImportMutation($input: ImportAssignmentsInput!) {
        Scenario {
            importAssignments(input: $input) {
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

    mutation moveAssignmentDialogue_UpdateAssigmentMutation($input: EditAssignmentInput!) {
        Scenario {
            editAssignment(input: $input) {
                clientMutationId
            }
        }
    }

    mutation resizeAssignmentDialogue_UpdateAssigmentMutation($input: EditAssignmentInput!) {
        Scenario {
            editAssignment(input: $input) {
                clientMutationId
            }
        }
    }

    mutation writeAssignmentsToDynamicsButton_WriteMutation(
        $input: WriteAssignmentsToDynamicsInput!
    ) {
        Dynamics {
            writeAssignmentsToDynamics(input: $input) {
                clientMutationId
            }
        }
    }

    mutation updateAssignmentsFromDynamicsButton_ImportAssignmentsFromDynamicsMutation(
        $input: ImportAssignmentsFromDynamicsInput!
    ) {
        DynamicsPreCon {
            importAssignmentsFromDynamics(input: $input) {
                clientMutationId
            }
        }
    }

    query FileSelectionField_Query($fileId: ID!, $skip: Boolean!, $filterByFileTypes: [String!], $tagsIncluded: [String!]) {
        ...FilesTable_FilesListFragment @arguments(filterByFileTypes:$filterByFileTypes, tagsIncluded: $tagsIncluded)

        node(id: $fileId) @skip(if: $skip) {
            ...on File {
                name
                url
            }
        }
    }
