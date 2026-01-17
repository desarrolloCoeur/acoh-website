import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Mission from "@/components/mission"
import Products from "@/components/products"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"

export default function Home() {
  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="grain">
          <Hero />
          <About />
          <Mission />
          <Products />
          <Gallery />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  )
}
