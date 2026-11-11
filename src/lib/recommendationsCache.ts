import type { Recommendation } from "../types/recommendation";

const CACHE_PREFIX = "mediavault:recommendations:";
const MIN_CACHE_TTL_MS = 3 * 24 * 60 * 60 * 1000;
const MAX_CACHE_TTL_MS = 4 * 24 * 60 * 60 * 1000;

const VOLATILE_CLAIMS = new Set(["iat", "exp", "nbf", "jti", "auth_time"]);

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

function extractUserId(payload: Record<string, unknown>): string | null {
  const candidates = [
    payload.id,
    payload._id,
    payload.userId,
    payload.user_id,
    payload.sub,
    payload.email,
    payload.username,
  ];

  const userId = candidates.find(
    (value): value is string => typeof value === "string" && value.length > 0
  );

  if (userId) return userId;

  const nestedUser = payload.user;
  if (nestedUser && typeof nestedUser === "object") {
    return extractUserId(nestedUser as Record<string, unknown>);
  }

  return null;
}

function getStableClaims(payload: Record<string, unknown>): string | null {
  const stable: Record<string, unknown> = {};

  for (const [claim, value] of Object.entries(payload)) {
    if (!VOLATILE_CLAIMS.has(claim)) stable[claim] = value;
  }

  if (Object.keys(stable).length === 0) return null;

  return JSON.stringify(stable);
}

function findExistingCacheKey(): string | null {
  let fallback: string | null = null;

  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key || !key.startsWith(CACHE_PREFIX)) continue;

    fallback ??= key;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const parsed = JSON.parse(raw) as Partial<StoredRecommendations>;

      if (
        Array.isArray(parsed.data) &&
        typeof parsed.expiresAt === "number" &&
        parsed.expiresAt > Date.now()
      ) {
        return key;
      }
    } catch {
      // Ignore malformed entries and keep looking.
    }
  }

  return fallback;
}

function getUserKey(token: string): string {
  const payload = decodeJwtPayload(token);

  if (payload) {
    const userId = extractUserId(payload);
    if (userId) return "u:" + hashToken(userId);

    // Tokens without a user identifier still get a key stable across logins:
    // ignore volatile claims such as iat/exp so a fresh token maps to the same entry.
    const stableClaims = getStableClaims(payload);
    if (stableClaims) return "u:" + hashToken(stableClaims);
  }

  // Opaque tokens cannot be matched to a user. Reuse whatever entry already
  // exists instead of creating a new one on every login.
  return findExistingCacheKey() ?? "t:" + hashToken(token);
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
    const raw = localStorage.getItem(key);

    // Overwrite an existing, unexpired entry while keeping its deadline so a
    // new login does not extend (or duplicate) the cache lifetime.
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<StoredRecommendations>;

        if (
          Array.isArray(parsed.data) &&
          typeof parsed.expiresAt === "number" &&
          parsed.expiresAt > now
        ) {
          const stored: StoredRecommendations = {
            data,
            savedAt:
              typeof parsed.savedAt === "number" ? parsed.savedAt : now,
            expiresAt: parsed.expiresAt,
          };

          localStorage.setItem(key, JSON.stringify(stored));
          return;
        }
      } catch {
        // Malformed entry: fall through and replace it with a fresh one.
      }
    }

    // Create the entry only when none exists (or the existing one has expired).
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

export function updateRecommendationsCache(
  key: string,
  data: Recommendation[]
): void {
  writeRecommendationsCache(key, data);
}
