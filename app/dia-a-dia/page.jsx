import Header from "@/components/header";
import SmoothScroll from "@/components/smooth-scroll";
import DiaHero from "@/components/dia-a-dia/dia-hero";
import DiaDescription from "@/components/dia-a-dia/dia-description";
import DiaIncludes from "@/components/dia-a-dia/dia-includes";
import DiaForYou from "@/components/dia-a-dia/dia-for-you";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function DiaADiaPage() {
  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="grain">
          <DiaHero />
          <DiaDescription />
          <DiaIncludes />
          <DiaForYou />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
