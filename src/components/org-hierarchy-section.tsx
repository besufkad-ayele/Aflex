"use client";

import { useMemo, useState } from "react";
import {
  ORG_TIERS,
  getDirectReports,
  getRolesByTier,
  orgHierarchy,
  type OrgRole,
  type OrgTier,
} from "@/lib/org-hierarchy-data";

function levelLabel(level: OrgRole["level"]) {
  switch (level) {
    case "chief":
      return "Chief";
    case "lead":
      return "Lead Executive";
    case "deputy":
      return "Deputy";
    default:
      return "Executive";
  }
}

function matchesQuery(role: OrgRole, q: string) {
  if (!q) return true;
  const hay = `${role.titleEn} ${role.titleAm} ${role.unit} ${role.summary} ${role.incumbent ?? ""} ${role.responsibilities.join(" ")}`.toLowerCase();
  return hay.includes(q);
}

function RoleCard({
  role,
  depth = 0,
  nestChildren,
  query,
}: {
  role: OrgRole;
  depth?: number;
  nestChildren: boolean;
  query: string;
}) {
  const reports = nestChildren
    ? getDirectReports(role.id).filter((child) => {
        // Only nest same-tier deputies under a lead (avoid dumping whole org under CEO)
        if (child.tier !== role.tier) return false;
        if (!query) return true;
        return (
          matchesQuery(child, query) ||
          getDirectReports(child.id).some((c) => matchesQuery(c, query))
        );
      })
    : [];

  return (
    <div className={`org-role-block depth-${Math.min(depth, 2)}`}>
      <article className={`org-role-card level-${role.level}`} id={`role-${role.id}`}>
        <div className="org-role-card-top">
          <span className="mono org-role-order">#{String(role.order).padStart(2, "0")}</span>
          <span className="org-role-level">{levelLabel(role.level)}</span>
        </div>
        <h3 className="org-role-title-en">{role.titleEn}</h3>
        <p className="org-role-title-am" lang="am">
          {role.titleAm}
        </p>
        {role.incumbent ? (
          <p className="org-role-incumbent">
            <strong>{role.incumbent}</strong>
          </p>
        ) : (
          <p className="org-role-incumbent pending">Appointee to be published</p>
        )}
        <p className="org-role-summary">{role.summary}</p>
        <ul className="org-role-responsibilities">
          {role.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="org-role-actions">
          {role.youtubeUrl ? (
            <a href={role.youtubeUrl} target="_blank" rel="noopener noreferrer" className="org-speech-btn">
              Watch speech on YouTube ↗
            </a>
          ) : (
            <span className="org-speech-pending">Speech / YouTube — add when published</span>
          )}
          {role.profileUrl ? (
            <a href={role.profileUrl} target="_blank" rel="noopener noreferrer">
              Official profile ↗
            </a>
          ) : null}
          {role.email ? <a href={`mailto:${role.email}`}>{role.email}</a> : null}
        </div>
      </article>

      {reports.length > 0 ? (
        <div className="org-role-children" aria-label={`Reports to ${role.titleEn}`}>
          {reports.map((child) => (
            <RoleCard
              key={child.id}
              role={child}
              depth={depth + 1}
              nestChildren={nestChildren}
              query={query}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function rootsForTier(tierId: OrgTier, query: string): OrgRole[] {
  const roles = getRolesByTier(tierId);
  const q = query.trim().toLowerCase();

  if (q) {
    // Flat matches while searching — still nest same-tier children when parent also matches
    return roles.filter((role) => {
      if (!matchesQuery(role, q)) return false;
      const parent = orgHierarchy.find((p) => p.id === role.reportsTo);
      if (parent && parent.tier === tierId && matchesQuery(parent, q)) return false;
      return true;
    });
  }

  // Default: only render roots of this tier (parent outside tier or none)
  return roles.filter((role) => {
    const parent = orgHierarchy.find((p) => p.id === role.reportsTo);
    return !parent || parent.tier !== tierId;
  });
}

export function OrgHierarchySection() {
  const [activeTier, setActiveTier] = useState<OrgTier | "all">("all");
  const [query, setQuery] = useState("");

  const filteredTiers = useMemo(() => {
    return ORG_TIERS.map((tier) => ({
      ...tier,
      roles: rootsForTier(tier.id, query),
    })).filter((tier) => {
      if (activeTier !== "all" && tier.id !== activeTier) return false;
      return tier.roles.length > 0;
    });
  }, [activeTier, query]);

  return (
    <section className="org-hierarchy-section" id="org-chart">
      <div className="org-hierarchy-toolbar">
        <div className="org-hierarchy-filters" role="tablist" aria-label="Filter by directorate">
          <button
            type="button"
            className={`org-filter-btn ${activeTier === "all" ? "is-active" : ""}`}
            onClick={() => setActiveTier("all")}
          >
            All units
          </button>
          {ORG_TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              className={`org-filter-btn ${activeTier === tier.id ? "is-active" : ""}`}
              onClick={() => setActiveTier(tier.id)}
            >
              {tier.label}
            </button>
          ))}
        </div>
        <label className="org-hierarchy-search">
          <span className="sr-only">Search roles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Amharic or English title…"
          />
        </label>
      </div>

      <p className="org-hierarchy-count mono">
        {orgHierarchy.length} published seats · speeches open on YouTube when linked
      </p>

      <div className="org-hierarchy-tiers">
        {filteredTiers.map((tier) => (
          <div key={tier.id} className="org-tier-block" id={`tier-${tier.id}`}>
            <div className="org-tier-header">
              <span className="eyebrow">{tier.labelAm}</span>
              <h2>{tier.label}</h2>
              <p>{tier.blurb}</p>
            </div>
            <div className="org-tier-roles">
              {tier.roles.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role}
                  nestChildren={!query.trim()}
                  query={query.trim().toLowerCase()}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!filteredTiers.length ? (
        <p className="org-hierarchy-empty">No roles match this filter. Try another unit or clear search.</p>
      ) : null}
    </section>
  );
}
