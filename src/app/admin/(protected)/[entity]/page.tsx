import { EntityManager } from "@/components/admin/entity-manager";
import { CONTENT_CONFIG } from "@/lib/data/registry";
import { contentTypeFromRoute } from "@/lib/data/admin-routes";

export async function generateMetadata({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const type = contentTypeFromRoute(entity);
  return { title: type ? CONTENT_CONFIG[type].label : "Content" };
}

export default async function EntityListPage({ params }: { params: Promise<{ entity: string }> }) {
  await params;
  return <EntityManager />;
}