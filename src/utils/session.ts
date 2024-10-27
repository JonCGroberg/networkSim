// Using the built-in crypto library for a secure random ID
export function generateSessionId() {
    const randomBytes = new Uint8Array(16); // 128 bits
    crypto.getRandomValues(randomBytes);

    // Convert to hex string
    let sessionId = "";
    for (const byte of randomBytes) {
        sessionId += byte.toString(16).padStart(2, "0");
    }

    return sessionId;
}
