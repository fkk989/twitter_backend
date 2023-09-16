import { prismaClient } from "../../clients/db";
import { user } from "../../graphQl/user";
import salt from "../../store/hashSatl";
import bcrypt from "bcrypt";

export class UserServices {
  //  create
  public static async createUser(
    lowercaseEmail: string,
    firstName: string,
    lastName: string,
    userPasswrod: string,
    profileImageUrl: string | undefined
  ) {
    const Hashedsalt = await salt;

    userPasswrod = await bcrypt.hash(userPasswrod, Hashedsalt);
    await prismaClient.user.create({
      data: {
        email: lowercaseEmail,
        firstName: firstName,
        lastName: lastName,
        password: userPasswrod,
        profileImageUrl: profileImageUrl,
      },
    });
  }

  // follow
  public static async followUser(from: string, to: string) {
    await prismaClient.follows.create({
      data: {
        follower: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
  }
  // unfollowUser
  public static async unfollowUser(from: string, to: string) {
    await prismaClient.follows.delete({
      where: {
        followerId_followingId: { followerId: from, followingId: to },
      },
    });
  }

  // get followers
  public static async getFollowers(userId: string) {
    const followsTalbe = await prismaClient.follows.findMany({
      where: { following: { id: userId } },
    });

    const followerArray = followsTalbe.map(async (elem) => {
      const followerId = elem.followerId;
      return await prismaClient.user.findUnique({
        where: { id: followerId },
      });
    });

    return followerArray;
  }

  // get following
  public static async getFollowing(userId: string) {
    const followsTalbe = await prismaClient.follows.findMany({
      where: { follower: { id: userId } },
    });

    const followingArray = followsTalbe.map(async (elem) => {
      const followingId = elem.followingId;
      return await prismaClient.user.findUnique({
        where: { id: followingId },
      });
    });

    return followingArray;
  }
}
