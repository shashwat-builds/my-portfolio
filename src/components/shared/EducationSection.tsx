"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function EducationSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    // Separate refs so we don't collide indices or keep pushing
    const eduCardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const internCardRefs = useRef<Array<HTMLDivElement | null>>([]);

    const educationItems = [
        {
            title: "Bachelor of Technology",
            subtitle: "Poornima University (2021–2025)",
            text: "CGPA 8.02 · Coursework: Algorithms, Data Structures, Systems Design.",
        },
        {
            title: "St. Dominic Savio’s High School",
            subtitle: "AISSE — 93.2%",
            text: "Strong fundamentals in mathematics and science.",
        },
    ];

    const internshipItems = [
        {
            title: "Web Developer Intern",
            subtitle: "SoftsensorAI (May 2025 - Aug 2025)",
            text: [
                "Developed a multilingual medical chatbot input field using React, TypeScript, and Material UI, supporting real-time transliteration and dynamic language switching.",
                "Delivered a responsive, mobile-optimized interface for a private healthcare platform and improved accessibility for non-English-speaking users using Typescript, React, MUI, Auth0."
            ]
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        let ticking = false;

        const applyTransforms = (nodes: Array<HTMLDivElement | null>) => {
            const vh = window.innerHeight;
            const viewportCenter = vh / 2;

            // tuning
            const maxDistance = vh * 0.9; // distance below center where influence→0
            const minScale = 0.1;
            const maxScale = 1.0;
            const minOpacity = 0.8;
            const maxOpacity = 1.0;
            const maxTranslate = 40; // px

            for (let i = 0; i < nodes.length; i++) {
                const el = nodes[i];
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;

                // Deterministic: above center => full size, below => scale by distance
                let raw: number;
                if (cardCenter <= viewportCenter) {
                    raw = 1;
                } else {
                    raw = 1 - Math.min((cardCenter - viewportCenter) / maxDistance, 1);
                    raw = Math.max(0, Math.min(1, raw));
                }

                const scale = minScale + (maxScale - minScale) * raw;
                const opacity = minOpacity + (maxOpacity - minOpacity) * raw;
                const translateY = maxTranslate * (1 - raw);

                el.style.transform = `translateY(${translateY}px) scale(${scale})`;
                el.style.opacity = `${opacity}`;
                el.style.transformOrigin = "center center";
                el.style.willChange = "transform, opacity";
            }
        };

        const updateTransforms = () => {
            ticking = false;
            applyTransforms(eduCardRefs.current);
            applyTransforms(internCardRefs.current);
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateTransforms);
            }
        };

        // initial paint
        updateTransforms();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateTransforms);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateTransforms);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full px-6 md:px-12">
            {/* Center timeline line spanning the whole section */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-white" />

            {/* Cap pinned relative to viewport (releases when section ends) */}
            <div className="sticky top-[15vh] z-20 pointer-events-none flex justify-center">
                <GraduationCap className="h-20 w-20 text-indigo-200 drop-shadow-md" />
            </div>

            {/* GRID: two rows (Education row, then Internship/Experience row) */}
            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 gap-x-30">
                {/* ===== ROW 1 ===== */}
                {/* Left: Education heading (sticks only while right cards are present) */}
                <div className="pr-6">
                    <div className="sticky top-[35vh] mb-16">
                        <h2 className="text-5xl font-bold text-white">Education</h2>
                    </div>
                </div>

                {/* Right: Education cards */}
                <div className="space-y-12 md:space-y-20">
                    <div className="h-[60vh]"></div>
                    {educationItems.map((item, i) => (
                        <div
                            key={`edu-${i}`}
                            ref={(el) => {
                                eduCardRefs.current[i] = el ?? null;
                            }}
                            className="transform transition-none"
                            style={{
                                transform: `translateY(40px) scale(0.6)`,
                                opacity: 0.15,
                            }}
                        >
                            <Card className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                                <CardContent className="p-4 md:p-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-400">
                                        {item.subtitle}
                                    </p>
                                    <p className="mt-3 text-sm md:text-base text-gray-200">
                                        {item.text}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Spacer between rows so the second heading doesn't collide */}
                <div className="h-24 col-span-2" />

                {/* ===== ROW 2 ===== */}
                {/* Left: Internship/Experience cards */}
                <div className="space-y-12 md:space-y-20">
                    <div className="h-[90vh]"></div>
                    {internshipItems.map((item, i) => (
                        <div
                            key={`intern-${i}`}
                            ref={(el) => {
                                internCardRefs.current[i] = el ?? null;
                            }}
                            className="transform transition-none"
                            style={{
                                transform: `translateY(40px) scale(0.6)`,
                                opacity: 0.15,
                            }}
                        >
                            <Card className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                                <CardContent className="p-4 md:p-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-400">
                                        {item.subtitle}
                                    </p>
                                    <p className="mt-3 text-sm md:text-base text-gray-200">
                                        <ul className="mt-3 text-sm md:text-base text-gray-200 list-disc list-inside space-y-1">
                                            {item.text.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Right: Experience heading (sticks only while left cards are present) */}
                <div className="pl-6">
                    <div className="h-[55vh]"></div>
                    <div className="sticky top-[35vh] mb-16 text-right">
                        <h2 className="text-5xl font-bold text-white">Experience</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
