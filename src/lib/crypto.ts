import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

function getKey() {
  const secret = process.env.DRIVE_TOKEN_ENCRYPTION_KEY ?? process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("Missing DRIVE_TOKEN_ENCRYPTION_KEY or NEXTAUTH_SECRET");
  }
  return createHash("sha256").update(secret).digest();
}

export function encryptText(value: string) {
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decryptText(value: string) {
  const [ivHex, encryptedHex] = value.split(":");
  if (!ivHex || !encryptedHex) return value;
  const decipher = createDecipheriv("aes-256-cbc", getKey(), Buffer.from(ivHex, "hex"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
