import { useAuth } from "../context/auth";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();
  return user ? (
    <Typography variant="h4">Hello {user.getUsername()}!</Typography>
  ) : (
    <Link href={"/signup"}>
      <Button>Sign Up here! </Button>
    </Link>
  );
}
