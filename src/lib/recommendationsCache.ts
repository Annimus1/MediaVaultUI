import type { Recommendation } from "../types/recommendation";

const CACHE_PREFIX = "mediavault:recommendations:";
const MIN_CACHE_TTL_MS = 3 * 24 * 60 * 60 * 1000;
const MAX_CACHE_TTL_MS = 4 * 24 * 60 * 60 * 1000;

interface StoredRecommendations {
  data: Recommendation[];
  savedAt: number;
  expiresAt: number;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);

    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function hashToken(token: string): string {
  let hash = 5381;
  for (let index = 0; index < token.length; index++) {
    hash = ((hash << 5) + hash + token.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function getUserKey(token: string): string {
  const payload = decodeJwtPayload(token);

  if (payload) {
    const candidates = [
      payload.id,
      payload._id,
      payload.userId,
      payload.user_id,
      payload.sub,
      payload.email,
      payload.username,
      payload.user,
    ];

    const userId = candidates.find(
      (value): value is string => typeof value === "string" && value.length > 0
    );

    if (userId) return "u:" + hashToken(userId);
  }

  return "t:" + hashToken(token);
}

export function getRecommendationsCacheKey(token: string): string {
  return CACHE_PREFIX + getUserKey(token);
}

export function readRecommendationsCache(
  key: string
): Recommendation[] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredRecommendations>;

    if (!Array.isArray(parsed.data) || typeof parsed.expiresAt !== "number") {
      localStorage.removeItem(key);
      return null;
    }

    if (Date.now() >= parsed.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

export function writeRecommendationsCache(
  key: string,
  data: Recommendation[]
): void {
  try {
    const now = Date.now();
    const ttl =
      MIN_CACHE_TTL_MS + Math.random() * (MAX_CACHE_TTL_MS - MIN_CACHE_TTL_MS);
    const stored: StoredRecommendations = {
      data,
      savedAt: now,
      expiresAt: now + ttl,
    };

    localStorage.setItem(key, JSON.stringify(stored));
  } catch {
    // Ignore quota or privacy-mode errors; recommendations still work in memory.
  }
}

