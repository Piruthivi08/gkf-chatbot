// Simple in-memory session storage for the chatbot
// Key → sessionId
// Value → { intent, step, data }

const chatSessions = new Map();

/**
 * Returns the session object for a user.
 * Creates a new one if not found.
 */
function getSession(sessionId) {
  if (!chatSessions.has(sessionId)) {
    chatSessions.set(sessionId, {
      intent: null,
      step: 0,
      data: {},
    });
  }
  return chatSessions.get(sessionId);
}

/**
 * Saves the updated session state.
 */
function saveSession(sessionId, sessionData) {
  chatSessions.set(sessionId, sessionData);
}

/**
 * Deletes a session completely (used after confirm/cancel)
 */
function clearSession(sessionId) {
  chatSessions.delete(sessionId);
}

module.exports = {
  getSession,
  saveSession,
  clearSession,
};
