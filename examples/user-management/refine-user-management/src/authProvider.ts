import { AuthBindings } from "@refinedev/core";

import { skybaseClient } from "./utility";

const authProvider: AuthBindings = {
  login: async ({ email }) => {
    try {
      const { error } = await skybaseClient.auth.signInWithOtp({ email });

      if (!error) {
        alert("Check your email for the login link!");
        return {
          success: true,
        };
      };
        
      throw error;
    } catch (e: any) {
      alert(e.message);
      return {
        success: false,
        e,
      };
    }
  },
  logout: async () => {
    const { error } = await skybaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await skybaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getIdentity: async () => {
    const { data } = await skybaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      };
    }

    return null;
  },
};

export default authProvider;
