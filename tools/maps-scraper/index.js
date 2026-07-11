const puppeteer = require('puppeteer');
const { createObjectCsvWriter } = require('csv-writer');

// Fokus SEO area Jabodetabek
const seoLocations = [
  "Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi", "Jabodetabek"
];

const MAX_RESULTS_PER_LOC = 10; // Ambil 10 lead per kota karena target areanya lebih sedikit
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log(`🚀 Memulai AUTO-SCRAPING massal berdasarkan ${seoLocations.length} lokasi SEO Voxy.dev...\n`);
  
  const browser = await puppeteer.launch({ 
    headless: "new", // Berjalan di background agar tidak mengganggu layar
    defaultViewport: null 
  });
  
  let allResults = [];

  for (const location of seoLocations) {
    const searchQuery = `Biro Umroh ${location}`;
    console.log(`\n======================================================`);
    console.log(`📍 TARGET LOKASI: ${location.toUpperCase()}`);
    console.log(`======================================================`);
    
    const page = await browser.newPage();
    const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}/`;
    
    try {
      console.log('⏳ Membuka Google Maps...');
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await sleep(5000); 

      console.log('⏳ Mengumpulkan link bisnis...');
      let placeLinks = [];
      
      for (let i = 0; i < 3; i++) {
        const newLinks = await page.$$eval('a[href^="https://www.google.com/maps/place/"]', anchors => anchors.map(a => a.href));
        placeLinks = [...new Set([...placeLinks, ...newLinks])];
        if (placeLinks.length >= MAX_RESULTS_PER_LOC) break;

        await page.mouse.wheel({ deltaY: 2000 });
        await sleep(2000);
      }

      placeLinks = placeLinks.slice(0, MAX_RESULTS_PER_LOC);
      console.log(`✅ Dapat ${placeLinks.length} link di ${location}. Memulai ekstraksi...`);

      for (let i = 0; i < placeLinks.length; i++) {
        const link = placeLinks[i];
        console.log(`  [${i + 1}/${placeLinks.length}] Scraping target...`);
        
        const detailPage = await browser.newPage();
        try {
          await detailPage.goto(link, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await sleep(2000);

          const name = await detailPage.evaluate(() => {
            const h1 = document.querySelector('h1');
            return h1 ? h1.innerText.trim() : 'Nama tidak ditemukan';
          });

          // Ambil Rating dan Jumlah Ulasan (Cari elemen apapun yang punya aria-label mengandung kata 'stars' atau 'bintang')
          const ratingReviews = await detailPage.evaluate(() => {
            const reviewEl = document.querySelector('[aria-label*="stars"], [aria-label*="bintang"]');
            return reviewEl ? reviewEl.getAttribute('aria-label') : 'Belum ada rating';
          });

          // Ambil Website (Bisa pakai data-item-id="authority" atau cari link yang mengandung kata website)
          const website = await detailPage.evaluate(() => {
            const authLink = document.querySelector('a[data-item-id="authority"]');
            if (authLink) return authLink.href;
            
            const links = Array.from(document.querySelectorAll('a'));
            const webLink = links.find(a => a.getAttribute('aria-label') && a.getAttribute('aria-label').toLowerCase().includes('website'));
            return webLink ? webLink.href : 'TIDAK ADA WEBSITE';
          });

          // Ambil Nomor Telepon (Cari tombol dengan data-item-id berawalan phone:tel:)
          const phone = await detailPage.evaluate(() => {
            const phoneBtn = document.querySelector('button[data-item-id^="phone:tel:"]') || document.querySelector('[data-item-id^="phone:tel:"]');
            if (phoneBtn) {
              const ariaLabel = phoneBtn.getAttribute('aria-label');
              return ariaLabel ? ariaLabel.replace('Phone:', '').replace('Telepon:', '').trim() : 'Tidak ada telepon';
            }
            return 'Tidak ada telepon';
          });

          console.log(`     -> ${name} | Web: ${website !== 'TIDAK ADA WEBSITE' ? 'Ada' : 'KOSONG'}`);
          allResults.push({ name, location, ratingReviews, website, phone, link });

        } catch (err) {
          console.log(`     ❌ Gagal scrape target: ${err.message}`);
        } finally {
          await detailPage.close();
        }
      }
    } catch (err) {
      console.log(`❌ Gagal memproses lokasi ${location}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  if (allResults.length > 0) {
    const fileName = `leads-voxy-seo-master.csv`;
    const csvWriter = createObjectCsvWriter({
      path: fileName,
      header: [
        { id: 'name', title: 'NAMA BISNIS' },
        { id: 'location', title: 'LOKASI TARGET' },
        { id: 'ratingReviews', title: 'RATING & REVIEW' },
        { id: 'website', title: 'WEBSITE' },
        { id: 'phone', title: 'WHATSAPP/TELEPON' },
        { id: 'link', title: 'LINK GOOGLE MAPS' }
      ]
    });

    await csvWriter.writeRecords(allResults);
    console.log(`\n🎉 YAY! Proses massal selesai. ${allResults.length} leads berhasil disimpan di file: ${fileName}`);
  } else {
    console.log('⚠️ Tidak ada data yang berhasil dikumpulkan.');
  }
}

run();
