import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category | Admin Dashboard',
  description: 'Manage Categegory - Create, view, update and delete categories',
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}