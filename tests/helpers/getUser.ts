export const getUser = (newUser: {
  id: string;
  credentialType: "orb" | "device";
}) =>
  ({
    sub: `oauth2|worldcoin|${newUser.id}`,
    credentialType: newUser.credentialType,
  }) as const;
