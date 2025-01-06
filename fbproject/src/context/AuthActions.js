export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId, // The userId of the person being followed
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId, // The userId of the person being unfollowed
  });
  