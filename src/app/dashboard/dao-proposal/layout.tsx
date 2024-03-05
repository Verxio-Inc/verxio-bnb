  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="border p-3 md:p-[32px] rounded">
        {children}
      </section>
    );
  }
  