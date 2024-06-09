import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($user: UserLoginInput!) {
    loginUser(user: $user) {
      user {
        username
        email
      }
      token
      message
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserInput!) {
    registerUser(user: $user) {
      username
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserProfileInput!) {
    updateUser(user: $user) {
      username
      email
      phone
      name
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      username
      email
      phone
      name
    }
  }
`;
