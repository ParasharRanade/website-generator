# AI-Powered Website Generator

An end-to-end AI-powered website generator that creates professional, industry-specific websites in seconds. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Industry-Specific Templates**: Automatically selects the best template based on your industry (SaaS, Portfolio, E-commerce)
- **SEO Optimization**: Auto-generates meta tags, Open Graph tags, and Twitter cards
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Customizable**: Export templates as JSON for further customization
- **Contact Form Integration**: Ready-to-use contact form with email API integration
- **CI/CD Pipeline**: GitHub Actions workflow for automated testing and deployment
- **One-Click Deploy**: Ready to deploy on Vercel with a single command

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd website-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Generate a Website

1. Enter your **Website Name**
2. Select your **Industry** from the dropdown
3. Optionally add a **Tagline**
4. Click **Generate Website**
5. Preview your generated website
6. Click **Export** to download the template configuration

### Supported Industries

- SaaS
- Technology
- Portfolio
- Design
- E-commerce
- Retail
- Healthcare
- Finance
- Education
- Food & Beverage
- Real Estate
- Consulting
- Marketing

## Customization

### Adding New Industries

Edit `src/lib/industry-mappings.json` to add new industry templates:

```json
{
  "industryTemplates": {
    "YourIndustry": {
      "templateType": "saas",
      "sections": ["hero", "features", "about", "contact"],
      "defaultColors": {
        "primary": "#3B82F6",
        "secondary": "#8B5CF6",
        "accent": "#10B981",
        "background": "#FFFFFF",
        "text": "#1F2937"
      },
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }
  }
}
```

### Creating Custom Templates

1. Create a new template component in `src/components/templates/`
2. Add the template type to `src/lib/types.ts`
3. Update the template rendering logic in `src/app/page.tsx`

### Email Integration

To enable contact form email sending, configure your email service in `.env.local`:

```env
# For Resend API
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com

# For SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_FROM=noreply@example.com
```

Then uncomment the email service code in `src/app/api/contact/route.ts`.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

Or use the CLI:
```bash
npm install -g vercel
vercel
```

### GitHub Actions CI/CD

The project includes a GitHub Actions workflow for automated CI/CD. Configure the following secrets in your GitHub repository:

- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

## Project Structure

```
website-generator/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/       # Template generation API
│   │   │   └── contact/        # Contact form API
│   │   └── page.tsx            # Main generator interface
│   ├── components/
│   │   ├── templates/          # Template components
│   │   │   ├── SaaSTemplate.tsx
│   │   │   ├── PortfolioTemplate.tsx
│   │   │   └── EcommerceTemplate.tsx
│   │   ├── Navbar.tsx          # Responsive navbar
│   │   └── Footer.tsx          # Footer component
│   └── lib/
│       ├── industry-mappings.json  # Industry to template mappings
│       └── types.ts            # TypeScript types
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── vercel.json                 # Vercel configuration
└── README.md                   # This file
```

## API Endpoints

### POST /api/generate

Generates a website template based on user input.

**Request:**
```json
{
  "websiteName": "My Website",
  "industry": "SaaS",
  "tagline": "Innovation at its best"
}
```

**Response:**
```json
{
  "success": true,
  "template": {
    "websiteName": "My Website",
    "industry": "SaaS",
    "tagline": "Innovation at its best",
    "templateType": "saas",
    "sections": ["hero", "features", "pricing", "testimonials", "cta", "contact"],
    "colors": { ... },
    "seo": { ... }
  }
}
```

### POST /api/contact

Handles contact form submissions and sends emails.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Email Configuration (optional)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com

# SMTP Configuration (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_FROM=noreply@example.com
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, open an issue in the GitHub repository or contact the development team.
