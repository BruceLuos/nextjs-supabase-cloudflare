"use server";

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import type { Tables } from "@/types_db";
import { revalidatePath } from "next/cache";
import { cache } from "react";

/** server action 导出需要包裹aysnc */
function asyncFunction<T extends (...params: any[]) => Promise<any>>(fn: T) {
  return (async (...params: Parameters<T>) => {
    return fn(...params);
  }) as T;
}

export type Users = Tables<"users">;
export type Orders = Tables<"orders">;

/** 获取已登录用户信息 */
export async function getAuthUserData() {
  const supabase = createClient();
  // 记录查询开始的时间
  const startTime = new Date().getTime();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // 记录查询结束的时间
  const endTime = new Date().getTime();

  // 计算查询时间
  const queryTime = endTime - startTime;

  console.log(`查询时间：${queryTime} 毫秒`);
  // return JSON.parse(JSON.stringify(user));
  return user;
}

/** 获取已登录用户信息from session */
export async function getAuthUserDataFromSession() {
  const supabase = createClient();
  // 记录查询开始的时间
  const startTime = new Date().getTime();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // 记录查询结束的时间
  const endTime = new Date().getTime();

  // 计算查询时间
  const queryTime = endTime - startTime;

  console.log(`user session查询时间：${queryTime} 毫秒`);
  // return JSON.parse(JSON.stringify(session?.user)) ;
  return session?.user;
}

/** 根据用户名获取用户id */
export async function getUserIdByUsername(username: string) {
  const supabase = createClient();
  const { data: userData, error } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  if (error) {
    throw new Error(`User ID select failed: ${error.message}`);
  }

  return userData;
}

/** 获取指定用户数据 */
export const getUserData = async (userId: string) => {
  const supabase = createClient();

  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("userData lookup failed", error);
    // 不存在
    if (error.code === "PGRST116") {
      return notFound();
    }
    throw new Error(`⚠️ userData lookup failed: ${error.message}`);
  }

  return userData;
};

/** 根据用户名获取指定用户数据 */
export const getUserDataByUsername = async (username: string) => {
  console.log("username", username);
  const supabase = createClient();
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.log("account", error);
    // 用户不存在
    if (error.code === "PGRST116") {
      return notFound();
    }
    // 其他错误
    throw new Error(`⚠️ userData lookup failed: ${error.message}`);
  }

  return userData;
};

/** 查询所有用户数据的总数 */
export async function selectAllUsersCount() {
  const supabase = createClient();
  const { count: totalUsers, error: countError } = await supabase
    .from("users")
    .select("id", { count: "exact" });

  if (countError) {
    throw new Error(`Count users failed: ${countError.message}`);
  }

  return totalUsers;
}

/** 获取所有用户数据 */
export const getAllUsersData = async (
  page: number = 1,
  pageSize: number = 10
) => {
  const supabase = createClient();
  const { data: usersData, error } = await supabase
    .from("users")
    .select("*")
    .order("plan_used", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize);

  if (error) {
    console.log("account", error);
    throw new Error(`⚠️ usersData lookup failed: ${error.message}`);
  }

  const totalUsers = await selectAllUsersCount();

  return { users: usersData, total: totalUsers };
};

/** 更新指定用户积分情况 */
export const updateUserPoints = async (
  userId: string,
  newPoints: {
    plan_used: number;
    today_used: number;
    total_used: number;
    updated_at: string;
  }
) => {
  const supabase = createClient();

  const { error: userUpdateError } = await supabase
    .from("users")
    .update(newPoints)
    .eq("id", userId);

  if (userUpdateError)
    throw new Error(`Users update failed: ${userUpdateError.message}`);

  console.log("用户信息更新成功");
};

/** 更新指定用户积分 */
export const updateUserPointsAction = async (user: Users) => {
  // 需要消耗的积分
  const costPoints = parseInt(
    process.env.NEXT_PUBLIC_PRODUCT_COST_POINTS as string
  );

  // 计算新的积分
  const newPlanUsed = (user?.plan_used || 0) + costPoints;
  const newTodayUsed = (user?.today_used || 0) + costPoints;
  const newTotalUsed = (user?.total_used || 0) + costPoints;

  // 更新用户积分情况
  await updateUserPoints(user.id, {
    plan_used: newPlanUsed,
    today_used: newTodayUsed,
    total_used: newTotalUsed,
    updated_at: new Date().toISOString(),
  });
};

/** 重新刷新页面数据缓存 */
export async function clearCacheServerAction(path?: string) {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/");
    }
  } catch (error) {
    console.error("clearCachesByServerAction=> ", error);
  }
}

/** 根据用户id,查询修改的用户名是否已经存在 */
export async function selectUsername(userId: string, username: string) {
  const supabase = createClient();

  // 查看修改的用户名是否已经存在
  const { data: existingUser, error: userCheckError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();

  // 已存在
  if (existingUser && existingUser.id !== userId) {
    return true;
  }
  return false;
}

/** 根据用户id，更新用户头像 */
export async function updateAvatar(userId: string, avatarUrl: string) {
  const supabase = createClient();
  const { error: userUpdateError } = await supabase
    .from("users")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);

  revalidatePath(``);

  if (userUpdateError) {
    throw new Error(`User update failed: ${userUpdateError.message}`);
  }
}

/** 根据用户id，更新用户名字 */
export async function updateUsername(userId: string, username: string) {
  const supabase = createClient();

  // 更新用户名
  const { error: userUpdateError } = await supabase
    .from("users")
    .update({ username })
    .eq("id", userId);

  revalidatePath(`/@${username}`);

  if (userUpdateError) {
    throw new Error(`User update failed: ${userUpdateError.message}`);
  }
}
