import { URL_REGEXP } from "@/constants/regExps";

const SUPPORTED_URL_PROTOCOLS = new Set(["http:", "https:"]);

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return "about:blank";
    }
  } catch {
    return url;
  }
  return url;
}

export function validateUrl(url: string): boolean {
  return url === "https://" || URL_REGEXP.test(url);
}
