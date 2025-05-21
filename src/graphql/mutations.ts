import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($object: user_insert_input!) {
    insert_user_one(object: $object) {
      id
      first_name
      created_at
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($pkColumns: user_pk_columns_input!, $set: user_set_input) {
    update_user_by_pk(pk_columns: $pkColumns, _set: $set) {
      id
      first_name
      created_at
    }
  } 
`;

export const DELETE_USER = gql`
  mutation delete_user_by_pk($id: uuid!) {
    delete_user_by_pk(id: $id) {
      id
    }
  }
`;
