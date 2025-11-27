import { fetchAllDocsStructure } from "@/lib/github";
import { HeaderClient } from "./header-client";

export async function Header() {
  const docsStructure = await fetchAllDocsStructure();
  
  return <HeaderClient docsStructure={docsStructure} />;
}
