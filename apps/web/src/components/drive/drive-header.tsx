import { h1Styles } from "@/lib/styles/heading-styles";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function DriveHeader() {
  return (
    <header className="flex self-start w-full items-center gap-2 py-2">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <div className="flex w-full px-3">
        <h1 className={h1Styles}>BenStack Drive</h1>
      </div>
    </header>
  );
}