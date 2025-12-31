declare module "$env/static/public" {
  /**
   * Public env vars exposed to client code
   * Add any PUBLIC_* values you reference in your code here.
   */
  export const PUBLIC_DV_KEY: string;
  export const PUBLIC_BASE_URL: string;

  /**
   * Public env vars used within Vite preprocessing plugins
   */
}
