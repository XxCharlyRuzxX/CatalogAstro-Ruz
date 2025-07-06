import React, { useEffect, useState } from "react";

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
      className="fixed bottom-6 right-6 bg-black hover:bg-gray-800 p-3 rounded-full shadow-lg transition-all flex items-center justify-center"
      title="Panel de Admin"
    >
      <img
        className="w-[1.5625rem] h-[1.5625rem] sm:w-[1.875rem] sm:h-[1.875rem] md:w-[2.5rem] md:h-[2.5rem]"
        src="/icons/admin.svg"
        alt="Catálogo"
      />
    </a>
  );
}
