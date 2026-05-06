"use client";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export default function Error() {
  return <ErrorBoundary message="No pudimos cargar esta vista." />;
}
