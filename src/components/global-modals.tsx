"use client";

import { useUIStore } from "@/stores/ui-store";
import { SelectAccountMenu } from "@/components/auth/account-select-menu";

export const GlobalModals = () => {
  const { isProfileSelectModalOpen, setProfileSelectModalOpen } = useUIStore();

  return <SelectAccountMenu open={isProfileSelectModalOpen} onOpenChange={setProfileSelectModalOpen} />;
};
