import React, { PropsWithChildren } from "react";

import { UserProvider } from "contexts/user";
import { ChatProvider } from "contexts/chat";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProvider>
      <ChatProvider>
        <Stack sx={{ width: "100vw", height: "100vh" }}>{children}</Stack>
      </ChatProvider>
    </UserProvider>
  );
};
