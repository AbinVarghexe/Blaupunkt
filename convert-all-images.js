import sharp from 'sharp';
import fs from 'fs';

const pngFiles = [
  'src/assets/Images/PortEvCable/PortEvMidSpec.png',
  'src/assets/Images/PortEvCable/PortEvMid2.png',
  'src/assets/Images/PortEvCable/PortEvMid1.png',
  'src/assets/Images/ServicesPage/Chargbg.png',
  'src/assets/Images/PortEvCable/Thumb-5.png',
  'src/assets/Images/PortEvCable/Thumb-4.png',
  'src/assets/Images/PortEvCable/Thumb-3.png',
  'src/assets/Images/ServicesPage/Installbg.png',
  'src/assets/Images/pdImages/Dcpd1.png',
  'src/assets/Images/PortEvCable/Thumb-2.png',
  'src/assets/Images/PortEvCable/Thumb-1.png',
  'src/assets/Images/pdImages/StationPd-1.png',
  'src/assets/Images/EvCables/EVCab-3.png',
  'src/assets/Images/EvCables/EVCab-2.png',
  'src/assets/Images/pdImages/StationPd-2.png',
  'src/assets/Images/pdImages/PortEvPd1.png',
  'src/assets/Images/EvCables/EVCab-1.png',
  'src/assets/Images/pdImages/Fastpd6.png',
  'src/assets/Images/pdImages/Fastpd5.png',
  'src/assets/Images/pdImages/Fastpd4.png',
  'src/assets/Images/pdImages/Fastpd3.png',
  'src/assets/Images/EvCables/EVCab-4.png',
  'src/assets/Images/pdImages/Fastpd2.png',
  'src/assets/Images/ServicesPage/ServicesPage.png',
  'src/assets/Images/pdImages/Fastpd1.png',
  'src/assets/Images/pdImages/EVCab-pd-2.png',
  'src/assets/Images/pdImages/EVCab-Pd-1.png',
  'src/assets/Images/ServicesPage/Mainbg.png',
  'src/assets/Images/EvCables/EVCab-Mid-Right.png',
  'src/assets/Images/pdImages/Dcpd2.png',
  'src/assets/Images/EvCables/EVCab-Mid.png',
  'src/assets/Images/EvCables/EVOModelBgmob.png',
  'src/assets/Images/EvCables/EVOverviewBgmob.png',
  'src/assets/Images/EvCables/EVSpecBgmob.png',
  'src/assets/Images/DCchargingStation/Thumb-2.png',
  'src/assets/Images/DCchargingStation/Thumb-1.png',
  'src/assets/Images/DCchargingStation/dcstaionsepcbg.png',
  'src/assets/Images/DCchargingStation/dcstaionoverbg.png',
  'src/assets/Images/DCchargingStation/DC-Mid.png',
  'src/assets/Images/DCchargingStation/DC-Mid-Spec.png',
  'src/assets/Images/DCchargingStation/DC-Mid-half.png',
  'src/assets/Images/ChargIngStations/Thumb-5.png',
  'src/assets/Images/DCFastChrg/Thumb-1.png',
  'src/assets/Images/ChargIngStations/Thumb-6.png',
  'src/assets/Images/ChargIngStations/Thumb-4.png',
  'src/assets/Images/ChargIngStations/Thumb-3.png',
  'src/assets/Images/DCFastChrg/FastSpec.png',
  'src/assets/Images/ChargIngStations/Thumb-2.png',
  'src/assets/Images/ChargIngStations/Thumb-1.png',
  'src/assets/Images/ChargIngStations/stationspecbg.png',
  'src/assets/Images/DCFastChrg/FastMid-2.png',
  'src/assets/Images/ChargIngStations/StationSpec.png',
  'src/assets/Images/ChargIngStations/stationoverbg.png',
  'src/assets/Images/ChargIngStations/Station2.png',
  'src/assets/Images/DCFastChrg/FastHigh.png',
  'src/assets/Images/ChargIngStations/Station1.png',
  'src/assets/Images/CatImages/Charging_Stations.png',
  'src/assets/Images/DCFastChrg/Fast-mid.png',
  'src/assets/Images/DCFastChrg/Thumb-2.png',
  'src/assets/Images/companyPage/Picture13.png',
  'src/assets/Images/companyPage/Picture12.png',
  'src/assets/Images/DCFastChrg/Thumb-3.png',
  'src/assets/Images/CatImages/Portable_EV_Charging.png',
  'src/assets/Images/CatImages/Ev_charging.png',
  'src/assets/Images/companyPage/Picture1.png',
  'src/assets/Images/CatImages/DC_Fast_Charging_Station.png',
  'src/assets/Images/companyPage/Picture2.png',
  'src/assets/Images/CatImages/DC_Charging_Station.png',
  'src/assets/Images/companyPage/Picture7.png',
  'src/assets/Images/companyPage/T2-T2.png',
  'src/assets/Images/companyPage/Picture6.png',
  'src/assets/Images/companyPage/Picture3.png'
];

async function convertImages() {
  let converted = 0;
  let skipped = 0;
  
  for (const pngPath of pngFiles) {
    const webpPath = pngPath.replace('.png', '.webp');
    
    try {
      if (fs.existsSync(webpPath)) {
        console.log(`Skipped (exists): ${webpPath}`);
        skipped++;
        continue;
      }
      
      if (!fs.existsSync(pngPath)) {
        console.log(`Missing: ${pngPath}`);
        continue;
      }
      
      await sharp(pngPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      
      console.log(`✓ Converted: ${webpPath}`);
      converted++;
    } catch (error) {
      console.error(`Error converting ${pngPath}: ${error.message}`);
    }
  }
  
  console.log(`\n=== Conversion Complete ===`);
  console.log(`Converted: ${converted} files`);
  console.log(`Skipped: ${skipped} files`);
}

convertImages();
