import React, { useContext, useEffect } from "react";

import { Stack, Typography, Button } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "contexts/user";

export default function Welcome() {
  const { user } = useContext(UserContext);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100vw", height: "100vh" }}
      spacing={2}
    >
      <Typography variant="h4">Welcome to the Interactive Chat!</Typography>

      <Stack direction="row" spacing={2}>
        <Link href="/new">
          <Button variant="contained">New Chat</Button>
        </Link>
        <Link href="/join">
          <Button>Join existing chat</Button>
        </Link>
      </Stack>
    </Stack>
  );
}
