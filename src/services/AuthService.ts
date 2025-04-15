/**
 * Simple Authentication Service
 * Simulates a 3-second authentication check
 */

class AuthService {
  // Simple function that returns true after 3 seconds
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call with 3 second delay
      setTimeout(() => {
        // Always return true for this simulation
        resolve(true);
      }, 3000);
    });
  }
}

// Export as singleton
export default new AuthService();
