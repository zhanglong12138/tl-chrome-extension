console.log("content loaded1");

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/App");
