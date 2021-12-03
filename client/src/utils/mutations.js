export const ADD_USER = gql`
  mutation addUser($email: String, $username: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
