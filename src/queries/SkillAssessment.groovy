
    query skillAssessmentLogin_Query($accountId: ID!) {
        Assessment {
            AccountLogo(accountId: $accountId) {
                url
            }
        }
    }
  query selectSkillAssessmentTemplates_AssessmentTemplatesQuery($accountId: ID!) {
        Assessment {
            AssessmentTemplates(accountId: $accountId, first: 20) {
                edges {
                    node {
                        name
                        id
                    }
                }
            }
        }
    }
 fragment skillAssessmentTemplatesTable_AssessmentTemplateFragment on AssessmentTemplate
    @inline {
        id
        name
        associatedRoles {
            name
            id
        }
        assessedSkills {
            name
            id
        }
        distributionList {
            emails
            role
        }
        ...editTemplateButton_AssessmentTemplateFragment
    }   
     fragment editTemplateButton_AssessmentTemplateFragment on AssessmentTemplate {
        name
        id
        assessedSkills {
            id
            name
            skillCategory {
                id
                name
            }
        }
        associatedRoles {
            id
            name
        }
        distributionList {
            role
            emails
        }
    }

    query skillAssessment_Query(
        $accountId: ID!
        $password: String
        $personId: ID
        $templateId: ID
    ) {
        Assessment {
            AccountLogo(accountId: $accountId) {
                url
            }
        }
        ...skillAssessment_GetLastUpdatedDateQuery
            @arguments(
                accountId: $accountId
                password: $password
                personId: $personId
                templateId: $templateId
            )
    }

    fragment skillAssessment_GetLastUpdatedDateQuery on Query
    @refetchable(queryName: "skillAssessment_Refetch")
    @argumentDefinitions(
        accountId: { type: "ID!" }
        password: { type: "String" }
        personId: { type: "ID" }
        templateId: { type: "ID" }
    ) {
        Assessment {
            GetContinueFromDate(
                accountId: $accountId
                password: $password
                personId: $personId
                templateId: $templateId
            ) @connection(key: "skillAssessment_GetContinueFrom")
        }
    }

    query skillAssessmentSuccess_AssessmentNodeQuery($accountId: ID!, $id: ID!, $password: String) {
        Assessment {
            MyAssessment(accountId: $accountId, assessmentId: $id, password: $password) {
                id
                person {
                    name
                }
                template {
                    name
                }
            }
        }
    }

   
    query skillAssessmentsTable_Query($first: Int, $after: String) {
        Viewer {
            Auth {
                currentAccount {
                    id
                }
            }
        }
        ...skillAssessmentsTable_AssessmentsFragment @arguments(first: $first, after: $after)
    }

    fragment skillAssessmentsTable_AssessmentsFragment on Query
    @refetchable(queryName: "skillAssessmentsTable_Refetch")
    @argumentDefinitions(
        first: { type: "Int", defaultValue: 250 }
        last: { type: "Int" }
        after: { type: "String" }
        before: { type: "String" }
        filterByName: { type: "String" }
    ) {
        Admin {
            Assessment {
                Assessments(
                    last: $last
                    before: $before
                    after: $after
                    first: $first
                    filterByName: $filterByName
                ) @connection(key: "skillAssessmentsTable_Assessments") {
                    __id
                    pageInfo {
                        endCursor
                        hasPreviousPage
                        hasNextPage
                        startCursor
                    }
                    edges {
                        node {
                            ...skillAssessmentsTable_AssessmentInlineFragment
                        }
                    }
                }
            }
        }
    }

    fragment skillAssessmentsTable_AssessmentInlineFragment on Assessment @inline {
        id
        person {
            name
            id
        }
        supervisor {
            name
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
            ... on PdfGenerated {
                kind
                finishedAt
                file {
                    id
                    name
                    url
                }
            }
        }
        skillAssessments {
            skill {
                id
                dimension {
                    kind
                }
                name
                skillCategory {
                    id
                    name
                }
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
        template {
            id
            name
            assessedSkills {
                id
            }
            associatedRoles {
                id
            }
        }
        createdAt
        ...revertToAssessmentButton_AssessmentFragment
    }

    fragment revertToAssessmentButton_AssessmentFragment on Assessment {
        id
        person {
            id
        }
        ...revertToAssessmentForm_AssessmentFragment
    }

    fragment revertToAssessmentForm_AssessmentFragment on Assessment {
        id
        status {
            ... on PdfGenerated {
                finishedAt
            }
        }
        template {
            name
        }
        skillAssessments {
            skill {
                name
            }
            value {
                kind
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
        person {
            id
            name
        }
    }

    query skillAssessments_Query {
        Viewer {
            Auth {
                currentAccount {
                    id
                }
            }
        }
    }

    mutation skillAssessmentLogin_LoginToAssessmentMutation($input: LoginToAssessmentInput!) {
        Assessment {
            loginToAssessment(input: $input) {
                password
            }
        }
    }

    mutation skillAssessment_StartAssessmentMutation($input: StartAssessmentInput!) {
        Assessment {
            startAssessment(input: $input) {
                assessment {
                    id
                }
            }
        }
    }

    mutation skillAssessmentExecution_AnswerAssessmentMutation($input: AnswerAssessmentInput!) {
        Assessment {
            answerAssessment(input: $input) {
                assessment {
                    id
                    ...skillAssessmentExecution_AssessmentFragment
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

    mutation skillAssessmentExecution_SubmitAssessmentMutation($input: SubmitAssessmentInput!) {
        Assessment {
            submitAssessment(input: $input) {
                assessment {
                    id
                    ...skillAssessmentExecution_AssessmentFragment
                }
            }
        }
    }

    mutation skillAssessmentTemplatesTable_DeleteAssessmentTemplateMutation(
        $input: DeleteAssessmentTemplateInput!
        $connections: [ID!]!
    ) {
        Assessment {
            deleteAssessmentTemplate(input: $input) {
                clientMutationId
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation skillAssessmentsTable_TestAssessmentFinalizationMutation(
        $input: TestAssessmentFinalizationInput!
    ) {
        Admin {
            Assessment {
                testAssessmentFinalization(input: $input) {
                    assessment {
                        id
                        status {
                            ... on PdfGenerated {
                                file {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    mutation editAssessmentPasswordForm_SetAccountAssessmentPasswordMutation(
        $input: SetAccountAssessmentPasswordInput!
    ) {
        Admin {
            Auth {
                setAccountAssessmentPassword(input: $input) {
                    account {
                        id
                    }
                }
            }
        }
    }

    mutation revertToAssessmentButton_RevertToAssessmentMutation($input: RevertToAssessmentInput!) {
        Admin {
            Assessment {
                revertToAssessment(input: $input) {
                    clientMutationId
                }
            }
        }
    }

    mutation deleteAssessmentsButton_DeleteAssessmentMutation(
        $input: DeleteAssessmentInput!
        $connections: [ID!]!
    ) {
        Admin {
            Assessment {
                deleteAssessment(input: $input) {
                    deletedIds @deleteEdge(connections: $connections)
                }
            }
        }
    }

   

    mutation deleteAssessmentTemplatesButton_DeleteAssessmentTemplateMutation(
        $input: DeleteAssessmentTemplateInput!
        $connections: [ID!]!
    ) {
        Assessment {
            deleteAssessmentTemplate(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
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

    fragment categoryForm_SkillCategoryFragment on SkillCategory {
        name
        id
        sortOrder
    }

    fragment categoryForm_AssessmentTemplateFragment on AssessmentTemplate {
        assessedSkills {
            skillCategory {
                name
                id
                sortOrder
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

    fragment numericalSkillTooltipIcon_SkillFragment on Skill {
        dimension {
            kind
            ... on NumericalDimension {
                dimensionExplanations
                dimensionCount
            }
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