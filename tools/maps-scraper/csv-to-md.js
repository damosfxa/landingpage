const fs = require('fs');

const csvData = fs.readFileSync('leads-voxy-seo-master.csv', 'utf-8');
const rows = csvData.trim().split('\n');
const headers = rows.shift().split(',');

// Parsing data dengan fungsi yang lebih aman (tidak kepotong spasi)
function parseCSVRow(str) {
    const result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '"') {
            inQuote = !inQuote;
        } else if (str[i] === ',' && !inQuote) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += str[i];
        }
    }
    result.push(cur.trim());
    return result.map(c => c.replace(/^"|"$/g, ''));
}

const leads = [];
rows.forEach(row => {
    const cols = parseCSVRow(row);
    if (cols.length < 6) return;

    leads.push({
        name: cols[0],
        location: cols[1],
        rating: cols[2],
        website: cols[3],
        phone: cols[4],
        link: cols[5]
    });
});

// Group by location
const groupedLeads = leads.reduce((acc, lead) => {
    if (!acc[lead.location]) acc[lead.location] = [];
    acc[lead.location].push(lead);
    return acc;
}, {});

let md = `# 🎯 Master Data Leads: Jabodetabek (Voxy.dev)

Berikut adalah daftar leads hasil scraping yang sudah dikelompokkan per kota agar lebih rapi dan mudah dieksekusi. 
Klik tombol **[📱 Chat WA]** untuk langsung mengirim pesan *Icebreaker*.

`;

// Generate Markdown tables per group
for (const [location, locationLeads] of Object.entries(groupedLeads)) {
    md += `## 📍 Area: ${location.toUpperCase()}\n\n`;
    md += `| Nama Bisnis | Rating | Status Web | WhatsApp | Google Maps |\n`;
    md += `|---|---|---|---|---|\n`;

    locationLeads.forEach(lead => {
        // Format Phone and WA Link
        let cleanPhone = lead.phone.replace(/[^0-9]/g, '');
        if (cleanPhone.startsWith('0')) {
            cleanPhone = '62' + cleanPhone.substring(1);
        }
        const waLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=Halo%20selamat%20siang,%20saya%20kebetulan%20tadi%20cari%20referensi%20biro%20umroh%20di%20Google%20Maps%20dan%20ketemu%20${encodeURIComponent(lead.name)}.%20Wah,%20ulasannya%20bagus-bagus%20banget%20ya%20Pak/Bu,%20ratingnya%20tinggi!%20Berarti%20jamaahnya%20udah%20banyak%20banget%20yang%20puas%20nih.%20%F0%9F%91%8D%0A%0ABoleh%20nanya%20sebentar%20Pak/Bu?` : '';

        const waText = cleanPhone ? `[📱 Chat WA](${waLink})` : '❌ Kosong';
        
        // Status Web Formatting
        const isWebKosong = lead.website.includes('KOSONG') || lead.website.includes('TIDAK ADA');
        const webStatus = isWebKosong ? '🔴 Kosong' : '🟢 Ada';
        
        // Tampilkan Nama Penuh tanpa dipotong dan hilangkan karakter pipe (|) agar tidak merusak tabel Markdown
        let fullName = lead.name.replace(/\|/g, '&#124;');
        let displayRating = lead.rating.includes('Belum ada rating') ? '⭐ N/A (Kosong)' : lead.rating.replace(/\|/g, '&#124;');

        // Maps Link
        const mapsLink = `[📍 Buka Maps](${lead.link})`;

        md += `| **${fullName}** | ${displayRating} | ${webStatus} | ${waText} | ${mapsLink} |\n`;
    });
    md += `\n---\n\n`;
}

const artifactPath = "C:/Users/damos/.gemini/antigravity/brain/81be300a-0d81-4645-98b9-8c65c517fe0f/leads_table.md";
fs.writeFileSync(artifactPath, md);
console.log('✅ File Markdown Artifact berhasil diperbarui di:', artifactPath);
