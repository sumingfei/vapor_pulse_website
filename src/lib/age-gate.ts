export const AGE_GATE_KEY = "vp:age-verified";

/** How long a successful verification is remembered on the device. */
export const AGE_GATE_TTL_DAYS = 30;

/**
 * Runs before first paint. If this device has already verified, it marks the
 * document so CSS can hide the gate immediately — returning visitors never see
 * it flash. Kept tiny and dependency-free on purpose.
 */
export const AGE_GATE_INLINE_SCRIPT = `(function(){try{var r=localStorage.getItem(${JSON.stringify(
  AGE_GATE_KEY,
)});if(!r)return;var d=JSON.parse(r);if(d&&d.exp&&d.exp>Date.now()){document.documentElement.setAttribute("data-age-ok","")}else{localStorage.removeItem(${JSON.stringify(
  AGE_GATE_KEY,
)})}}catch(e){}})();`;

/**
 * Tiny external store so components can read the verification flag with
 * useSyncExternalStore — the correct primitive for a client-only value that
 * differs from what the server rendered.
 */
const listeners = new Set<() => void>();
let snapshot: boolean | null = null;

export function subscribeAgeVerification(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** Cached so repeated calls return a stable value. */
export function getAgeVerificationSnapshot(): boolean {
  if (snapshot === null) snapshot = readAgeVerification();
  return snapshot;
}

/** The server always renders the gate; CSS hides it pre-paint if verified. */
export function getAgeVerificationServerSnapshot(): boolean {
  return false;
}

export function readAgeVerification(): boolean {
  try {
    const raw = window.localStorage.getItem(AGE_GATE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { exp?: number };
    return Boolean(parsed?.exp && parsed.exp > Date.now());
  } catch {
    return false;
  }
}

export function writeAgeVerification() {
  try {
    window.localStorage.setItem(
      AGE_GATE_KEY,
      JSON.stringify({
        exp: Date.now() + AGE_GATE_TTL_DAYS * 24 * 60 * 60 * 1000,
      }),
    );
    document.documentElement.setAttribute("data-age-ok", "");
  } catch {
    // Private browsing or storage disabled — the gate simply shows again.
  }

  snapshot = true;
  listeners.forEach((listener) => listener());
}
