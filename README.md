# MD Emon Hossain | Animated Portfolio

A responsive, English-language animated portfolio website and four functional browser projects. Built with HTML, CSS and JavaScript, so it works on GitHub Pages without servers, paid hosting or a build process.

## Included

- `index.html`: Portfolio home page, projects, services, experience, education, skills, languages and contact.
- `assets/emon-portrait.png`: Supplied portrait photo.
- `resume/MD_EMON_HOSSAIN_CV.pdf`: Cleaned downloadable CV reflecting the provided information.
- `projects/data-quality-auditor/`: Working CSV audit and cleaning tool.
- `projects/records-manager/`: Working employee records manager with local browser storage and CSV import/export; downloadable Excel tracker.
- `projects/reporting-dashboard/`: Working CSV monthly dashboard and downloadable formula-driven Excel workbook.
- `projects/document-studio/`: Live English/Arabic text formatting, printing and download tool.

The real apps have been developed for this portfolio. They have **not** been represented as past paid client deliveries. Interface preview artwork is illustrative; data and metrics are computed from uploaded inputs when tools are used.

## Publish on GitHub Pages

1. Sign in to GitHub and create a **Public** repository named `emon-animated-portfolio`.
2. Download the ZIP provided with this portfolio and extract it.
3. Open the repository, choose **Add file** > **Upload files**, then select the **contents** of the extracted `emon_animated_portfolio` folder. Important: upload `index.html`, `assets`, `projects`, and `resume` directly to the repository's root, not inside another parent folder.
4. Select **Commit changes**.
5. Open **Settings** > **Pages**, select **Deploy from a branch** and choose branch `main` and folder `/ (root)`. Save.
6. Open the website address displayed by GitHub Pages after the deployment finishes. The usual pattern is `https://USERNAME.github.io/emon-animated-portfolio/`.
7. Test all four project links, Excel downloads, Download CV, email, WhatsApp and LinkedIn.

## Local preview

Open `index.html` in your browser. For the best test of relative links and downloaded resources, run a static web server from inside the folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editable details

- Update profile information and section text directly in `index.html`.
- Change colours and animation in `assets/styles.css`.
- Replace the portrait file `assets/emon-portrait.png` with another image of the same name to retain the link.
- Website has no database. The Records Manager saves in each visitor's own browser using localStorage. CSV and document tools process input within the browser. Do not use the portfolio tools for confidential production data without a proper security review.

## Privacy and accuracy

The portfolio includes the contact information given in the supplied CV. No personal identity numbers, addresses, invented client testimonials, made-up paid-project outcomes or typing-speed figures have been included. The resume's original unresolved placeholders have been omitted from the web-ready PDF.

## Technical notes

No npm install is required. Responsive layouts and animations use CSS with a reduced-motion accessibility fallback. Google Fonts load when online; system fonts are used when unavailable.
