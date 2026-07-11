const fs = require('fs');

const csvData = fs.readFileSync('leads-voxy-seo-master.csv', 'utf-8');
const rows = csvData.trim().split('\n');
const headers = rows.shift().split(',');

let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Leads Biro Umroh</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; padding: 2rem; color: #1f2937; }
        h1 { text-align: center; color: #111827; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background-color: #f9fafb; font-weight: 600; color: #374151; }
        tr:hover { background-color: #f9fafb; }
        .btn { display: inline-block; padding: 6px 12px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 500; }
        .btn-wa { background-color: #16a34a; }
        .btn:hover { opacity: 0.9; }
        .badge { padding: 4px 8px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
        .badge-kosong { background-color: #fee2e2; color: #991b1b; }
        .badge-ada { background-color: #dcfce3; color: #166534; }
    </style>
</head>
<body>
    <h1>🎯 Master Data Leads: Biro Umroh (Voxy.dev)</h1>
    <table>
        <thead>
            <tr>
                <th>Nama Bisnis</th>
                <th>Lokasi</th>
                <th>Rating & Review</th>
                <th>Status Web</th>
                <th>WhatsApp / Telepon</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
`;

rows.forEach(row => {
    // Basic CSV parsing handling quotes
    const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!matches) return;
    
    // Clean up quotes
    const cols = matches.map(c => c.replace(/^"|"$/g, '').trim());
    if (cols.length < 6) return;

    const name = cols[0];
    const location = cols[1];
    const rating = cols[2];
    const website = cols[3];
    const phone = cols[4];
    const link = cols[5];

    // Format phone for WA
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
        cleanPhone = '62' + cleanPhone.substring(1);
    }
    
    const waLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=Halo%20selamat%20siang,%20saya%20kebetulan%20tadi%20cari%20referensi%20biro%20umroh%20via%20Google%20Maps%20dan%20ketemu%20bisnis%20Bapak/Ibu.%20Boleh%20nanya%20sebentar?` : '#';

    html += `
            <tr>
                <td style="font-weight: 600;">${name}</td>
                <td>${location}</td>
                <td style="color: #6b7280; font-size: 14px;">${rating}</td>
                <td>
                    <span class="badge ${website.includes('KOSONG') || website.includes('TIDAK ADA') ? 'badge-kosong' : 'badge-ada'}">
                        ${website.includes('KOSONG') || website.includes('TIDAK ADA') ? '❌ Tidak Ada' : '✅ Ada Web'}
                    </span>
                </td>
                <td style="font-weight: 500;">${phone.includes('Tidak ada') ? '<span style="color:#9ca3af;">Kosong</span>' : phone}</td>
                <td style="display: flex; gap: 8px;">
                    ${!phone.includes('Tidak ada') ? `<a href="${waLink}" target="_blank" class="btn btn-wa">Chat WA</a>` : ''}
                    <a href="${link}" target="_blank" class="btn">Buka Maps</a>
                </td>
            </tr>
    `;
});

html += `
        </tbody>
    </table>
</body>
</html>
`;

fs.writeFileSync('leads.html', html);
console.log('✅ File HTML berhasil dibuat!');
