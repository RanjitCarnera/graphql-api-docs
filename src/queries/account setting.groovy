
    query BaseSettingsScreen_Query {
        ...baseScreen_QueryFragment
    }

    mutation editAccountSettingsForm_SetAccountSettingsMutation($input: SetForce2FAInput!) {
        Admin {
            Auth {
                setForce2FA(input: $input) {
                    account {
                        extensions {
                            ... on TwoFAAccountExtension {
                                force2FA
                            }
                        }
                    }
                    clientMutationId
                }
            }
        }
    }
 fragment baseScreen_QueryFragment on Query {
        Viewer {
            Auth {
                currentAccount {
                    extensions {
                        kind
                        ... on AccountSettingsAccountExtension {
                            kind
                            logo {
                                ...BaseHeader_LogoFragment
                            }
                        }
                    }
                }
            }
        }
    } fragment BaseHeader_LogoFragment on File {
        url
    }