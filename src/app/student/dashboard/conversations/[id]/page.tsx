"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ConversationByIdPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // For now, we keep everything inside /conversations (single screen).
    // Later, we can store selectedId in URL query or global store.
    router.push("/student/dashboard/conversations");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}