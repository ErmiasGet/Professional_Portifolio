import { notFound } from "next/navigation";
import { EntityForm } from "@/components/admin/entity-form";
import { CONTENT_CONFIG } from "@/lib/data/registry";
import { contentTypeFromRoute } from "@/lib/data/admin-routes";
import { getContentById } from "@/db/content";

export async function generateMetadata({ params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity } = await params;
  const type = contentTypeFromRoute(entity);
  return { title: type ? `Edit ${CONTENT_CONFIG[type].label.slice(0, -1)}` : "Edit Content" };
}

export default async function EntityEditPage({ params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const type = contentTypeFromRoute(entity);
  if (!type) notFound();

  const row = await getContentById(id);
  if (!row || row.type !== type) notFound();

  return <EntityForm row={row} />;
}