import React, { useEffect, useState } from "react";
import { UserRoundCog } from "lucide-react";

export default function AdminPanelButton() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/admin/is-admin")
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) setIsAdmin(true);
      });
  }, []);

  if (!isAdmin) return null;

  return (
    <a
      href="/admin/panel"
      className="fixed bottom-6 right-6 bg-black hover:bg-[#0F6C74] p-3 rounded-full shadow-lg transition-all flex items-center justify-center z-50"
      title="Panel de Admin"
    >
      <UserRoundCog size={30} color="#fff" />
    </a>
  );
}
