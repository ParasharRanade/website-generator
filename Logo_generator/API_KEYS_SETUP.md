# Free API Keys Setup Guide

This Logo Generator now supports free API keys for better quality logo generation.

## Hugging Face API (Recommended - Free)

### How to Get Your Free API Key:

1. Go to [https://huggingface.co/](https://huggingface.co/)
2. Sign up for a free account (no credit card required)
3. Navigate to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
4. Click "New token"
5. Give it a name (e.g., "logo-generator")
6. Select "Read" permission
7. Click "Generate token"
8. Copy the token

### How to Configure:

1. Open the `.env.local` file in the project root
2. Replace `your_huggingface_token_here` with your actual token:
   ```
   HUGGINGFACE_API_TOKEN=hf_your_actual_token_here
   ```
3. Save the file
4. Restart the development server

### Benefits:
- **Completely Free**: No credit card required
- **High Quality**: Uses Stable Diffusion XL model
- **Better Diversity**: More varied and innovative logo designs
- **Fast Generation**: Quick image generation

## Alternative Free Services

### Stability AI (Free Credits Available)

1. Go to [https://platform.stability.ai/](https://platform.stability.ai/)
2. Sign up for free account
3. Get free credits (limited but sufficient for testing)
4. Add your API key to `.env.local`:
   ```
   STABILITY_API_KEY=your_stability_api_key_here
   ```

### Replicate (Free Tier)

1. Go to [https://replicate.com/](https://replicate.com/)
2. Sign up for free account
3. Navigate to account settings to get API token
4. Add your API key to `.env.local`:
   ```
   REPLICATE_API_TOKEN=your_replicate_token_here
   ```

## Fallback Behavior

If no API key is configured, the system will automatically fall back to the free Pollinations.ai service (no API key required), though with lower quality and less variety.

## Testing Your Setup

1. Configure your API key in `.env.local`
2. Restart the development server: `npm run dev`
3. Generate logos and check the console for API usage messages
4. If Hugging Face is working, you'll see higher quality, more diverse logos

## Troubleshooting

**Issue**: "Hugging Face API token not configured, falling back to Pollinations"
- **Solution**: Make sure you've added your token to `.env.local` and restarted the server

**Issue**: "Hugging Face API error: 401"
- **Solution**: Your API key is invalid. Generate a new token and update `.env.local`

**Issue**: "Hugging Face API error: 503"
- **Solution**: The model is loading. Wait a few seconds and try again, or fall back to Pollinations

## Security Note

Never commit your `.env.local` file to version control. It's already included in `.gitignore`.
