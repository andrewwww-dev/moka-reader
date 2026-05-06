import { google } from "googleapis";
import { decryptText, encryptText } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

export function getDriveOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI,
  );
}

export function getDriveConsentUrl(state: string) {
  return getDriveOAuthClient().generateAuthUrl({
    access_type: "offline",
    include_granted_scopes: true,
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/drive.readonly"],
    state,
  });
}

export async function saveDriveTokens(userId: string, code: string) {
  const oauth2Client = getDriveOAuthClient();
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.access_token || !tokens.refresh_token) {
    throw new Error("Google Drive did not return the required tokens");
  }

  await prisma.driveToken.upsert({
    where: { userId },
    create: {
      userId,
      accessToken: encryptText(tokens.access_token),
      refreshToken: encryptText(tokens.refresh_token),
      expiresAt: new Date(tokens.expiry_date ?? Date.now() + 3600000),
      scope: tokens.scope ?? "https://www.googleapis.com/auth/drive.readonly",
    },
    update: {
      accessToken: encryptText(tokens.access_token),
      refreshToken: encryptText(tokens.refresh_token),
      expiresAt: new Date(tokens.expiry_date ?? Date.now() + 3600000),
      scope: tokens.scope ?? "https://www.googleapis.com/auth/drive.readonly",
    },
  });
}

export async function getDriveClient(userId: string) {
  const tokenRecord = await prisma.driveToken.findUnique({ where: { userId } });
  if (!tokenRecord) throw new Error("Drive not connected");

  const oauth2Client = getDriveOAuthClient();
  oauth2Client.setCredentials({
    access_token: decryptText(tokenRecord.accessToken),
    refresh_token: decryptText(tokenRecord.refreshToken),
    expiry_date: tokenRecord.expiresAt.getTime(),
  });

  oauth2Client.on("tokens", async (tokens) => {
    await prisma.driveToken.update({
      where: { userId },
      data: {
        accessToken: tokens.access_token
          ? encryptText(tokens.access_token)
          : tokenRecord.accessToken,
        refreshToken: tokens.refresh_token
          ? encryptText(tokens.refresh_token)
          : tokenRecord.refreshToken,
        expiresAt: new Date(tokens.expiry_date ?? Date.now() + 3600000),
      },
    });
  });

  return google.drive({ version: "v3", auth: oauth2Client });
}

export async function generateSignedUrl(userId: string, fileId: string) {
  const drive = await getDriveClient(userId);
  const auth = drive.context._options.auth;
  if (!auth || typeof auth === "string" || !("getAccessToken" in auth)) {
    throw new Error("Drive auth client is unavailable");
  }
  const token = await auth.getAccessToken();
  const accessToken = typeof token === "string" ? token : token?.token;
  if (!accessToken) throw new Error("Unable to create Drive access token");
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&access_token=${encodeURIComponent(accessToken)}`;
}
