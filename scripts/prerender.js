import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes to prerender
const routes = [
  '/',
  '/company',
  '/services',
  '/contact',
  '/products',
  '/charging-cables',
  '/charging-stations',
  '/portable-ev-charging',
  '/dc-charging-station',
  '/dc-super-fast-charging-station',
];

async function prerender() {
  console.log('🚀 Starting prerendering process...\n');

  const distPath = path.resolve(__dirname, '../dist');
  
  // Start a local server to serve the built files
  console.log('📦 Starting local server...');
  const server = await createServer({
    root: distPath,
    server: { port: 4173 }
  });
  
  await server.listen();
  console.log('✅ Server running on http://localhost:4173\n');

  // Launch headless browser
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const route of routes) {
      console.log(`📄 Prerendering: ${route}`);
      
      const page = await browser.newPage();
      const url = `http://localhost:4173${route}`;
      
      // Navigate and wait for React to fully render
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait a bit more for dynamic content
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get the full HTML after JavaScript execution
      const html = await page.content();

      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = path.join(distPath, 'index.html');
      } else {
        const routePath = path.join(distPath, route);
        await fs.mkdir(routePath, { recursive: true });
        outputPath = path.join(routePath, 'index.html');
      }

      // Write the prerendered HTML
      await fs.writeFile(outputPath, html);
      console.log(`  ✓ Saved to: ${outputPath}`);
      
      await page.close();
    }

    console.log('\n✨ Prerendering complete!');
    console.log(`📊 Total routes prerendered: ${routes.length}`);
  } catch (error) {
    console.error('❌ Error during prerendering:', error);
    throw error;
  } finally {
    await browser.close();
    await server.close();
  }
}

// Run the prerender function
prerender().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
