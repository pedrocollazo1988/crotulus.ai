import { Redis } from "@upstash/redis";

export function getRedis() {
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
throw new Error("Faltan las variables de entorno de Upstash Redis.");
}

return new Redis({ url, token });
}
