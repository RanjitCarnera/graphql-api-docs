account group


    query SelectGroupField_Query {
        Management {
            Groups(first: 50) {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }

    query selectAccountGroupsField_Query {
        Admin {
            Management {
                AccountGroups(first: 50) {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        }
    }

    mutation ChangeAccountGroupsAdminModal_ChangeMutation($input: ChangeAccountGroupsInput!) {
        Admin {
            Management {
                changeAccountGroups(input: $input) {
                    account {
                        groupAssociations {
                            group {
                                id
                                name
                            }
                        }
                    }
                }
            }
        }
    }

    mutation DeleteGroupButton_DeleteMutation($input: DeleteGroupInput!, $connections: [ID!]!) {
        Management {
            deleteGroup(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }
