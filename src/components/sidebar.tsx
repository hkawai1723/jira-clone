import { Navigation } from "@/components/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { WorkspaceSwitcher } from "@/components/workspace-switcher";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/dashboard">
        <Image src="/next.svg" alt="logo" width={120} height={48} />
      </Link>
      <Separator className="mt-2" />
      <WorkspaceSwitcher />
      <Separator className="mt-2" />
      <Navigation />
    </aside>
  );
};
