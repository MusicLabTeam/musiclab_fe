"use client";
import { useEffect } from "react";
import { fetchList } from "@/api/fetchList";

export default function ListPage() {
  useEffect(() => {
    fetchList();
  }, []);
  return <div>LIST</div>;
}
