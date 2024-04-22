let user = {};

export function getSession() {
  return {
    user,
  };
}

export function setUser(newUser: {
  id: string;
  credentialType: "orb" | "device";
}) {
  user = {
    sub: `oauth2|worldcoin|${newUser.id}`,
    credentialType: newUser.credentialType,
  };
}

export function clearSession() {
  user = {};
}
