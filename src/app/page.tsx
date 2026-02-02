import RecentPosts from "@/components/home/RecentPosts";
import ContainerLayouts from "@/layouts/ContainerLayout";
import PostCardSkeleton from "@/skeletons/PostCardSkeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuArrowRight } from "react-icons/lu";


export default function Home() {
  return (
    <div className="text-white">
      <ContainerLayouts>

        <h1 className="text-3xl lg:text-5xl xl:text-7xl text-center text-gray-200 tracking-wide leading-snug lg:leading-tight">
          <span className="font-bold">Welcome to Byte<span className="text-primary">Blog</span>!</span>
          <br /> Discover Stories & Creative Ideas
        </h1>

        <div className="py-12 lg:py-24">
          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* image */}
            <div className="reative">
              <Image
                src="/images/about.jpeg"
                alt="about-image"
                width={600} height={600}
                className="rounded-2xl border border-white/10" />

              {/* glow */}
              <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl -z-10">
              </div>

            </div>

            {/**contents */}
            <div className="max-w-xl">
              <span className="text-sm uppercase tracking-widest text-indigo-400">About ByteBlog</span>

              <h3 className="mt-3 text-2xl lg:text-3xl xl:text-4xl  font-semibold tracking-tight text-white">
                Simple Ways to Innovate Your Inner Creative Mind
              </h3>

              <p className="mt-6 text-gray-400 leading-relaxed">
                ByteBlog is a modern and minimal platform where ideas come to life. It enables effortless creation, updating, and deletion of posts through a clean, fast interface designed for a smooth and focused blogging experience. 🚀✍️
              </p>

              <div className="mt-10">
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-secondary-background border border-white/10 text-gray-200 font-semibold hover:bg-white/10 transition-colors"
                >
                  Learn More <LuArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={ <PostCardSkeleton/> }>
          <RecentPosts />
        </Suspense>
      </ContainerLayouts>
    </div>
  );
}
