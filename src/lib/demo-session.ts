import { randomUUID } from "node:crypto";
import { getRedis } from "@/lib/redis";

const SESSION_PREFIX = "crotulus:demo:session:";
const SESSION_TTL_SECONDS = 24 * 60 * 60;
const MAX_MESSAGES = 15;
const MAX_REQUESTS_PER_MINUTE = 5;

export type DemoSessionResult =
  | {
      allowed: true;
      sessionId: string;
      messagesRemaining: number;
    }
  | {
      allowed: false;
      reason: "limit" | "rate";
      messagesRemaining: number;
    };

export async function checkDemoSession(
  requestedSessionId: unknown
): Promise<DemoSessionResult> {
  const redis = getRedis();
  const sessionId =
    typeof requestedSessionId === "string" &&
    /^[0-9a-f-]{36}$/i.test(requestedSessionId)
      ? requestedSessionId
      : randomUUID();

  const sessionKey = `${SESSION_PREFIX}${sessionId}`;
  const rateKey = `${sessionKey}:rate`;

  const currentMessages = Number(
    (await redis.get<number>(sessionKey)) ?? 0
  );

  if (currentMessages >= MAX_MESSAGES) {
    return {
      allowed: false,
      reason: "limit",
      messagesRemaining: 0,
    };
  }

  const requests = await redis.incr(rateKey);

  if (requests === 1) {
    await redis.expire(rateKey, 60);
  }

  if (requests > MAX_REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      reason: "rate",
      messagesRemaining: MAX_MESSAGES - currentMessages,
    };
  }

  await redis.incr(sessionKey);
  await redis.expire(sessionKey, SESSION_TTL_SECONDS);

  return {
    allowed: true,
    sessionId,
    messagesRemaining: MAX_MESSAGES - currentMessages - 1,
  };
}
