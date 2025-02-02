import Link from "next/link";
import { Button } from "./ui/button";
import { SiDiscord } from "@icons-pack/react-simple-icons";

export function JoinDiscord() {
  return (
    <Button asChild>
      <Link href="https://discord.gg/tKmSyU8GBT" target="_blank">
        <div className="flex items-center gap-4">
          <SiDiscord className="w-4 h-4" /> Chat on Discord
        </div>
      </Link>
    </Button>
  );
}
