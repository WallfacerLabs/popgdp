let user = {};

export function getSession() {
  return {
    user,
  };
}

export function setUser(newUser: any) {
  user = newUser;
}

export function clearSession() {
  user = {};
}
