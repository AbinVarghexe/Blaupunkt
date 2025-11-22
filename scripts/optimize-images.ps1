# Image Optimization Script for Blaupunkt
# This script converts PNG/JPG images to WebP format
# Requires: Sharp (Node.js image processing library)

Write-Host "🎨 Blaupunkt Image Optimization Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if sharp is installed
$sharpInstalled = npm list sharp 2>&1 | Select-String "sharp@"

if (-not $sharpInstalled) {
    Write-Host "📦 Installing Sharp (image processing library)..." -ForegroundColor Yellow
    npm install sharp --save-dev --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Sharp. Exiting..." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Sharp is installed" -ForegroundColor Green
Write-Host ""

# Create Node.js script for image conversion
$nodeScript = @'
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Priority images to convert (largest files)
const priorityImages = [
    'src/assets/Images/DCFastChrg/Thumb-4.png',
    'src/assets/Images/ServicesPage/ServicesPage.png',
    'src/assets/Images/PortEvCable/PortEvMid1.png',
    'src/assets/Images/DCFastChrg/Fast-mid.png',
    'src/assets/Images/DCFastChrg/Thumb-2.png',
    'src/assets/Images/DCchargingStation/DCMID2.png',
    'src/assets/Images/DCFastChrg/Thumb-1.png',
    'src/assets/Images/DCFastChrg/Thumb-3.png'
];

async function optimizeImage(inputPath) {
    try {
        const ext = path.extname(inputPath).toLowerCase();
        const outputPath = inputPath.replace(ext, '.webp');
        
        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSizeKB = (originalStats.size / 1024).toFixed(2);
        
        console.log(`\n📸 Processing: ${path.basename(inputPath)} (${originalSizeKB} KB)`);
        
        // Convert to WebP with optimization
        await sharp(inputPath)
            .webp({ 
                quality: 80,
                effort: 6 // 0-6, higher = better compression but slower
            })
            .toFile(outputPath);
        
        // Get new file size
        const newStats = fs.statSync(outputPath);
        const newSizeKB = (newStats.size / 1024).toFixed(2);
        const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
        
        console.log(`✅ Created: ${path.basename(outputPath)}`);
        console.log(`   Original: ${originalSizeKB} KB → WebP: ${newSizeKB} KB`);
        console.log(`   💾 Saved: ${savings}%`);
        
        return { success: true, savings };
    } catch (error) {
        console.error(`❌ Error processing ${inputPath}:`, error.message);
        return { success: false, error: error.message };
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');
    
    let totalSavings = 0;
    let successCount = 0;
    
    for (const imagePath of priorityImages) {
        if (fs.existsSync(imagePath)) {
            const result = await optimizeImage(imagePath);
            if (result.success) {
                successCount++;
                totalSavings += parseFloat(result.savings);
            }
        } else {
            console.log(`⚠️  File not found: ${imagePath}`);
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`✨ Optimization Complete!`);
    console.log(`   ✅ Successfully converted: ${successCount} images`);
    console.log(`   💾 Average savings: ${(totalSavings / successCount).toFixed(1)}%`);
    console.log('='.repeat(50));
    console.log('\n📝 Next steps:');
    console.log('   1. Update image imports in your components to use .webp files');
    console.log('   2. Test the images in your application');
    console.log('   3. Delete original PNG files after verification');
}

main().catch(console.error);
'@

# Save Node script to temp file
$tempScript = "$PSScriptRoot\temp-optimize.js"
$nodeScript | Out-File -FilePath $tempScript -Encoding UTF8

Write-Host "🔄 Converting images to WebP format..." -ForegroundColor Yellow
Write-Host ""

# Run the Node script
node $tempScript

# Cleanup
Remove-Item $tempScript -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✨ Done! Check the results above." -ForegroundColor Green
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "   - WebP images are 25-35% smaller than PNG/JPG" -ForegroundColor White
Write-Host "   - Update your components to use .webp extensions" -ForegroundColor White
Write-Host "   - All modern browsers support WebP" -ForegroundColor White
