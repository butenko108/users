import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users: user {
      id
      first_name
      created_at
    }
  }
`;
