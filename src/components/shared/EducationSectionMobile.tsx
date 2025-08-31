"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationSectionMobile() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const capRef = useRef<HTMLDivElement | null>(null);

    const eduHeadingRef = useRef<HTMLHeadingElement | null>(null);
    const expHeadingRef = useRef<HTMLHeadingElement | null>(null);

    const eduCardsRef = useRef<HTMLDivElement | null>(null);
    const expCardsRef = useRef<HTMLDivElement | null>(null);

    const educationItems = [
        { title: "Bachelor of Technology", subtitle: "Poornima University (2021–2025)", text: "CGPA 8.02 · Coursework: Algorithms, Data Structures, Systems Design." },
        { title: "St. Dominic Savio's High School", subtitle: "AISSE — 93.2%", text: "Strong fundamentals in mathematics and science." },
    ];

    const internshipItems = [
        {
            title: "Web Developer Intern",
            subtitle: "SoftsensorAI (May 2025 - Aug 2025)",
            text: [
                "Developed a multilingual medical chatbot input field using React, TypeScript, and Material UI, supporting real-time transliteration and dynamic language switching.",
                "Delivered a responsive, mobile-optimized interface for a private healthcare platform and improved accessibility for non-English-speaking users using Typescript, React, MUI, Auth0.",
            ],
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        let ticking = false;

        const updateScroll = () => {
            if (!sectionRef.current || !lineRef.current || !capRef.current) return;

            const { top, height } = sectionRef.current.getBoundingClientRect();
            const scrollProgress = clamp(-top / height, 0, 1);

            // ---------- Line + Cap movement ----------
            // Updated to rotate between 9% and 81% instead of 20% and 80%
            let lineLeftPercent = 91;
            if (scrollProgress < 0.25) lineLeftPercent = lerp(91, 9, scrollProgress / 0.25);
            else if (scrollProgress < 0.6) lineLeftPercent = 9;
            else if (scrollProgress < 0.8) lineLeftPercent = lerp(9, 91, (scrollProgress - 0.6) / 0.2);
            else lineLeftPercent = 91;

            lineRef.current.style.left = `${lineLeftPercent}%`;
            lineRef.current.style.transform = "translateX(-50%)";
            capRef.current.style.left = `${lineLeftPercent}%`;
            capRef.current.style.transform = "translateX(-50%)";

            const vw = window.innerWidth;
            const lineXpx = (lineLeftPercent / 100) * vw;

            // ---------- Education Heading ----------
            if (eduHeadingRef.current) {
                const rect = eduHeadingRef.current.getBoundingClientRect();
                const clipPercent = clamp((lineXpx - rect.left) / (rect.width || 1), 0, 1) * 100;
                eduHeadingRef.current.style.clipPath = `polygon(0 0, ${clipPercent}% 0, ${clipPercent}% 100%, 0 100%)`;
                eduHeadingRef.current.style.opacity = clipPercent > 2 ? "1" : "0";
            }

            // ---------- Experience Heading ----------
            if (expHeadingRef.current) {
                const rect = expHeadingRef.current.getBoundingClientRect();
                const clipPercent = clamp((rect.right - lineXpx) / (rect.width || 1), 0, 1) * 100;
                const leftCoord = 100 - clipPercent;
                expHeadingRef.current.style.clipPath = `polygon(${leftCoord}% 0, 100% 0, 100% 100%, ${leftCoord}% 100%)`;
                expHeadingRef.current.style.opacity = clipPercent > 2 ? "1" : "0";
            }

            // ---------- Education Cards ----------
            if (eduCardsRef.current) {
                // Show education cards only after the cap has moved to the left (9%) and stayed there
                if (scrollProgress > 0.3) {
                    eduCardsRef.current.style.opacity = "1";
                    eduCardsRef.current.style.transform = "translateY(0)";
                } else {
                    eduCardsRef.current.style.opacity = "0";
                    eduCardsRef.current.style.transform = "translateY(20px)";
                }
            }

            // ---------- Experience Cards ----------
            if (expCardsRef.current) {
                // Show experience cards only after the cap has returned to the right (81%)
                if (scrollProgress > 0.85) {
                    expCardsRef.current.style.opacity = "1";
                    expCardsRef.current.style.transform = "translateY(0)";
                } else {
                    expCardsRef.current.style.opacity = "0";
                    expCardsRef.current.style.transform = "translateY(20px)";
                }
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateScroll);
            }
        };

        updateScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateScroll);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full px-4 pb-20">
            {/* Line + Cap */}
            <div ref={lineRef} className="absolute inset-y-0 w-[3px] bg-white" style={{ left: "91%", transform: "translateX(-50%)" }} />
            <div className="sticky top-[0.5vh] z-10 pointer-events-none w-full">
                <div ref={capRef} className="absolute" style={{ left: "91%", transform: "translateX(-50%)" }}>
                    <GraduationCap className="h-10 w-10 text-indigo-300 drop-shadow-md" />
                </div>
            </div>

            {/* Education Section */}
            <div className="relative z-10">
                <div className="sticky top-[28vh] w-full pointer-events-none mb-12">
                    <h2 ref={eduHeadingRef} className="text-4xl font-bold text-white" style={{ maxWidth: "60%", marginLeft: "1rem", textAlign: "left", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}>
                        Education
                    </h2>
                </div>
                
                <div ref={eduCardsRef} className="flex flex-col gap-8 transition-all duration-500 opacity-0 transform translate-y-5">
                                <div className="h-[400vh]" />

                    {educationItems.map((item, i) => (
                        <div key={`edu-${i}`} className="w-full max-w-md ml-auto">
                            <Card className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400">{item.subtitle}</p>
                                    <p className="mt-2 text-gray-200">{item.text}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[70vh]" />

            {/* Experience Section */}
            <div className="relative z-10">
                <div className="sticky top-[28vh] w-full pointer-events-none mb-12">
                    <h2 ref={expHeadingRef} className="text-4xl font-bold text-white" style={{ maxWidth: "60%", marginLeft: "auto", textAlign: "right", overflow: "hidden", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}>
                        Experience
                    </h2>
                </div>
                
                <div ref={expCardsRef} className="flex flex-col gap-8 transition-all duration-500 opacity-0 transform translate-y-5">
                                <div className="h-[400vh]" />

                    {internshipItems.map((item, i) => (
                        <div key={`intern-${i}`} className="w-full max-w-md mr-auto">
                            <Card className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400">{item.subtitle}</p>
                                    <ul className="mt-3 text-gray-200 list-disc list-inside space-y-1">
                                        {item.text.map((point, idx) => (<li key={idx}>{point}</li>))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}