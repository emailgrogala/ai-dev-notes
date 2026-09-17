# REVIEW.md — AI Dev Notes review framework

Perform three separate review passes.

---

# 1. CODE REVIEW

## Goal
Assess technical correctness and maintainability.

## Areas
- correctness and edge cases,
- Astro / TypeScript patterns,
- Content Collections,
- PL/EN routing and `translationKey`,
- accessibility,
- performance,
- SEO/document structure,
- CSS and responsive behavior,
- images and overflow,
- dead code and duplication,
- dependency/security issues where relevant.

## Finding format
```text
Severity:
Area:
File/location:
Finding:
Evidence:
Impact:
Recommended change:
```

Finish with strengths, unresolved risks, and areas with no findings.

Do not assign an overall numeric score.

---

# 2. UX REVIEW

## Goal
Assess whether AI Dev Notes works as a clear educational reading experience.

## Areas
- home-page purpose and hierarchy,
- article discoverability,
- navigation,
- PL/EN switching,
- article typography and reading width,
- metadata and tags,
- `Warto zapamiętać / Key takeaways`,
- insights carousel,
- reading progress / section focus,
- interactive examples,
- `O projekcie / About`,
- mobile behavior,
- consistency.

## Finding format
```text
Severity:
Area:
Observation:
User impact:
Evidence:
Recommendation:
```

Preserve the current minimal editorial style. Do not redesign for novelty.

---

# 3. CONTENT / ARTICLE REVIEW

## Goal
Assess educational quality and technical correctness of all articles.

Review every article individually, then identify cross-site patterns.

## Per-article checks
- factual accuracy,
- misleading simplifications,
- terminology,
- outdated claims,
- educational clarity,
- logical structure,
- title-to-content match,
- examples,
- repetition,
- missing important context,
- quality of `insights`,
- PL/EN semantic parity,
- tone.

## Article finding format
```text
Article:
Severity:
Section:
Finding:
Why it matters:
Recommended change:
```

## Cross-site checks
Look for:
- repeated explanations,
- terminology inconsistencies,
- missing links between related topics,
- gaps in educational sequence,
- articles needing stronger sourcing,
- overly similar insights.

Do not rank articles or assign numeric scores.

---

# Review rules
- Review first; fix later.
- Distinguish defects from preferences.
- Do not invent requirements.
- Use repository evidence.
- Prefer a few high-confidence findings to a long speculative list.
- If an area is good, say so.

The human decides for every finding:
- ACCEPT,
- REJECT,
- LATER.
