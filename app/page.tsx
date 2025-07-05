import MainHeader from "./MainHeader";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-8 gap-8 sm:pt-20 font-[family-name:var(--font-geist-sans)] items-center">
      <MainHeader />
      {/* Hero Section */}
      <section className="w-full flex flex-col justify-center items-center bg-white rounded-lg shadow mb-8 mt-20 sm:mt-32 px-6 py-12 sm:py-16 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">Don't get eaten by the</h1>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">Sharks</h1>
        <p className="max-w-2xl text-center text-lg sm:text-xl text-gray-700 mb-2">Your gateway to decentralized finance. Explore, learn, and build with confidence.</p>
      </section>
      <main className="flex flex-col gap-[32px] items-center sm:items-start pt-24 w-full max-w-5xl mx-auto flex-1">
        {/* Scrollable Sections */}
        <section id="section1" className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-blue-50 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold mb-4">Section 1</h2>
          <p className="max-w-xl text-center">Welcome to Section 1. Scroll down to see the header transition and more content below.</p>
        </section>
        <section id="section2" className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-green-50 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold mb-4">Section 2</h2>
          <p className="max-w-xl text-center">This is Section 2. Keep scrolling to explore further sections and see the sticky header in action.</p>
        </section>
        <section id="section3" className="w-full min-h-[80vh] flex flex-col justify-center items-center bg-yellow-50 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold mb-4">Section 3</h2>
          <p className="max-w-xl text-center">You have reached Section 3. Use the header links to quickly jump between sections.</p>
        </section>
      </main>
      <Footer className="w-full py-6 rounded-lg text-center text-gray-600" />
    </div>
  );
}
