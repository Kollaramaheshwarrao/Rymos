import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { RymosApp } from "@/components/rymos/rymos-app";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center bg-gradient-to-br from-primary/10 via-background to-background">
           <div className="absolute inset-0 bg-[url(/grid.svg)] bg-repeat [mask-image:linear-gradient(to_bottom,white_10%,transparent_70%)] dark:[mask-image:linear-gradient(to_bottom,white_10%,transparent_50%)]"></div>
          <div className="container px-4 md:px-6 z-10">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Decode Errors, Discover Brilliance
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Rymos is your personal AI mentor. Turn your coding mistakes and
                misconceptions into powerful learning opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold text-lg py-7 px-8 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  <Link href="#rymos-app">Start Learning Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="rymos-app" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <RymosApp />
          </div>
        </section>
      </main>

       <footer className="py-6 md:px-8 md:py-0 bg-secondary/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            All copy rights reserved to Rymos 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
