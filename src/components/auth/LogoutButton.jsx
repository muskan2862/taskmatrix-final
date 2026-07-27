"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/authService";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/login");
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}