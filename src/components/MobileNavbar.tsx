"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import Link from "next/link";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon className="h-2 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant={"ghost"}
              className="flex item-center gap-3 justify-start"
              asChild
            >
              <Link href={"/"}>
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant={"ghost"}
                  className="flex item-center gap-3 justify-start"
                  asChild
                >
                  <Link href={"/notification"}>
                    <BellIcon className="w-4 h-4" />
                    Notification
                  </Link>
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex item-center gap-3 justify-start"
                  asChild
                >
                  <Link href={"/profile"}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant={"ghost"}
                    className="flex item-center gap-3 justify-start"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Log Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;