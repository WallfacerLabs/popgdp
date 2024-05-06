import { vi } from "vitest";

const { mockedGetSession } = vi.hoisted(() => ({ mockedGetSession: vi.fn() }));

vi.mock("@auth0/nextjs-auth0", () => ({ getSession: mockedGetSession }));
vi.mock("next/cache");
vi.mock("next/navigation");
vi.mock("next/headers");

interface MockUserSessionArgs {
  userId: string;
  credentialType: "orb" | "device";
}

export function mockUserSession({
  credentialType,
  userId,
}: MockUserSessionArgs) {
  mockedGetSession.mockResolvedValue({
    user: {
      sub: `oauth2|worldcoin|${userId}`,
      credentialType,
    },
  });
}
