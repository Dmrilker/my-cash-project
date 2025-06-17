// Veri Listbox Yöneticisi v1.0.0
console.log('📋 Veri Listbox Yöneticisi v1.0.0 başlatılıyor...');

class DataListboxManager {
    constructor() {
        this.version = '1.0.0';
        this.maxEntries = 500; // Maksimum kayıt sayısı
        this.dataArray = [];
        this.updateCounter = 0;
        this.isPaused = false;
        this.autoScroll = true;
        
        // DOM elementleri
        this.elements = {
            container: document.getElementById('dataListContainer'),
            emptyState: document.getElementById('emptyState'),
            totalRecords: document.getElementById('totalRecords'),
            updateCount: document.getElementById('updateCount'),
            liveStatus: document.getElementById('liveStatus')
        };
        
        this.init();
    }

    init() {
        console.log('📋 Listbox başlatılıyor...');
        
        // Event listener'ları ekle
        this.setupEventListeners();
        
        // İlk durumu ayarla
        this.updateUI();
        
        console.log('✅ Listbox hazır!');
    }

    setupEventListeners() {
        // Pause/Resume butonu
        const pauseBtn = document.getElementById('pauseListBtn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.togglePause();
            });
        }

        // Clear butonu
        const clearBtn = document.getElementById('clearListBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearAllData();
            });
        }

        // Export butonu
        const exportBtn = document.getElementById('exportListBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportToCSV();
            });
        }

        // Fullscreen butonu
        const fullscreenBtn = document.getElementById('fullscreenListBtn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        // Scroll monitoring
        if (this.elements.container) {
            this.elements.container.addEventListener('scroll', () => {
                this.handleScroll();
            });
        }
    }

    // Yeni veri ekle
    addData(product, price, change, trend, timestamp = null) {
        if (this.isPaused) {
            console.log('⏸️ Listbox duraklatıldı, veri eklenmedi');
            return;
        }

        const now = timestamp || new Date();
        const timeString = now.toLocaleTimeString('tr-TR');
        
        const newEntry = {
            id: Date.now() + Math.random().toString(36).substr(2, 6),
            time: timeString,
            product: product,
            price: price,
            change: change,
            trend: trend,
            timestamp: now,
            isNew: true
        };

        // Diziye ekle (en üste)
        this.dataArray.unshift(newEntry);

        // Maksimum limit kontrolü
        if (this.dataArray.length > this.maxEntries) {
            this.dataArray = this.dataArray.slice(0, this.maxEntries);
        }

        // Güncelleme sayacını artır
        this.updateCounter++;

        // UI'yi güncelle
        this.updateUI();
        this.addRowToDOM(newEntry);

        // Console log
        console.log(`📋 Listbox'a eklendi: ${product} - ${price} (${change})`);

        // 3 saniye sonra "new" işaretini kaldır
        setTimeout(() => {
            newEntry.isNew = false;
            const rowElement = document.getElementById(`row-${newEntry.id}`);
            if (rowElement) {
                rowElement.classList.remove('new-entry');
            }
        }, 3000);
    }

    // DOM'a satır ekle
    addRowToDOM(entry) {
        if (!this.elements.container) return;

        // Empty state'i gizle
        if (this.elements.emptyState) {
            this.elements.emptyState.style.display = 'none';
        }

        // Yeni satır oluştur
        const row = this.createRowElement(entry);
        
        // Container'ın en üstüne ekle
        this.elements.container.insertBefore(row, this.elements.container.firstChild);

        // Otomatik scroll
        if (this.autoScroll) {
            this.elements.container.scrollTop = 0;
        }

        // Maksimum DOM elemanı kontrolü (performans için)
        const rows = this.elements.container.querySelectorAll('.data-row');
        if (rows.length > this.maxEntries) {
            const excessRows = Array.from(rows).slice(this.maxEntries);
            excessRows.forEach(row => row.remove());
        }
    }

    // Satır elementi oluştur
    createRowElement(entry) {
        const row = document.createElement('div');
        row.className = `data-row ${entry.isNew ? 'new-entry' : ''}`;
        row.id = `row-${entry.id}`;

        // Trend class'ı belirle
        let changeClass = 'change-neutral';
        let trendIcon = '→';
        
        if (entry.trend === 'up') {
            changeClass = 'change-up';
            trendIcon = '↗️';
        } else if (entry.trend === 'down') {
            changeClass = 'change-down';
            trendIcon = '↘️';
        }

        row.innerHTML = `
            <div class="col-time">${entry.time}</div>
            <div class="col-product">${entry.product}</div>
            <div class="col-price">${entry.price}</div>
            <div class="col-change ${changeClass}">${trendIcon} ${entry.change}</div>
        `;

        return row;
    }

    // UI durumunu güncelle
    updateUI() {
        // Toplam kayıt sayısı
        if (this.elements.totalRecords) {
            this.elements.totalRecords.textContent = this.dataArray.length;
        }

        // Güncelleme sayısı
        if (this.elements.updateCount) {
            this.elements.updateCount.textContent = this.updateCounter;
        }

        // Canlı durum
        if (this.elements.liveStatus) {
            this.elements.liveStatus.textContent = this.isPaused ? 'Duraklatıldı' : 'Aktif';
            this.elements.liveStatus.style.color = this.isPaused ? '#dc3545' : '#28a745';
        }

        // Empty state kontrolü
        if (this.elements.emptyState) {
            this.elements.emptyState.style.display = this.dataArray.length === 0 ? 'flex' : 'none';
        }
    }

    // Pause/Resume fonksiyonu
    togglePause() {
        this.isPaused = !this.isPaused;
        
        const pauseBtn = document.getElementById('pauseListBtn');
        if (pauseBtn) {
            pauseBtn.textContent = this.isPaused ? '▶️' : '⏸️';
            pauseBtn.title = this.isPaused ? 'Veri akışını başlat' : 'Veri akışını duraklat';
        }

        this.updateUI();
        
        console.log(`📋 Listbox ${this.isPaused ? 'duraklatıldı' : 'başlatıldı'}`);
    }

    // Tüm verileri temizle
    clearAllData() {
        if (this.dataArray.length === 0) {
            console.log('📋 Temizlenecek veri yok');
            return;
        }

        const confirmClear = confirm(`📋 ${this.dataArray.length} kayıt silinecek. Emin misiniz?`);
        if (!confirmClear) return;

        // Verileri temizle
        this.dataArray = [];
        this.updateCounter = 0;

        // DOM'u temizle
        if (this.elements.container) {
            const rows = this.elements.container.querySelectorAll('.data-row');
            rows.forEach(row => row.remove());
        }

        // UI'yi güncelle
        this.updateUI();

        console.log('🗑️ Tüm veriler temizlendi');
    }

    // CSV'ye dışa aktar
    exportToCSV() {
        if (this.dataArray.length === 0) {
            alert('📋 Dışa aktarılacak veri yok!');
            return;
        }

        try {
            // CSV içeriği oluştur
            let csvContent = "\uFEFF"; // UTF-8 BOM
            csvContent += "Zaman,Ürün,Fiyat,Değişim,Trend\n";
            
            // Verileri ekle (ters sırada - eskiden yeniye)
            const sortedData = [...this.dataArray].reverse();
            sortedData.forEach(entry => {
                const cleanPrice = entry.price.replace(/,/g, ''); // Virgülleri kaldır
                const cleanChange = entry.change.replace(/[↗️↘️→]/g, '').trim(); // İkonları kaldır
                csvContent += `"${entry.time}","${entry.product}","${cleanPrice}","${cleanChange}","${entry.trend}"\n`;
            });

            // Dosya indir
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            const fileName = `nakit-veri-gecmisi-${new Date().toISOString().split('T')[0]}.csv`;
            
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);

            console.log(`💾 ${this.dataArray.length} kayıt CSV olarak dışa aktarıldı: ${fileName}`);
            
            // Başarı bildirimi
            this.showNotification('💾 Veriler başarıyla dışa aktarıldı!', 'success');

        } catch (error) {
            console.error('❌ CSV dışa aktarma hatası:', error);
            alert('❌ Dışa aktarma sırasında hata oluştu!');
        }
    }

    // Tam ekran toggle
    toggleFullscreen() {
        const panel = document.querySelector('.data-list-panel');
        if (!panel) return;

        if (panel.classList.contains('fullscreen')) {
            // Fullscreen'den çık
            panel.classList.remove('fullscreen');
            document.getElementById('fullscreenListBtn').textContent = '⛶';
            console.log('📋 Fullscreen kapatıldı');
        } else {
            // Fullscreen'e geç
            panel.classList.add('fullscreen');
            document.getElementById('fullscreenListBtn').textContent = '↙️';
            console.log('📋 Fullscreen açıldı');
        }
    }

    // Scroll işleme
    handleScroll() {
        if (!this.elements.container) return;

        const element = this.elements.container;
        const isScrolledToTop = element.scrollTop < 10;
        
        // Otomatik scroll durumunu güncelle
        this.autoScroll = isScrolledToTop;
    }

    // Bildirim göster
    showNotification(message, type = 'info') {
        // Basit toast bildirimi
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // 3 saniye sonra kaldır
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // İstatistik al
    getStatistics() {
        const products = [...new Set(this.dataArray.map(e => e.product))];
        const timeRange = this.dataArray.length > 0 ? {
            newest: this.dataArray[0].timestamp,
            oldest: this.dataArray[this.dataArray.length - 1].timestamp
        } : null;

        const stats = {
            totalEntries: this.dataArray.length,
            updateCount: this.updateCounter,
            uniqueProducts: products.length,
            products: products,
            timeRange: timeRange,
            isPaused: this.isPaused,
            autoScroll: this.autoScroll
        };

        console.log('📊 Listbox İstatistikleri:', stats);
        return stats;
    }

    // Filtreleme (gelecekte kullanım için)
    filterByProduct(productName) {
        const filteredData = this.dataArray.filter(entry => 
            entry.product.toLowerCase().includes(productName.toLowerCase())
        );
        console.log(`🔍 ${productName} için ${filteredData.length} kayıt bulundu`);
        return filteredData;
    }

    // Veri sıralaması
    sortByTime(ascending = false) {
        this.dataArray.sort((a, b) => {
            const timeA = new Date(a.timestamp);
            const timeB = new Date(b.timestamp);
            return ascending ? timeA - timeB : timeB - timeA;
        });
        
        this.updateUI();
        console.log(`📋 Veriler ${ascending ? 'eskiden yeniye' : 'yeniden eskiye'} sıralandı`);
    }

    // Cleanup - sayfa kapatılırken
    cleanup() {
        console.log('🧹 Listbox temizleniyor...');
        this.dataArray = [];
        this.updateCounter = 0;
        this.isPaused = false;
    }
}

// CSS animasyonları ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .data-list-panel.fullscreen {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 9999 !important;
        border-radius: 0 !important;
    }
`;
document.head.appendChild(style);

// Global olarak başlat
const dataListbox = new DataListboxManager();

// Global erişim için
if (typeof window !== 'undefined') {
    window.dataListbox = dataListbox;
}

console.log('✅ Veri Listbox sistemi hazır!');