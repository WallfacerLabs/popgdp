import { vi } from "vitest";

const { mockedGetSession } = vi.hoisted(() => ({ mockedGetSession: vi.fn() }));

vi.mock("@auth0/nextjs-auth0", () => ({ getSession: mockedGetSession }));
vi.mock("next/cache");
vi.mock("next/navigation");

export function mockUserSession(user: {
  id: string;
  credentialType: "orb" | "device";
}) {
  mockedGetSession.mockResolvedValue({
    user: {
      sub: `oauth2|worldcoin|${user.id}`,
      credentialType: user.credentialType,
    },
  });
}
