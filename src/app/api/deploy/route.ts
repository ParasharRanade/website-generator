import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { websiteName, templateConfig, selectedTemplate } = body

    if (!websiteName || !templateConfig) {
      return NextResponse.json(
        { error: 'Website name and template config are required' },
        { status: 400 }
      )
    }

    const zip = new JSZip()
    const sanitizedName = websiteName.replace(/\s+/g, '-').toLowerCase()

    // Generate HTML file
    const htmlContent = generateHTML(websiteName, templateConfig, selectedTemplate)
    zip.file(`${sanitizedName}/index.html`, htmlContent)

    // Generate CSS file
    const cssContent = generateCSS(templateConfig.colors)
    zip.file(`${sanitizedName}/styles.css`, cssContent)

    // Generate package.json
    const packageJson = generatePackageJson(websiteName)
    zip.file(`${sanitizedName}/package.json`, packageJson)

    // Generate README
    const readme = generateReadme(websiteName, templateConfig.industry)
    zip.file(`${sanitizedName}/README.md`, readme)

    // Generate the zip file
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

    return NextResponse.json({
      success: true,
      websiteFiles: zipBuffer.toString('base64'),
      message: 'Website deployed successfully'
    })
  } catch (error) {
    console.error('Error deploying website:', error)
    return NextResponse.json(
      { error: 'Failed to deploy website' },
      { status: 500 }
    )
  }
}

function generateHTML(websiteName: string, config: any, selectedTemplate: string): string {
  const { industry, tagline, colors } = config
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${websiteName} - ${industry}</title>
  <meta name="description" content="${tagline || websiteName}">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">${websiteName}</div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero" class="hero">
      <div class="hero-content">
        <h1>${websiteName}</h1>
        <p>${tagline || 'Welcome to our website'}</p>
        <button class="cta-button">Get Started</button>
      </div>
    </section>

    <section id="about" class="section">
      <h2>About Us</h2>
      <p>We are a leading ${industry} company dedicated to providing exceptional services.</p>
    </section>

    <section id="services" class="section">
      <h2>Our Services</h2>
      <div class="services-grid">
        <div class="service-card">
          <h3>Service 1</h3>
          <p>Professional service tailored to your needs.</p>
        </div>
        <div class="service-card">
          <h3>Service 2</h3>
          <p>Expert solutions for your business.</p>
        </div>
        <div class="service-card">
          <h3>Service 3</h3>
          <p>Innovative approaches to challenges.</p>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <h2>Contact Us</h2>
      <form class="contact-form">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; ${new Date().getFullYear()} ${websiteName}. All rights reserved.</p>
  </footer>
</body>
</html>`
}

function generateCSS(colors: any): string {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: ${colors.text};
  background-color: ${colors.background};
}

header {
  background: ${colors.primary};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav-links a:hover {
  opacity: 0.8;
}

.hero {
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  padding: 6rem 2rem;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-button {
  background: ${colors.accent};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: scale(1.05);
}

.section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.primary};
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card h3 {
  color: ${colors.primary};
  margin-bottom: 1rem;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.contact-form button {
  background: ${colors.primary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
}

footer {
  background: ${colors.primary};
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .nav-links {
    display: none;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}`
}

function generatePackageJson(websiteName: string): string {
  return JSON.stringify({
    name: websiteName.toLowerCase().replace(/\s+/g, '-'),
    version: "1.0.0",
    description: `Website for ${websiteName}`,
    main: "index.html",
    scripts: {
      "start": "npx serve"
    },
    devDependencies: {
      "serve": "^14.2.0"
    }
  }, null, 2)
}

function generateReadme(websiteName: string, industry: string): string {
  return `# ${websiteName}

A professional ${industry} website generated by SiteForge AI.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

3. Open your browser and navigate to \`http://localhost:3000\`

## Features

- Responsive design
- Modern UI
- SEO optimized
- Fast performance

## Customization

Edit \`styles.css\` to customize the design.
Edit \`index.html\` to modify the content.

## Deployment

This website can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Support

Made by PSK Infotech
`
}
