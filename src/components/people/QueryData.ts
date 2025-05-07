
export const peopleQueryExamples = {
  javascript: `// Fetching people with pagination and filtering
const query = \`
  query PeopleTable_Query($first: Int, $filterByName: String) {
    ...PeopleTable_PeopleListFragment @arguments(first: $first, filterByName: $filterByName)
  }
\`;

const variables = {
  first: 20,
  filterByName: "John"
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`,
  python: `import requests

query = '''
query PeopleTable_Query($first: Int, $filterByName: String) {
  ...PeopleTable_PeopleListFragment @arguments(first: $first, filterByName: $filterByName)
}
'''

variables = {
  'first': 20,
  'filterByName': 'John'
}

response = requests.post(
    'https://api.constructionintelligence.com/graphql',
    json={
        'query': query,
        'variables': variables
    },
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    }
)

print(response.json())`
};

export const personSelectExamples = {
  javascript: `// Person selection with filtering and exclusions
const query = \`
query PersonSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
    Staff {
        People(
            first: 20
            excludeIds: $excludeIds
            filterByName: $filterByName
            alwaysIncludeIds: $alwaysIncludeIds
        ) {
            edges {
                node {
                    ...PersonSelect_PersonFragment
                }
            }
        }
    }
}
\`;

const variables = {
  filterByName: "Smith",
  excludeIds: ["person-123"],
  alwaysIncludeIds: ["person-456"]
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
};

export const selectUserInAccountExamples = {
  javascript: `// Selecting users within a specific account
const query = \`
query selectUserInAccountField_PeopleQuery(
    $accountId: ID!
    $filterByName: String
    $alwaysIncludeIds: [ID!]
    $excludeIds: [ID!]
    $first: Int
) {
    Assessment {
        PeopleInAccount(
            accountId: $accountId
            first: $first
            filterByName: $filterByName
            alwaysIncludeIds: $alwaysIncludeIds
            excludeIds: $excludeIds
        ) {
            edges {
                node {
                    ...selectUserInAccountField_PersonFragment
                }
            }
        }
    }
}
\`;

const variables = {
  accountId: "account-789",
  first: 15,
  filterByName: "Johnson",
  excludeIds: [],
  alwaysIncludeIds: []
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
};

export const peopleSelectExamples = {
  javascript: `// Multiple people selection with filtering
const query = \`
query peopleSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
    Staff {
        People(
            first: 20
            excludeIds: $excludeIds
            filterByName: $filterByName
            alwaysIncludeIds: $alwaysIncludeIds
        ) {
            edges {
                node {
                    ...peopleSelect_PersonFragment
                }
            }
        }
    }
}
\`;

const variables = {
  filterByName: "Anderson",
  excludeIds: ["person-111", "person-222"],
  alwaysIncludeIds: ["person-333"]
};

fetch('https://api.constructionintelligence.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query,
    variables
  })
})
.then(res => res.json())
.then(data => console.log(data));`
};

export const peopleTableResponseExample = `{
  "data": {
    "Staff": {
      "People": {
        "__id": "client:People:0",
        "pageInfo": {
          "endCursor": "cursor-20",
          "hasPreviousPage": false,
          "hasNextPage": true,
          "startCursor": "cursor-1"
        },
        "edges": [
          {
            "node": {
              "id": "person-001",
              "name": "John Smith"
            }
          },
          {
            "node": {
              "id": "person-002",
              "name": "John Doe"
            }
          }
        ]
      }
    }
  }
}`;

export const queryStructures = {
  peopleTable: `query PeopleTable_Query($first: Int, $filterByName: String) {
  ...PeopleTable_PeopleListFragment @arguments(first: $first, filterByName: $filterByName)
}`,
  personSelect: `query PersonSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
    Staff {
        People(
            first: 20
            excludeIds: $excludeIds
            filterByName: $filterByName
            alwaysIncludeIds: $alwaysIncludeIds
        ) {
            edges {
                node {
                    ...PersonSelect_PersonFragment
                }
            }
        }
    }
}`,
  selectUserInAccount: `query selectUserInAccountField_PeopleQuery(
    $accountId: ID!
    $filterByName: String
    $alwaysIncludeIds: [ID!]
    $excludeIds: [ID!]
    $first: Int
) {
    Assessment {
        PeopleInAccount(
            accountId: $accountId
            first: $first
            filterByName: $filterByName
            alwaysIncludeIds: $alwaysIncludeIds
            excludeIds: $excludeIds
        ) {
            edges {
                node {
                    ...selectUserInAccountField_PersonFragment
                }
            }
        }
    }
}`,
  peopleSelect: `query peopleSelect_Query($filterByName: String, $excludeIds: [ID!], $alwaysIncludeIds: [ID!]) {
    Staff {
        People(
            first: 20
            excludeIds: $excludeIds
            filterByName: $filterByName
            alwaysIncludeIds: $alwaysIncludeIds
        ) {
            edges {
                node {
                    ...peopleSelect_PersonFragment
                }
            }
        }
    }
}`
};
