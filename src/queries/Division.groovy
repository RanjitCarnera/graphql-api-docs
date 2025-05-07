
    query DivisionSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
        Division {
            Divisions(first: 20, excludeIds: $excludeIds, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...DivisionSelect_DivisionFragment
                    }
                }
            }
        }
    }

    fragment DivisionSelect_DivisionFragment on Division @inline{
        id
        name
    }


    query DivisionsSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
        Division {
            Divisions(first: 20, excludeIds: $excludeIds, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...DivisionsSelect_DivisionFragment
                    }
                }
            }
        }
    }

    fragment DivisionsSelect_DivisionFragment on Division @inline{
        id
        name
    }


    query DivisionsTable_Query($first: Int, $filterByName: String) {
        ...DivisionsTable_DivisionListFragment
            @arguments(first: $first, filterByName: $filterByName)
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

    fragment EditDivisionButton_DivisionFragment on Division {
        ...EditDivisionModal_DivisionFragment
    }

    fragment EditDivisionModal_DivisionFragment on Division {
        id
        name
    }

    mutation EditDivisionModal_EditMutation($input: EditDivisionInput!) {
        Division {
            editDivision(input: $input) {
                edge {
                    node {
                        id
                        ...EditDivisionButton_DivisionFragment
                    }
                }
            }
        }
    }


    mutation deleteDivisionButton_DeleteDivisionMutation(
        $input: DeleteDivisionInput!
        $connections: [ID!]!
    ) {
        Division {
            deleteDivision(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation exportDivisionsButton_ExportDivisionsMutation {
        Division {
            exportDivisions(input: {}) {
                file {
                    url
                }
            }
        }
    }

    mutation importDivisionsButton_ImportDivisionsMutation($input: ImportDivisionsInput!) {
        Division {
            importDivisions(input: $input) {
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

    mutation EditDivisionModal_CreateMutation($input: CreateDivisionInput!, $connections: [ID!]!) {
        Division {
            createDivision(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...EditDivisionButton_DivisionFragment
                    }
                }
            }
        }
    }
