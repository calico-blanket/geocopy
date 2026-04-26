// Initialize map
const map = L.map('map', {
    center: [35.681236, 139.767125], // Tokyo Station as default
    zoom: 13,
    zoomControl: true,
    attributionControl: true
});

// Add localized, readable tiles (using OpenStreetMap Japan for better Japanese labels)
L.tileLayer('https://tile.openstreetmap.jp/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add marker
let marker = L.marker([35.681236, 139.767125], {
    draggable: true
}).addTo(map);

// Update input values
function updateCoords(lat, lng) {
    document.getElementById('lat-value').value = lat.toFixed(6);
    document.getElementById('lng-value').value = lng.toFixed(6);
}

// Initial values
updateCoords(35.681236, 139.767125);

// Map click event
map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
    updateCoords(lat, lng);
});

// Marker drag event
marker.on('dragend', (e) => {
    const { lat, lng } = marker.getLatLng();
    updateCoords(lat, lng);
});

// Search functionality
const searchInput = document.getElementById('location-search');
const searchBtn = document.getElementById('search-btn');

async function performSearch() {
    const query = searchInput.value;
    if (!query) return;

    searchBtn.disabled = true;
    searchBtn.innerHTML = '<svg class="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            const latNum = parseFloat(lat);
            const lngNum = parseFloat(lon);

            map.setView([latNum, lngNum], 15);
            marker.setLatLng([latNum, lngNum]);
            updateCoords(latNum, lngNum);
        } else {
            alert('場所が見つかりませんでした。');
        }
    } catch (error) {
        console.error('Search error:', error);
        alert('検索中にエラーが発生しました。');
    } finally {
        searchBtn.disabled = false;
        searchBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Copy functionality
const copyButtons = document.querySelectorAll('.copy-btn');
const toast = document.getElementById('toast');

copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        // Use clipboard API
        navigator.clipboard.writeText(input.value).then(() => {
            showToast();
            
            // Visual feedback on button
            const originalText = btn.innerText;
            btn.innerText = '✓';
            btn.style.background = 'var(--success)';
            btn.style.borderColor = 'var(--success)';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
            }, 2000);
        });
    });
});

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Adjust map on window resize
window.addEventListener('resize', () => {
    map.invalidateSize();
});
