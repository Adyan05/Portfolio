# Developer portfolio

React + TypeScript + Vite + Tailwind CSS + Motion + Lucide. All project cards open slide presentations. No project applications are launched.

## Local development

Install Node.js 24 LTS, then run `npm ci` and `npm run dev`. Use `npm run build` for type checking and production output, and `npm run preview` to inspect it.

## Edit your content

- `src/data/profile.ts`: name, introduction, education, interests, goals, optional image, email, GitHub and LinkedIn URLs. Empty contact links are hidden.
- `src/data/projects.ts`: projects and their independent ordered `slides` arrays. Add, delete or reorder slide objects; give each slide a stable unique ID. Supported kinds: overview, problem, objectives, technologies, architecture, features, screenshots, results, repository. You can have multiple screenshot slides with different IDs.
- `src/data/skills.ts`, `experience.ts`, `achievements.ts`: remaining profile content.
- `src/config/site.ts`: navigation and site label.
- `src/components/Presentation.tsx`: reusable reader and transitions.
- `src/components/Placeholder.tsx`: reusable media with broken-image fallback.
- `src/styles.css`: responsive visual styling.

All supplied project names, descriptions, skills, experience and achievements are visibly marked placeholders. Replace them with your real details; remove `placeholder: true` only once content is supplied. Technology arrays are intentionally empty, and results contain no invented claims.

Put screenshots/diagrams in `public/images/` and set `image: 'images/my-image.webp'` plus descriptive `imageAlt` on a slide. Set `cover` on a project similarly. Assets resolve against Vite's deployment base. Set `repository` to an HTTPS `github.com/owner/repo` URL to enable the repository link. No link is rendered for missing or malformed repository URLs. Do not add demo URL fields.

Example slide:

```ts
{ id: 'architecture-v1', kind: 'architecture', title: 'System architecture',
  body: 'Your verified explanation.', image: 'images/architecture.webp',
  imageAlt: 'Describe the actual diagram here' }
```

The native modal dialog traps focus; Escape closes it and restores focus. Arrow keys and buttons navigate; horizontal touch swipes navigate while vertical scrolling remains available. Progress buttons jump to a slide. Reduced-motion preferences disable movement. Hash links such as `#project/software-project` support reload, direct linking, browser back and forward on GitHub Pages without rewrite rules.

## GitHub Pages: Adyan05/Portfolio

The intended destination is https://github.com/Adyan05/Portfolio . The workflow derives `/Portfolio/` from `GITHUB_REPOSITORY`. User/organization repositories ending in `.github.io` build at the root. Local builds use relative paths. For a custom domain, set the build environment variable `VITE_BASE_PATH=/`.

1. Put this directory's contents at the repository root, including `.github` and `package-lock.json`.
2. Use branch `main`, or update the workflow branch if your default branch differs.
3. In GitHub **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. Push to `main`; inspect the **Deploy portfolio to GitHub Pages** workflow.
5. Once successful, the expected address is https://adyan05.github.io/Portfolio/ . This address is a deployment target, not proof of publication.

Before sharing, update the HTML title, SEO text, and social image. The SVG social placeholder is editable; replace it with an absolute public PNG/JPEG URL for broad social-platform preview compatibility.

For future project changes, edit only that project's data and assets. Preserve the other entries and reusable components unless behavior must change.
