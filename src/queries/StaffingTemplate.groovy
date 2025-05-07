
    query StaffingTemplateSelect_Query($filterByName: String,  $alwaysIncludeIds: [ID!]) {
        Template {
            StaffingTemplates(first: 20, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...StaffingTemplateSelect_StaffingTemplateFragment
                    }
                }
            }
        }
    }

    fragment StaffingTemplateSelect_StaffingTemplateFragment on StaffingTemplate @inline{
        id
        name
    }


    query StaffingTemplatesTable_Query($first: Int, $filterByName: String) {
        ...StaffingTemplatesTable_StaffingTemplateListFragment
            @arguments(first: $first, filterByName: $filterByName)
    }


    fragment StaffingTemplatesTable_StaffingTemplateListFragment on Query
    @refetchable(queryName: "StaffingTemplatesTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Template {
            StaffingTemplates(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "StaffingTemplatesTable_StaffingTemplates") {
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
                        assignmentRoleAssociations {
                            assignmentRole {
                                id
                                name
                            }
                            isExecutive
                        }
                        ...EditStaffingTemplateButton_StaffingTemplateFragment
                    }
                }
            }
        }
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

    mutation DeleteStaffingTemplatesButton_DeleteMutation($input: DeleteStaffingTemplateInput!, $connections: [ID!]!) {
        Template {
            deleteStaffingTemplate(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }

    }

    mutation EditStaffingTemplateModal_CreateMutation(
        $input: CreateStaffingTemplateInput!
        $connections: [ID!]!
    ) {
        Template {
            createStaffingTemplate(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...EditStaffingTemplateButton_StaffingTemplateFragment
                    }
                }
            }
        }
    }

    mutation EditStaffingTemplateModal_EditMutation($input: EditStaffingTemplateInput!) {
        Template {
            editStaffingTemplate(input: $input) {
                edge {
                    node {
                        id
                        ...EditStaffingTemplateButton_StaffingTemplateFragment
                    }
                }
            }
        }
    }

    mutation ExportStaffingTemplatesButton_ExportMutation {
        Template {
            exportStaffingTemplates(input: {}) {
                file {
                    url
                }
            }
        }
    }

    mutation ImportStaffingTemplatesButton_ImportMutation($input: ImportStaffingTemplatesInput!) {
        Template {
            importStaffingTemplates(input: $input) {
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

