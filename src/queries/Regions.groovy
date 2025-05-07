
    query RegionSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
        Region {
            Regions(first: 20, excludeIds: $excludeIds, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...RegionSelect_RegionFragment
                    }
                }
            }
        }
    }

    fragment RegionSelect_RegionFragment on Region @inline{
        id
        name
    }


    query RegionsSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
        Region {
            Regions(first: 20, excludeIds: $excludeIds, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...RegionsSelect_RegionFragment
                    }
                }
            }
        }
    }

    fragment RegionsSelect_RegionFragment on Region @inline{
        id
        name
    }


    query RegionsTable_Query($first: Int, $filterByName: String) {
        ...RegionsTable_RegionListFragment @arguments(first: $first, filterByName: $filterByName)
    }

    fragment RegionsTable_RegionListFragment on Query
    @refetchable(queryName: "RegionsTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Region {
            Regions(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "RegionsTable_Regions") {
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
                        ...EditRegionButton_RegionFragment
                    }
                }
            }
        }
    }

    fragment EditRegionButton_RegionFragment on Region {
        ...EditRegionModal_RegionFragment
    }

    fragment EditRegionModal_RegionFragment on Region {
        id
        name
    }

    mutation EditRegionModal_EditMutation($input: EditRegionInput!) {
        Region {
            editRegion(input: $input) {
                edge {
                    node {
                        id
                        ...EditRegionButton_RegionFragment
                    }
                }
            }
        }
    }

    mutation DeleteRegionsButton_DeleteMutation($input: DeleteRegionInput!, $connections: [ID!]!) {
        Region {
            deleteRegion(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation EditRegionModal_CreateMutation($input: CreateRegionInput!, $connections: [ID!]!) {
        Region {
            createRegion(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...EditRegionButton_RegionFragment
                    }
                }
            }
        }
    }

    mutation ExportRegionsButton_ExportMutation {
        Region {
            exportRegions(input: {}) {
                file {
                    url
                }
            }
        }
    }

    mutation ImportRegionsButton_ImportMutation($input: ImportRegionsInput!) {
        Region {
            importRegions(input: $input) {
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
