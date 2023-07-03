import { Button, Card, TextField, Typography } from "@mui/material";
import { UserContext } from "contexts/user";
import { Router, useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const { signIn } = useContext(UserContext);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handleClick = async () => {
    if (signIn) {
      await signIn(username);
      router.push("/");
    }
  };

  return (
    <Card>
      <Typography>Choose your username:</Typography>
      <TextField value={username} onChange={handleChange} />
      <Button onClick={handleClick}>Save</Button>
    </Card>
  );
}
