

    query SelectUserField_Query(
        $filterByName: String
        $alwaysIncludeIds: [ID!]
        $excludeIds: [ID!]
    ) {
        Admin {
            Management {
                UsersAdmin(
                    first: 20
                    filterByName: $filterByName
                    alwaysIncludeIds: $alwaysIncludeIds
                    excludeIds: $excludeIds
                ) {
                    edges {
                        node {
                            id
                            ...SelectUserField_UserFragment
                        }
                    }
                }
            }
        }
    }

    fragment SelectUserField_UserFragment on User @inline {
        id
        name
    }

    query UsersTable_Query($first: Int) {
        ...UsersTable_UsersListFragment @arguments(first: $first)

    }

    fragment UsersTable_UsersListFragment on Query @refetchable(queryName: "UsersTable_Refetch") @argumentDefinitions(
        first: {type: "Int", defaultValue: 20},
        after: {type: "String"},
    ){
        Admin {
            Management {
                UsersAdmin(first: $first, after: $after)  @connection(key: "UsersTable_UsersAdmin"){
                    __id
                    edges {
                        node {
                            id
                            name
                            email
                            activated
                            groupAssociations {
                                account {
                                    name
                                }
                                group {
                                    id
                                    name
                                }
                            }
                            ...EditUserButton_UserFragment
                            ...AnonymizeUserButton_UserFragment
                        }
                    }
                }
            }
        }
    }

    fragment EditUserButton_UserFragment on User {
        id
        name
        email
        activated
    }

    fragment AnonymizeUserButton_UserFragment on User {
        id
        name
    }

    query selectUserInAccountGroupsOfAccountAdminField_Query($accountId: ID!) {
        Admin {
            Management {
                UserInAccountGroupsInAccountAdmin(first: 50, accountId: $accountId) {
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

    query userInAccountGroupsTable_Query($first: Int) {
        ...userInAccountGroupsTable_GroupListFragment @arguments(first: $first)
    }

    fragment userInAccountGroupsTable_GroupListFragment on Query
    @refetchable(queryName: "userInAccountGroupsTable_Refetch")
    @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" }) {
        Management {
            Groups(first: $first, after: $after)
                @connection(key: "userInAccountGroupsTable_Groups") {
                __id
                edges {
                    node {
                        ...userInAccountGroupsTable_userInAccountGroupInlineFragment
                    }
                }
            }
        }
    }

    query usersInAccountAdminTable_Query($first: Int, $accountId: ID!) {
        ...usersInAccountAdminTable_UsersInAccountListFragment
            @arguments(first: $first, accountId: $accountId)
    }

    fragment usersInAccountAdminTable_UsersInAccountListFragment on Query
    @refetchable(queryName: "usersInAccountAdminTable_Refetch")
    @argumentDefinitions(
        accountId: { type: "ID!" }
        first: { type: "Int", defaultValue: 20 }
        after: { type: "String" }
    ) {
        Admin {
            Management {
                UsersInAccountAdmin(accountId: $accountId, first: $first, after: $after)
                    @connection(key: "usersInAccountAdminTable_UsersInAccountAdmin") {
                    __id
                    pageInfo {
                        endCursor
                        hasPreviousPage
                        hasNextPage
                        startCursor
                    }
                    edges {
                        node {
                            ...usersInAccountAdminTable_UserInlineFragment
                        }
                    }
                }
            }
        }
    }

    fragment usersInAccountAdminTable_UserInlineFragment on UserInAccount @inline {
        id
        user {
            id
            email
            name
            activated
        }
        groups {
            id
            name
        }
        ...ChangeUserGroupsAdminButton_UserInAccountFragment
    }

    fragment ChangeUserGroupsAdminButton_UserInAccountFragment on UserInAccount {
        ...ChangeUserGroupsAdminModal_UserInAccountFragment
    }

    query usersInAccountTable_Query($first: Int) {
        ...usersInAccountTable_UsersInAccountListFragment @arguments(first: $first)
    }

    fragment usersInAccountTable_UsersInAccountListFragment on Query
    @refetchable(queryName: "usersInAccountTable_Refetch")
    @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" }) {
        Management {
            UsersInAccount(first: $first, after: $after)
                @connection(key: "usersInAccountTable_UsersInAccount") {
                __id
                edges {
                    node {
                        id
                        user {
                            id
                            email
                            name
                        }
                        groups {
                            id
                            name
                        }
                        ...changeUserInAccountGroupsButton_UserInAccountFragment
                    }
                }
            }
        }
    }

    fragment changeUserInAccountGroupsButton_UserInAccountFragment on UserInAccount {
        ...changeUserInAccountGroupsModal_UserInAccountFragment
    }

    fragment changeUserInAccountGroupsModal_UserInAccountFragment on UserInAccount {
        id
        user {
            id
        }
        groups {
            id
        }
    }

    query PermissionBasedNavigation_Query {
        Viewer {
            Auth {
                currentUser {
                    ...PermissionBasedNavigation_CurrentUser
                }
            }
        }
    }

    fragment PermissionBasedNavigation_CurrentUser on CurrentUser @inline {
        permissionsInAccount
        user {
            name
            id
            extension {
                ... on HarkinsUserExtensionAndId {
                    showBudget
                    preferredViewType
                    showVolumePerPerson
                }
            }
        }
        accounts {
            id
            name
        }
    }

    query AcceptInvitationScreen_Query($token: String!) {
        Auth {
            InvitationByToken(token: $token) {
                invitingUserName
                accountName
            }
        }
    }
----
    query personalDataScreen_Query {
        ...ChangeShowBudgetForm_CurrentUser
        ...volumePerPersonForm_CurrentUser
        ...preferredViewTypeForm_CurrentUser
        ...twoFactorAuthForm_QueryFragment
    }

    fragment ChangeShowBudgetForm_CurrentUser on Query {
        Viewer {
            Auth {
                currentUser {
                    user {
                        extension {
                            ... on HarkinsUserExtensionAndId {
                                showBudget
                            }
                        }
                    }
                }
            }
        }
    }

    fragment volumePerPersonForm_CurrentUser on Query {
        Viewer {
            Auth {
                currentUser {
                    user {
                        extension {
                            ... on HarkinsUserExtensionAndId {
                                showVolumePerPerson
                            }
                        }
                    }
                }
            }
        }
    }

    fragment preferredViewTypeForm_CurrentUser on Query {
        Viewer {
            Auth {
                currentUser {
                    user {
                        extension {
                            ... on HarkinsUserExtensionAndId {
                                preferredViewType
                            }
                        }
                    }
                }
            }
        }
    }

    fragment twoFactorAuthForm_QueryFragment on Query {
        Viewer {
            Auth {
                twoFactorAuthToken {
                    id
                    createdAt
                    data {
                        isActivated
                    }
                }
            }
        }
        ...authenticatorAppSlot_QueryFragment
        ...recoveryCodesSlot_QueryFragment
    }

    fragment authenticatorAppSlot_QueryFragment on Query {
        Viewer {
            Auth {
                twoFactorAuthToken {
                    ...authenticatorAppSlot_TwoFactorAuthTokenInlineFragment
                }
            }
        }
    }

    fragment authenticatorAppSlot_TwoFactorAuthTokenInlineFragment on TwoFactorAuthToken @inline {
        id
        data {
            isActivated
            activatedAt
        }
    }

    fragment recoveryCodesSlot_QueryFragment on Query {
        Viewer {
            Auth {
                recoveryCodeCredentials {
                    ...recoveryCodesSlot_RecoveryCodeCredentialsInlineFragment
                }
                twoFactorAuthToken {
                    data {
                        isActivated
                    }
                }
            }
        }
    }

    fragment recoveryCodesSlot_RecoveryCodeCredentialsInlineFragment on RecoveryCodeCredentials
    @inline {
        id
        data {
            credentials
        }
    }

    mutation AnonymizeUserButton_DeleteMutation($input: DeleteUserInput!, $connections: [ID!]!) {
        Admin {
            Auth {
                deleteUser(input: $input) {
                    deletedIds @deleteEdge(connections: $connections)
                    clientMutationId
                }
            }
        }

    }

    mutation ChangeUserGroupsAdminModal_ChangeMutation($input: ChangeUserGroupsAdminInput!) {
        Admin {
            Management {
                changeUserGroupsAdmin(input: $input) {
                    edge {
                        node {
                            id
                            ...ChangeUserGroupsAdminModal_UserInAccountFragment
                        }
                    }
                }
            }
        }
    }

    fragment ChangeUserGroupsAdminModal_UserInAccountFragment on UserInAccount {
        id
        user {
            id
        }
        groups {
            id
        }
    }

    mutation EditUserButton_EditMutation($input: EditUserInput!) {
        Admin {
            Auth {
                editUser(input: $input) {
                    user {
                        ...EditUserButton_UserFragment
                    }
                }
            }
        }
    }


    fragment EditUserButton_UserFragment on User {
        id
        name
        email
        activated
    }

    mutation InviteUserToAccountModal_InviteMutation(
        $input: InviteUserToAccountInput!
        $connections: [ID!]!
    ) {
        Management {
            inviteUserToAccount(input: $input) {
                edge @appendEdge(connections: $connections) {
                    cursor
                    node {
                        id
                        email
                        invitingUserName
                    }
                }
            }
        }
    }

    mutation LoginAsUsersControl_LoginAsUserMutation($input: LoginAsUserJwtInput!) {
        Admin {
            Auth {
                loginAsUserJwt(input: $input) {
                    jwtTokens {
                        accessToken
                        refreshToken
                    }
                }
            }
        }
    }

    mutation RemoveUserFromAccountAdminButton_RemoveMutation($input: RemoveUserFromAccountAdminInput!, $connections: [ID!]!) {
        Admin {
            Management {
                removeUserFromAccountAdmin(input: $input) {
                    deletedIds @deleteEdge(connections: $connections)
                }
            }
        }
    }

    mutation RemoveUserFromAccountButton_RemoveMutation($input: RemoveUserFromAccountInput!, $connections: [ID!]!) {
        Management {
            removeUserFromAccount(input: $input) {
                deletedIds @deleteEdge(connections: $connections)
            }
        }
    }

    mutation changeUserInAccountGroupsModal_ChangeMutation(
        $input: ChangeUserInAccountGroupsInput!
    ) {
        Management {
            changeUserInAccountGroups(input: $input) {
                edge {
                    node {
                        id
                        ...changeUserInAccountGroupsModal_UserInAccountFragment
                    }
                }
            }
        }
    }

    fragment changeUserInAccountGroupsModal_UserInAccountFragment on UserInAccount {
        id
        user {
            id
        }
        groups {
            id
        }
    }

    mutation createUserInAccountModal_CreateMutation(
        $input: CreateUserInAccountAdminInput!
        $connections: [ID!]!
    ) {
        Admin {
            Management {
                createUserInAccountAdmin(input: $input) {
                    edge @appendEdge(connections: $connections) {
                        node {
                            id
                            user {
                                id
                                email
                                name
                            }
                            groups {
                                id
                                name
                            }
                            ...ChangeUserGroupsAdminButton_UserInAccountFragment
                        }
                    }
                }
            }
        }
    }

    fragment ChangeUserGroupsAdminModal_UserInAccountFragment on UserInAccount {
        id
        user {
            id
        }
        groups {
            id
        }
    }

    mutation createUserInAccountModal_AddMutation(
        $input: AddUserToAccountAdminInput!
        $connections: [ID!]!
    ) {
        Admin {
            Management {
                addUserToAccountAdmin(input: $input) {
                    edge @appendEdge(connections: $connections) {
                        node {
                            id
                            user {
                                id
                                email
                                name
                            }
                            groups {
                                id
                                name
                            }
                            ...ChangeUserGroupsAdminButton_UserInAccountFragment
                        }
                    }
                }
            }
        }
    }

    mutation editUserInAccountGroupModal_CreateMutation(
        $input: CreateGroupInput!
        $connections: [ID!]!
    ) {
        Management {
            createGroup(input: $input) {
                edge @appendEdge(connections: $connections) {
                    node {
                        id
                        ...editUserInAccountGroupModal_GroupFragment
                    }
                }
            }
        }
    }

    fragment editUserInAccountGroupModal_GroupFragment on UserInAccountGroup {
        id
        name
        permissions
    }

    mutation AcceptInvitationScreen_AcceptInvitationWithNewUserMutation(
        $input: AcceptInviteWithNewUserInput!
    ) {
        Management {
            acceptInvitationWithNewUser(input: $input) {
                clientMutationId
            }
        }
    }

    mutation ActivateScreen_ActivateMutation($input: ActivateUserInput!){
        Auth{
            activateUser(input: $input) {
                clientMutationId
            }
        }
    }

    mutation loginForm_LoginMutation($input: LoginJwtInput!) {
        Auth {
            loginJwt(input: $input) {
                status {
                    kind
                    ... on TwoFactorAuthRequired {
                        qrCodeUri
                        userName
                        password
                        email
                    }
                    ... on twoFactorAuthCredentialsIncorrect {
                        email
                        password
                        userName
                    }
                    ... on authCredentialsCorrect {
                        jwtTokens {
                            refreshToken
                            accessToken
                        }
                    }
                }
            }
        }
    }

    mutation loginForm_LoginAzureAdUserMutation(
        $input: LoginAzureAdUserWithHarkinsUserExtensionInput!
    ) {
        Sso {
            loginAzureAdUserWithHarkinsUserExtension(input: $input) {
                jwtTokens {
                    accessToken
                    refreshToken
                }
            }
        }
    }


    query accountSettingsScreen_Query {
        ...ChangeLogoForm_CurrentUser
        ...editNumericalDimensionExplanationsForm_QueryFragment
        ...editAccountSettingsForm_QueryFragment
        ...editAssessmentPasswordForm_QueryFragment
        ...editAzureAdSsoConfigurationForm_QueryFragment
    }

    fragment ChangeLogoForm_CurrentUser on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on AccountSettingsAccountExtension {
                            kind
                            logo {
                                id
                            }
                        }
                    }
                }
            }
        }
    }

    fragment editNumericalDimensionExplanationsForm_QueryFragment on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on AccountSettingsAccountExtension {
                            kind
                            numericalDimensionExplanations
                        }
                    }
                }
            }
        }
    }

    fragment editAccountSettingsForm_QueryFragment on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on TwoFAAccountExtension {
                            kind
                            force2FA
                        }
                    }
                }
            }
        }
    }

    fragment editAssessmentPasswordForm_QueryFragment on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on AssessmentAccountExtension {
                            kind
                            password
                        }
                    }
                }
            }
        }
    }

    fragment editAzureAdSsoConfigurationForm_QueryFragment on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on TwoFAAccountExtension {
                            force2FA
                            kind
                        }
                        ... on AuthProviderAccountExtension {
                            kind
                            authProviders {
                                ... on AzureAdAuthProvider {
                                    isActivated
                                    applicationId
                                    authorityUrl
                                    domain
                                    tenantId
                                    secret
                                    kind
                                }
                            }
                        }
                    }
                }
            }
        }
    }
