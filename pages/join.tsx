import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

export default function Join() {
  const [title, setTitle] = useState("");
  const handleSetTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  return (
    <Stack>
      <TextField value={title} onChange={handleSetTitle} label="Chat ID" />
      <Link href={`/chat/${title}`}>
        <Button>Go</Button>
      </Link>
    </Stack>
  );
}
