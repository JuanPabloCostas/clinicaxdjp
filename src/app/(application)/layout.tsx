import Header from "@/components/Header"
import SideBar from "@/components/SideBar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="px-16 h-screen">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Header />
        <div className="grid grid-cols-5 gap-12 pb-10 h-[90vh]">
          <SideBar />
          <div className="w-full h-full px-4 col-span-4 overflow-y-auto overflow-hidden">
            {children}
          </div>
        </div>
      </section>
    )
  }