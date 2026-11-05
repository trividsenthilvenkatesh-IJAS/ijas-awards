"use client";

import PageHero from "@/components/PageHero";
import YearTabs from "@/components/YearTabs";
import { projectsForYear } from "@/data/exposition";
import { buildAwardSections, displayName, gradeLabel, parseDollars } from "@/lib/awardValue";
import usePageTitle from "@/hooks/usePageTitle";
import { useMemo, useState } from "react";

function headingValue(name) {
  const dollars = parseDollars(name);
  if (dollars == null) return "";
  if (name.includes("$")) return "";
  return ` · $${dollars.toLocaleString("en-US")}`;
}

export default function AwardsByValue() {
  const [year, setYear] = useState(2026);
  usePageTitle("Awards by Value");
  const sections = useMemo(() => buildAwardSections(projectsForYear(year)), [year]);

  return (
    <>
      <PageHero title="Awards by Value" />
      <YearTabs year={year} onChange={setYear} controlsId="awards-by-value" />
      <div id="awards-by-value" className="mx-auto max-w-[1100px] px-5 py-10 md:px-8 md:py-12">
        <p className="mb-8 max-w-[760px] text-[16px] leading-relaxed text-[#374151]">
          Special awards from the {year} State Exposition, ordered from the highest known dollar value to Gold.
          Thermo Fisher and ISEF Finalists stay with the high-value awards. A student is listed under each award they
          received. Pure Gold is at the bottom. Silver, bronze, and participation placements appear only when they also
          received a special award.
        </p>
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`award-${section.id}`}>
              <h2
                id={`award-${section.id}`}
                className="rounded-xl bg-[#D6EAF8] px-4 py-3 text-[22px] font-bold leading-tight text-ijas-navy md:text-[26px]"
              >
                {section.name}
                {headingValue(section.name)}
                <span className="ml-2 text-[15px] font-medium text-[#374151]">
                  ({section.projects.length} {section.projects.length === 1 ? "project" : "projects"})
                </span>
              </h2>
              <ul className="mt-4 divide-y divide-[#e5e7eb] border-b border-[#e5e7eb]">
                {section.projects.map((project) => {
                  const name = displayName(project) || "Name not listed";
                  const grade = gradeLabel(project);
                  return (
                    <li key={`${section.id}-${project.year}-${project.projectNumber}-${project.title}-${name}`} className="py-3">
                      <p className="text-[16px] font-semibold text-[#1f2937]">
                        {name}
                        {grade ? <span className="font-normal text-[#4b5563]"> · {grade}</span> : null}
                      </p>
                      <p className="mt-0.5 text-[14px] text-[#374151]">
                        {[project.school || "School not listed", project.category || "Category not listed", project.region || "Region not listed"]
                          .join(" · ")}
                      </p>
                      <p className="mt-0.5 text-[15px] text-ijas-navy">{project.title || "Title not listed"}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
