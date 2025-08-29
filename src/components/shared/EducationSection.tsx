"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

/**
 * EducationSection - deterministic position-based scaling:
 * - above center => always full-size
 * - below center => scale depends on distance from center (smooth)
 * This removes direction-based flicker: same position => same size.
 */

export default function EducationSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

    const items = [
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

    useEffect(() => {
        if (!sectionRef.current) return;

        let ticking = false;

        const updateTransforms = () => {
            ticking = false;
            const vh = window.innerHeight;
            const viewportCenter = vh / 2 ;

            // tweak these to control sensitivity
            const maxDistance = vh * 0.9; // distance below center where influence reaches 0
            const minScale = 0.1;
            const maxScale = 1.0;
            const minOpacity = 0.8;
            const maxOpacity = 1.0;
            const maxTranslate = 40; // px

            for (let i = 0; i < cardRefs.current.length; i++) {
                const el = cardRefs.current[i];
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;

                // Deterministic rule:
                // - if cardCenter is at or above viewportCenter -> full size (raw = 1)
                // - else compute influence based on how far below the center it is
                let raw: number;
                if (cardCenter <= viewportCenter) {
                    raw = 1;
                } else {
                    raw = 1 - Math.min((cardCenter - viewportCenter) / maxDistance, 1);
                    // small smoothing (optional) for nicer curve
                    raw = Math.max(0, Math.min(1, raw));
                }

                const scale = minScale + (maxScale - minScale) * raw;
                const opacity = minOpacity + (maxOpacity - minOpacity) * raw;
                const translateY = maxTranslate * (1 - raw);

                // apply transform directly for perf
                el.style.transform = `translateY(${translateY}px) scale(${scale})`;
                el.style.opacity = `${opacity}`;
                el.style.transformOrigin = "center center";
                el.style.willChange = "transform, opacity";
            }
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
        <section ref={sectionRef} className="relative w-full min-h-[100vh] px-6 md:px-12">
            {/* The full timeline line (spans the entire section height) */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-white" />
            {/* CAP: pins at 10vh, releases when the section's bottom reaches it */}
            <div className="sticky top-[13vh] z-20 pointer-events-none flex justify-center">
                <GraduationCap className="h-20 w-20 text-indigo-200 drop-shadow-md" />
            </div>
            {/* Right column content (scrolls normally behind the pinned cap) */}
            <div className="relative z-10 ml-auto max-w-xl space-y-12 md:space-y-20 ">
                {items.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => { cardRefs.current[i] = el ?? null; }}
                        className="transform transition-none"
                        style={{
                            transform: `translateY(40px) scale(0.6)`,
                            opacity: 0.15,
                        }}
                    >
                        <Card className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
                            <CardContent className="p-4 md:p-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">{item.title}</h3>
                                <p className="text-sm md:text-base text-gray-400">{item.subtitle}</p>
                                <p className="mt-3 text-sm md:text-base text-gray-200">{item.text}</p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>

    );
}
