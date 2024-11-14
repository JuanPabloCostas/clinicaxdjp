import Header from "@/components/Header"
import SideBar from "@/components/SideBar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="px-16">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Header />
        <div className="grid grid-cols-5 gap-12">
          <SideBar />
          {children}
        </div>
      </section>
    )
  }