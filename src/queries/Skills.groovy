
    query SkillsSelect_Query($filterBySkillCategoryRef: ID) {
        Skills {
            Skills(first: 250, filterBySkillCategoryRef: $filterBySkillCategoryRef) {
                edges {
                    node {
                        id
                        name
                        dimension {
                            kind
                            ... on BinaryDimension {
                                kind
                            }
                            ... on NumericalDimension {
                                kind
                                dimensionCount
                            }
                        }
                    }
                }
            }
        }
    }

    query SkillsTable_Query($first: Int, $filterByName: String, $filterBySkillCategoryRef: ID) {
        ...SkillsTable_SkillsListFragment
            @arguments(
                first: $first
                filterByName: $filterByName
                filterBySkillCategoryRef: $filterBySkillCategoryRef
            )
    }

    fragment SkillsTable_SkillsListFragment on Query
    @refetchable(queryName: "SkillsTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
        filterByName: { type: "String" }
        filterBySkillCategoryRef: { type: "ID" }
    ) {
        Skills {
            Skills(
                first: $first
                after: $after
                filterByName: $filterByName
                filterBySkillCategoryRef: $filterBySkillCategoryRef
            ) @connection(key: "SkillsTable_Skills") {
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
                        skillCategory {
                            id
                            name
                            sortOrder
                        }
                        ...editSkillButton_SkillFragment
                    }
                }
            }
        }
    }

    fragment editSkillButton_SkillFragment on Skill {
        id
        name
        skillCategory {
            id
        }
        description
        dimension {
            kind
            ... on NumericalDimension {
                kind
                dimensionCount
                dimensionExplanations
            }
            ... on BinaryDimension {
                kind
            }
        }
    }

    query skillAssessmentExecution_Query($accountId: ID!, $assessmentId: ID!, $password: String) {
        Assessment {
            MyAssessment(accountId: $accountId, assessmentId: $assessmentId, password: $password) {
                person {
                    id
                    name
                }
                supervisor {
                    id
                    name
                }
                template {
                    id
                    name
                    assessedSkills {
                        id
                        name
                        skillCategory {
                            id
                            name
                            sortOrder
                            ...categoryForm_SkillCategoryFragment
                        }
                        dimension {
                            ... on NumericalDimension {
                                kind
                                dimensionCount
                                dimensionExplanations
                            }
                            ... on BinaryDimension {
                                kind
                            }
                        }
                    }
                    ...categoryForm_AssessmentTemplateFragment
                }
                skillAssessments {
                    skill {
                        id
                        name
                        dimension {
                            ... on NumericalDimension {
                                kind
                                dimensionCount
                                dimensionExplanations
                            }
                            ... on BinaryDimension {
                                kind
                            }
                        }
                    }
                    value {
                        ... on NumericalAssessmentValue {
                            kind
                            number
                        }
                        ... on BinaryAssessmentValue {
                            kind
                            hasSkill
                        }
                    }
                }
                status {
                    kind
                    ... on InProgress {
                        kind
                        lastUpdate
                    }
                    ... on Finished {
                        kind
                        finishedAt
                    }
                }
                ...categoryForm_AssessmentFragment
                ...navigation_AssessmentFragment
                ...skillAssessmentExecution_AssessmentFragment
            }
        }
    }

    fragment categoryForm_AssessmentFragment on Assessment {
        skillAssessments {
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
        }
        template {
            assessedSkills {
                id
                name
                dimension {
                    ... on BinaryDimension {
                        kind
                    }
                    ... on NumericalDimension {
                        kind
                        dimensionCount
                        dimensionExplanations
                    }
                }
                description
                skillCategory {
                    id
                    name
                    sortOrder
                }
                ...numericalSkillTooltipIcon_SkillFragment
            }
            name
        }
    }

    fragment navigation_AssessmentFragment on Assessment {
        id
        supervisor {
            name
        }
        template {
            name
        }
        createdAt
        person {
            name
        }
        status {
            kind
            ... on Finished {
                kind
            }
            ... on PdfGenerated {
                kind
                file {
                    url
                    name
                }
            }
        }

        skillAssessments {
            value {
                ... on NumericalAssessmentValue {
                    number
                    kind
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
                    ... on NumericalDimension {
                        kind
                        dimensionCount
                    }
                    ... on BinaryDimension {
                        kind
                    }
                }
                skillCategory {
                    id
                    name
                }
            }
        }
    }

    fragment skillAssessmentExecution_AssessmentFragment on Assessment {
        id
        status {
            kind
            ... on InProgress {
                kind
            }
            ... on PdfGenerated {
                kind
            }
            ... on Finished {
                kind
            }
        }
        template {
            assessedSkills {
                id
                dimension {
                    ... on BinaryDimension {
                        kind
                    }
                    ... on NumericalDimension {
                        dimensionCount
                        kind
                    }
                }
            }
        }
        skillAssessments {
            skill {
                id
            }
            value {
                kind
                ... on BinaryAssessmentValue {
                    kind
                    hasSkill
                }
                ... on NumericalAssessmentValue {
                    kind
                    number
                }
            }
        }
        status {
            kind
            ... on InProgress {
                kind
            }
            ... on PdfGenerated {
                kind
            }
        }
    }

    fragment numericalSkillTooltipIcon_SkillFragment on Skill {
        dimension {
            kind
            ... on NumericalDimension {
                dimensionExplanations
                dimensionCount
            }
        }
    }

    query skillMultiSelect_Query($filterByName: String, $alwaysIncludeIds: [ID!]) {
        Skills {
            Skills(first: 250, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...skillMultiSelect_SkillFragment
                    }
                }
            }
        }
    }

    fragment skillMultiSelect_SkillFragment on Skill @inline {
        name
        id
    }

    query skillMultiSelectV2_Query($filterByName: String, $alwaysIncludeIds: [ID!]) {
        Skills {
            Skills(first: 250, filterByName: $filterByName, alwaysIncludeIds: $alwaysIncludeIds) {
                edges {
                    node {
                        ...skillMultiSelectV2_SkillFragment
                    }
                }
            }
        }
    }

    fragment skillMultiSelectV2_SkillFragment on Skill @inline {
        name
        id
        skillCategory {
            id
            name
        }
    }

    query editPersonSkillAssociationsModalContent_SkillsQuery {
        Skills {
            Skills(first: 200) {
                edges {
                    node {
                        ...editPersonSkillAssociationsModalContent_SkillInlineFragment
                    }
                }
            }
        }
    }

    mutation DeleteSkillsButton_DeleteMutation($input: DeleteSkillInput!, $connections: [ID!]!) {
        Skills {
            deleteSkill(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation ExportSkillsButton_ExportMutation {
        Skills {
            exportSkills(input: {}) {
                file {
                    url
                }
            }
        }
    }

    mutation ImportSkillsButton_ImportMutation($input: ImportSkillsInput!) {
        Skills {
            importSkills(input: $input) {
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

    mutation createSkillButton_CreateMutation($input: CreateSkillInput!, $connections: [ID!]!) {
        Skills {
            createSkill(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...editSkillButton_SkillFragment
                    }
                }
            }
        }
    }

    mutation editBinarySkillAssociationModal_AssociateSkillMutation($input: AssociateSkillInput!) {
        Skills {
            associateSkill(input: $input) {
                edge {
                    node {
                        skills(first: 100) {
                            edges {
                                node {
                                    data {
                                        skill {
                                            id
                                            name
                                            dimension {
                                                kind
                                                ... on BinaryDimension {
                                                    kind
                                                }
                                                ... on NumericalDimension {
                                                    kind
                                                }
                                            }
                                        }
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
                                    ...editSkillAssociationModal_SkillAssociationFragment
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

    fragment editSkillAssociationModal_SkillAssociationFragment on SkillAssociation {
        id
        data {
            value {
                ... on NumericalAssessmentValue {
                    kind
                    number
                }
                ... on BinaryAssessmentValue {
                    kind
                    hasSkill
                }
            }
            skill {
                name
                skillCategory {
                    name
                }
                dimension {
                    ... on BinaryDimension {
                        kind
                    }
                    ... on NumericalDimension {
                        dimensionCount
                        kind
                    }
                }
            }
        }

        ...editNumericalSkillAssociationModal_SkillAssociationFragment
        ...editBinarySkillAssociationModal_SkillAssociationFragment
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

    fragment editPersonSkillAssociationsButton_PersonFragment on Person {
        name
        ...editPersonSkillAssociationsModalContent_PersonFragment
    }

    fragment editPersonSkillAssociationsModalContent_PersonFragment on Person {
        id
        name
        skills(first: 100) @connection(key: "Person_skills") {
            __id
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
                        skill {
                            id
                            name
                            dimension {
                                ... on NumericalDimension {
                                    kind
                                    dimensionCount
                                    dimensionExplanations
                                }
                                ... on BinaryDimension {
                                    kind
                                }
                            }
                        }
                    }
                    ...editSkillAssociationModal_SkillAssociationFragment
                }
            }
        }
        ...editSkillAssociationModal_PersonFragment
    }

    fragment editSkillAssociationModal_PersonFragment on Person {
        name
        id
        ...editNumericalSkillAssociationModal_PersonFragment
        ...editBinarySkillAssociationModal_PersonFragment
    }

    fragment editNumericalSkillAssociationModal_PersonFragment on Person {
        id
        name
    }

    fragment editBinarySkillAssociationModal_PersonFragment on Person {
        id
        name
    }

    fragment editNumericalSkillAssociationModal_SkillAssociationFragment on SkillAssociation {
        id
        data {
            skill {
                id
                name
                skillCategory {
                    name
                }
                dimension {
                    ... on BinaryDimension {
                        kind
                    }
                    ... on NumericalDimension {
                        dimensionCount
                        kind
                    }
                }
            }
            value {
                ... on BinaryAssessmentValue {
                    hasSkill
                    kind
                }
                ... on NumericalAssessmentValue {
                    number
                    kind
                }
            }
        }
    }

    fragment editBinarySkillAssociationModal_SkillAssociationFragment on SkillAssociation {
        id
        data {
            value {
                ... on BinaryAssessmentValue {
                    kind
                    hasSkill
                }
                ... on NumericalAssessmentValue {
                    kind
                    number
                }
            }
            skill {
                id
                name
                skillCategory {
                    name
                }
                dimension {
                    ... on BinaryDimension {
                        kind
                    }
                    ... on NumericalDimension {
                        dimensionCount
                        kind
                    }
                }
            }
        }
    }

    mutation editBinarySkillAssociationModal_DisassociateSkillMutation(
        $input: DisassociateSkillInput!
    ) {
        Skills {
            disassociateSkill(input: $input) {
                edge {
                    node {
                        skills(first: 100) {
                            edges {
                                node {
                                    data {
                                        skill {
                                            id
                                            name
                                            dimension {
                                                kind
                                                ... on BinaryDimension {
                                                    kind
                                                }
                                                ... on NumericalDimension {
                                                    kind
                                                }
                                            }
                                        }
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
                                    ...editSkillAssociationModal_SkillAssociationFragment
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

    mutation editNumericalSkillAssociationModal_AssociateSkillMutation(
        $input: AssociateSkillInput!
    ) {
        Skills {
            associateSkill(input: $input) {
                edge {
                    node {
                        skills(first: 100) {
                            edges {
                                node {
                                    data {
                                        skill {
                                            id
                                            name
                                            dimension {
                                                kind
                                                ... on BinaryDimension {
                                                    kind
                                                }
                                                ... on NumericalDimension {
                                                    kind
                                                }
                                            }
                                        }
                                        value {
                                            ... on NumericalAssessmentValue {
                                                number
                                                kind
                                            }
                                            ... on BinaryAssessmentValue {
                                                hasSkill
                                                kind
                                            }
                                        }
                                    }
                                    ...editSkillAssociationModal_SkillAssociationFragment
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

    mutation editNumericalSkillAssociationModal_DisassociateSkillMutation(
        $input: DisassociateSkillInput!
    ) {
        Skills {
            disassociateSkill(input: $input) {
                edge {
                    node {
                        skills(first: 100) {
                            edges {
                                node {
                                    data {
                                        skill {
                                            id
                                            name
                                            dimension {
                                                kind
                                                ... on BinaryDimension {
                                                    kind
                                                }
                                                ... on NumericalDimension {
                                                    kind
                                                }
                                            }
                                        }
                                        value {
                                            ... on NumericalAssessmentValue {
                                                number
                                                kind
                                            }
                                            ... on BinaryAssessmentValue {
                                                hasSkill
                                                kind
                                            }
                                        }
                                    }
                                    ...editSkillAssociationModal_SkillAssociationFragment
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

    mutation editSkillButton_CreateMutation($input: CreateSkillInput!, $connections: [ID!]!) {
        Skills {
            createSkill(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...editSkillButton_SkillFragment
                    }
                }
            }
        }
    }

    mutation editSkillButton_EditMutation($input: EditSkillInput!) {
        Skills {
            editSkill(input: $input) {
                edge {
                    node {
                        id
                        ...editSkillButton_SkillFragment
                    }
                }
            }
        }
    }
