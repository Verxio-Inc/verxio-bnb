import {
  CreateMessageGroupNavigation,
  Overview,
  CreateNew
} from "../../../components/social-feeds"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="border p-0 md:p-[32px] rounded">
      <div className="flex flex-col md:flex-row gap-6">
        <Overview />
        <CreateNew />
        <section className="bg-[#F7F7FD] flex-[40%] flex flex-col h-fit">
          <CreateMessageGroupNavigation />
          {children}
        </section>
      </div>
    </section>
  );
}
