
    query AssignmentRoleSelect_Query($filterByName: String, $alwaysIncludeIds: [ID!]) {
        Assignments {
            AssignmentRoles(
                first: 100
                filterByName: $filterByName
                alwaysIncludeIds: $alwaysIncludeIds
            ) {
                edges {
                    node {
                        ...AssignmentRoleSelect_AssignmentRoleFragment
                    }
                }
            }
        }
    }

    fragment AssignmentRoleSelect_AssignmentRoleFragment on AssignmentRole @inline {
        id
        name
    }

    query AssignmentRolesSelect_Query($filterByName: String, $alwaysIncludeIds: [ID!]) {
        Assignments {
            AssignmentRoles(
                first: 100
                filterByName: $filterByName
                alwaysIncludeIds: $alwaysIncludeIds
            ) {
                edges {
                    node {
                        ...AssignmentRolesSelect_AssignmentRoleFragment
                    }
                }
            }
        }
    }

    fragment AssignmentRolesSelect_AssignmentRoleFragment on AssignmentRole @inline {
        id
        name
    }

    query assignmentRolesTable_Query($first: Int, $filterByName: String) {
        ...assignmentRolesTable_AssignmentRolesQueryFragment
            @arguments(first: $first, filterByName: $filterByName)
    }

    fragment assignmentRolesTable_AssignmentRolesQueryFragment on Query
    @refetchable(queryName: "assignmentRolesTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Assignments {
            AssignmentRoles(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "assignmentRolesTable_AssignmentRoles") {
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
                        sortOrder
                        maxNumberOfProjects
                        utilizationProjectionCapInMonths
                        countAsFullyAllocatedAtPercentage
                        countAsOverallocatedAtPercentage
                        ...editAssignmentRoleButton_AssignmentRoleFragment
                        ...AssignmentRoleSortOrderButtons_AssignmentRoleFragment
                    }
                }
            }
        }
    }

    mutation createAssignmentRoleButton_CreateAssignmentRoleMutation(
        $input: CreateAssignmentRoleInput!
        $connectionId: ID!
    ) {
        Assignment {
            createAssignmentRole(input: $input) {
                edge @appendEdge(connections: [$connectionId]) {
                    node {
                        id
                        ...editAssignmentRoleButton_AssignmentRoleFragment
                    }
                }
            }
        }
    }

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

    fragment AssignmentRoleSortOrderButtons_AssignmentRoleFragment on AssignmentRole {
        id
        sortOrder
    }

    mutation deleteAssignmentRolesButton_DeleteAssignmentRoleMutation(
        $input: DeleteAssignmentRoleInput!
        $connections: [ID!]!
    ) {
        Assignment {
            deleteAssignmentRole(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation editAssignmentRoleButton_EditAssignmentRoleMutation($input: EditAssignmentRoleInput!) {
        Assignment {
            editAssignmentRole(input: $input) {
                edge {
                    node {
                        id
                        ...editAssignmentRoleButton_AssignmentRoleFragment
                    }
                }
            }
        }
    }

    mutation exportAssignmentRolesButton_ExportAssignmentRolesMutation {
        Assignment {
            exportAssignmentRoles(input: {}) {
                file {
                    url
                }
            }
        }
    }

    mutation importAssignmentRolesButton_ImportAssignmentRolesMutation(
        $input: ImportAssignmentRolesInput!
    ) {
        Assignment {
            importAssignmentRoles(input: $input) {
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

    mutation AssignmentRoleSortOrderButtons_IncreaseMutation($input: IncreaseAssignmentRoleSortOrderInput!) {
        Assignment {
            increaseAssignmentRoleSortOrder(input: $input) {
                edge {
                    node {
                        id
                        sortOrder
                    }
                }
            }
        }
    }

    mutation AssignmentRoleSortOrderButtons_DecreaseMutation($input: DecreaseAssignmentRoleSortOrderInput!) {
        Assignment {
            decreaseAssignmentRoleSortOrder(input: $input) {
                edge {
                    node {
                        id
                        sortOrder
                    }
                }
            }
        }
    }

    mutation assignmentRolesTable_SetAssignmentRoleSortOrderMutation(
        $input: SetAssignmentRoleSortOrdersInput!
    ) {
        Assignment {
            setAssignmentRoleSortOrders(input: $input) {
                edges {
                    node {
                        ...editAssignmentRoleButton_AssignmentRoleFragment
                    }
                }
            }
        }
    }

    mutation editPersonSkillAssociationsModalContent_DisassociateSkillsByCategoryMutation(
        $input: DisassociateSkillsByCategoryInput!
        $connections: [ID!]!
    ) {
        Skills {
            disassociateSkillsByCategory(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        name
                        assignmentRole {
                            name
                        }
                        skills(first: 100) @connection(key: "Person_skills") {
                            edges {
                                node {
                                    id
                                    data {
                                        value {
                                            kind
                                            ... on BinaryAssessmentValue {
                                                hasSkill
                                                kind
                                            }
                                            ... on NumericalAssessmentValue {
                                                number
                                                kind
                                            }
                                        }
                                        skill {
                                            name
                                            dimension {
                                                kind
                                                ... on BinaryDimension {
                                                    kind
                                                }
                                                ... on NumericalDimension {
                                                    kind
                                                    dimensionExplanations
                                                    dimensionCount
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        ...EditPersonButton_PersonFragment
                        ...editPersonSkillAssociationsButton_PersonFragment
                    }
                }
            }
        }
    }
