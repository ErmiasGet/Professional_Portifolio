import { EntityForm } from "@/components/admin/entity-form";
import { CONTENT_CONFIG } from "@/lib/data/registry";
import { contentTypeFromRoute } from "@/lib/data/admin-routes";

export async function generateMetadata({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const type = contentTypeFromRoute(entity);
  return { title: type ? `New ${CONTENT_CONFIG[type].label.slice(0, -1)}` : "New Content" };
}

export default async function EntityNewPage({ params }: { params: Promise<{ entity: string }> }) {
  await params;
  return <EntityForm row={null} />;
}