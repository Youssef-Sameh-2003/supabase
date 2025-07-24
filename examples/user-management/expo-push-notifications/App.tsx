import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { skybase } from "./lib/skybase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View } from "react-native";
import { Session } from "@skybase/skybase-js";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    skybase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    skybase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
