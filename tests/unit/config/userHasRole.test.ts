import { UserPermission, userHasRole } from "@/config/userPermissions";
import { afterEach, describe, expect, test, it } from "vitest";
import { clearSession, setUser } from '../../helpers/getSession'
import { db } from "@/drizzle/db";
import { Moderator, Reviewer, User } from "@/drizzle/schema";

describe('userHasRole', () => {

  afterEach(async () => {
    await db.delete(Moderator);
    await db.delete(User);
    await db.delete(Reviewer);
    clearSession();
  });

  const ethereumAddress = '0x88009922334455'
  const id = '0'

  async function createModerator() {
    await db.insert(Moderator).values({ ethereumAddress })
    await db.insert(User).values({ id, ethereumAddress})
  }

  async function createReviewer() {
    await db.insert(Reviewer).values({ ethereumAddress })
    await db.insert(User).values({ id, ethereumAddress})
  }

  async function createBlocked() {
    await db.insert(User).values({ id, ethereumAddress, isBlocked: true })
  }

  async function createOrbVerified() {
    await db.insert(User).values({ id, ethereumAddress, })
  }

  it('no user', async () => {
    expect(await userHasRole(UserPermission.visitor)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
    expect(await userHasRole(UserPermission.blocked)).toBe(false);
    expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
  })

  it.skip('moderator', async () => {
    await createModerator()
    setUser({ sub: `oauth2|worldcoin|${id}`, credentialType: 'orb' });
    expect(await userHasRole(UserPermission.moderator)).toBe(true);
    expect(await userHasRole(UserPermission.blocked)).toBe(false);
    // expect(await userHasRole(UserPermission.reviewer)).toBe(false);
    // expect(await userHasRole(UserPermission.orbVerified)).toBe(false);
    // expect(await userHasRole(UserPermission.deviceVerified)).toBe(false);
    expect(await userHasRole(UserPermission.visitor)).toBe(false);
  })

  it('blocked', async () => {
    await createBlocked()
    setUser({ sub: `oauth2|worldcoin|${id}`, credentialType: 'orb' });
    expect(await userHasRole(UserPermission.blocked)).toBe(true);
    expect(await userHasRole(UserPermission.visitor)).toBe(true);
  })

  it.skip('orb verified', async () => {
    // no need for checking in the db? really?
    setUser({ sub: `oauth2|worldcoin|${id}`, credentialType: 'orb' });
    expect(await userHasRole(UserPermission.orbVerified)).toBe(true);
  })

  it('reviewer', async () => {
    await createReviewer()
    setUser({ sub: `oauth2|worldcoin|${id}`, credentialType: 'orb' });
    expect(await userHasRole(UserPermission.reviewer)).toBe(true);
    expect(await userHasRole(UserPermission.moderator)).toBe(false);
    expect(await userHasRole(UserPermission.blocked)).toBe(false);
  })
})