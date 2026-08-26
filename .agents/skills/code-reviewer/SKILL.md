---
name: code-reviewer
description: Use this skill to review code changes, component structures, styling patterns, and TypeScript files in the my-ytb-social repository to ensure they adhere to the project standards.
---

# Code Reviewer Skill for my-ytb-social

This skill provides a structured checklist and guidelines for reviewing React, TypeScript, SCSS, and Storybook code changes in the `my-ytb-social` workspace. 

---

## 🔍 When to Use This Skill
Activate or consult this skill when:
- Reviewing a Pull Request or a diff of files.
- Inspecting a new or refactored component for architectural compliance.
- Troubleshooting styling, TypeScript, or Form validation issues.

---

## 📋 Code Review Checklist

### 1. 🏗️ Architecture & Component Structure
- **Atomic Design compliance**:
  - `atoms/`: UI primitives (e.g. Button, Input, Select, Badge, Avatar). No business logic or API calls.
  - `molecules/`: Assemblies of atoms (e.g. CardPost, custom form inputs). Minimal state.
  - `organisms/`: Complex UI blocks (e.g. GuestWrapper, AuthWrapper, Navigation). Can interact with global state.
  - `pages/`: Full views (e.g. LoginPage, DashboardPage). Houses layout and routing context.
- **Component Folder Integrity**:
  Every component folder `src/<category>/<component-name>/` MUST have:
  - `[x] <ComponentName>.tsx` (Main implementation)
  - `[x] index.ts` (Exporting default: `export { default } from './<ComponentName>'`)
  - `[x] <component-name>.stories.tsx` (Storybook documentation file)
  - `[x] src/style/components/<category>/<component-name>.scss` (Corresponding SCSS file, imported in `src/index.css`)

### 2. 🎨 Styles & Styling Tokens
- **BEM Class Naming**: SCSS must use standard BEM naming convention: `.block`, `.block__element`, `.block--modifier` (nested properly).
- **Tailwind `@apply`**: SCSS components should leverage Tailwind classes inside `@layer components` for consistency.
- **Design Tokens**: Do NOT hardcode colors (e.g., `#ffffff`, `rgb(0, 0, 0)`) or raw pixel offsets in styles. Use CSS variables or tokenized Tailwind properties (e.g., `bg-primary-400`, `text-muted`, `p-md`).
- **Index.css Manifest**: Ensure any new stylesheet is imported at the top-level stylesheet: `src/index.css`.

### 3. 🛡️ TypeScript & React Coding Standards
- **Strong Typing**: Avoid using `any`. Use interfaces prefixed with `I` (e.g., `IMyComponentProps`) or types for props.
- **ForwardRef Usage**: Form inputs and interactives in `atoms/` must use `React.forwardRef` to support standard ref routing (essential for `react-hook-form`).
- **Storybook Stories**: Storybook stories must be structured and compile correctly under Storybook v10 standard syntax.

### 4. 🎛️ State, Forms & Router API
- **Form Handling**: Complex forms should use `react-hook-form` and validation schemas powered by `yup` and `@hookform/resolvers`.
- **Router Links**: Prefer `react-router-dom` `Link` or `NavLink` components over native `<a>` tags to maintain SPA state.

### 5. 🌐 Micro-frontend (Module Federation)
- **Export Integrity**: `src/App.tsx` is exposed as the primary remote entrypoint (`my_ytb_social_remote`). It should not hold large layout contexts or hard assumptions that break when injected into host applications.

---

## 🛠️ Step-by-Step Review Guide for Agents
When performing a review, structure your response as follows:

1. **Summary of Changes**: Briefly describe which files were modified/added.
2. **Checklist Status**: Call out if the folder structure, styling rules, and code standards are met.
3. **Detailed Findings**:
   - 🔴 **Blocking Issues** (e.g., `any` types, raw hex colors, missing stories, broken forwardRefs).
   - 🟡 **Suggestions / Improvements** (e.g., cleanups, optimization opportunities).
   - 🟢 **Strengths / Good Practices** (e.g., clean BEM structure, robust interfaces).
4. **Conclusion**: Give a clear approval status (Approve / Request Changes).
