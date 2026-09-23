/**
 * Cryptographic Token Service for BELOKIRI
 * Uses Web Crypto API (HMAC-SHA256) compatible with both Node.js and Edge Runtime.
 * Prevents session forgery and cookie tampering.
 */

const DEFAULT_SECRET = "belokiri-production-secret-salt-2026-min-32-chars-long";

function getSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SECRET;
}

const encoder = new TextEncoder();

/**
 * Import HMAC key from secret string
 */
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret) as unknown as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Convert Uint8Array to base64url string
 */
function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Convert base64url string to Uint8Array backed by pure ArrayBuffer
 */
function base64UrlToUint8Array(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encode string to base64url
 */
function stringToBase64Url(str: string): string {
  return uint8ArrayToBase64Url(encoder.encode(str));
}

/**
 * Decode base64url string to utf-8 text
 */
function base64UrlToString(base64url: string): string {
  const bytes = base64UrlToUint8Array(base64url);
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

/**
 * Sign a payload object with HMAC-SHA256.
 * Output format: `<base64UrlPayload>.<base64UrlSignature>`
 */
export async function signToken<T extends object>(
  payload: T
): Promise<string> {
  const secret = getSecret();
  const key = await getCryptoKey(secret);

  const jsonString = JSON.stringify({
    ...payload,
    _signedAt: Date.now(),
  });

  const payloadB64 = stringToBase64Url(jsonString);
  const dataToSign = encoder.encode(payloadB64);

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    dataToSign as unknown as BufferSource
  );
  const signatureB64 = uint8ArrayToBase64Url(new Uint8Array(signatureBuffer));

  return `${payloadB64}.${signatureB64}`;
}

/**
 * Verify a token's HMAC-SHA256 signature and return the decoded payload.
 * Returns null if signature is invalid or tampering is detected.
 */
export async function verifyToken<T>(token: string): Promise<T | null> {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payloadB64, signatureB64] = parts;
  if (!payloadB64 || !signatureB64) {
    return null;
  }

  try {
    const secret = getSecret();
    const key = await getCryptoKey(secret);

    const dataToVerify = encoder.encode(payloadB64);
    const signatureBytes = base64UrlToUint8Array(signatureB64);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as unknown as BufferSource,
      dataToVerify as unknown as BufferSource
    );

    if (!isValid) {
      return null;
    }

    const jsonString = base64UrlToString(payloadB64);
    const data = JSON.parse(jsonString) as T;

    return data;
  } catch {
    return null;
  }
}
