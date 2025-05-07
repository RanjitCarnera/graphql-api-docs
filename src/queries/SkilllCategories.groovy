
    query SkillCategorySelect_Query($filterByName: String, $alwaysIncludeIds: [ID!]) {
        Skills {
            SkillCategories(
                first: 20
                filterByName: $filterByName
                alwaysIncludeIds: $alwaysIncludeIds
            ) {
                edges {
                    node {
                        ...SkillCategorySelect_SkillCategoryFragment
                    }
                }
            }
        }
    }

    fragment SkillCategorySelect_SkillCategoryFragment on SkillCategory @inline {
        id
        name
    }

    query skillCategoriesTable_Query($first: Int, $filterByName: String) {
        ...skillCategoriesTable_QueryFragment @arguments(first: $first, filterByName: $filterByName)
    }

    fragment skillCategoriesTable_QueryFragment on Query
    @refetchable(queryName: "skillCategoriesTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Skills {
            SkillCategories(first: $first, after: $after, filterByName: $filterByName)
                @connection(key: "skillCategoriesTable_SkillCategories") {
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
                        ...editSkillCategoryButton_SkillCategoryFragment

                        ...SkillCategorySortOrderButtons_AssignmentRoleFragment
                    }
                }
            }
        }
    }

    fragment editSkillCategoryButton_SkillCategoryFragment on SkillCategory {
        id
        name
    }

    fragment SkillCategorySortOrderButtons_AssignmentRoleFragment on SkillCategory {
        id
        name
        sortOrder
    }

    mutation createSkillCategoryButton_CreateSkillCategoryMutation(
        $input: CreateSkillCategoryInput!
        $connections: [ID!]!
    ) {
        Skills {
            createSkillCategory(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...editSkillCategoryButton_SkillCategoryFragment
                    }
                }
            }
        }
    }

    mutation deleteSkillCategoriesButton_DeleteSkillCategoryMutation(
        $input: DeleteSkillCategoryInput!
        $connections: [ID!]!
    ) {
        Skills {
            deleteSkillCategory(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation editSkillCategoryButton_EditSkillCategoryMutation($input: EditSkillCategoryInput!) {
        Skills {
            editSkillCategory(input: $input) {
                edge {
                    node {
                        id
                        ...editSkillCategoryButton_SkillCategoryFragment
                    }
                }
            }
        }
    }

    mutation exportSkillCategoriesButton_ExportSkillCategoriesMutation {
        Skills {
            exportSkillCategories(input: {}) {
                file {
                    url
                }
            }
        }
    }

    mutation importSkillCategoriesButton_ImportSkillCategoriesMutation($input: ImportSkillCategoriesInput!) {
        Skills {
            importSkillCategories(input: $input) {
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

    mutation SkillCategorySortOrderButtons_IncreaseMutation(
        $input: IncreaseSkillCategorySortOrderInput!
    ) {
        Skills {
            increaseSkillCategorySortOrder(input: $input) {
                edge {
                    node {
                        id
                        sortOrder
                    }
                }
            }
        }
    }

    mutation SkillCategorySortOrderButtons_DecreaseMutation(
        $input: DecreaseSkillCategorySortOrderInput!
    ) {
        Skills {
            decreaseSkillCategorySortOrder(input: $input) {
                edge {
                    node {
                        id
                        sortOrder
                    }
                }
            }
        }
    }
