/**
 * Nakit Dashboard Yönetim Sistemi
 * Geliştirici: Dmrilker
 * Güncel Tarih: 2025-06-01 15:00:34 UTC
 * Versiyon: 1.0.0
 * 
 * Bu dosya dashboard arayüzü, grafikler ve kullanıcı etkileşimlerini yönetir.
 */

class DashboardYoneticisi {
    constructor() {
        // Sistem bilgileri
        this.versiyon = '1.0.0';
        this.gelistirici = 'Dmrilker';
        this.olusturmaZamani = new Date('2025-06-01T15:00:34Z');
        
        // Grafik referansları
        this.anaGrafik = null;
        this.riskMeterGrafik = null;
        this.performansGrafik = null;
        this.miniGrafikler = new Map();
        this.macdCanvas = null;        // Timer referansları
        this.guncellemeTimer = null;
        this.performansTimer = null;
        this.saatTimer = null;
        this.otomatikYenilemeTimer = null;
        this.bellekIzlemeTimer = null;
        this.periyodikTemizlikTimer = null;
          // Dashboard durumu
        this.aktifSayfa = 'dashboard';
        this.sonGuncellemeZamani = null;
        this.sistemBaslamaZamani = null;
        this.bildirimSayaci = 0;
        this.maksimumBildirim = 10; // Çok düşük limit
        
        // Grafik verileri
        this.grafikVerileri = {
            altin: { labels: [], data: [], renk: '#ffd700' },
            dolar: { labels: [], data: [], renk: '#27ae60' },
            bitcoin: { labels: [], data: [], renk: '#f7931a' },
            borsa: { labels: [], data: [], renk: '#3498db' }
        };
          // UI durumu
        this.animasyonlarAktif = true;
        this.sesUyarilariAktif = true;
        this.otomatikYenileme = true;
        this.koyu_tema = false;
          // Bildirim rate limiting
        this.sonBildirimZamanlari = new Map();
        this.bildirimRateLimit = 5000; // 5 saniye aralık
        
        // Grafik güncelleme rate limiting
        this.sonGrafikGuncellemeZamani = 0;
        this.grafikGuncellemeAraligi = 3000; // 3 saniye aralık
        
        console.log(`📊 Dashboard Yöneticisi v${this.versiyon} başlatılıyor...`);
        console.log(`👤 Geliştirici: ${this.gelistirici}`);
        console.log(`🕐 Oluşturma: ${this.olusturmaZamani.toLocaleString('tr-TR')}`);
        
        this.init();
    }

    /**
     * Dashboard başlatma
     */
    async init() {
        try {
            console.log('🎯 Dashboard başlatılıyor...');
            
            // DOM yüklenmesini bekle
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.domYuklendi());
            } else {
                this.domYuklendi();
            }
            
        } catch (hata) {
            console.error('❌ Dashboard başlatma hatası:', hata);
            this.hataYonetimi(hata, 'Dashboard başlatma');
        }
    }

    /**
     * DOM yüklendiğinde çalıştırılacak
     */
    domYuklendi() {
        console.log('📄 DOM yüklendi, dashboard hazırlanıyor...');
        
        // Grafikleri oluştur
        this.tumGrafikleriOlustur();
        
        // Event listener'ları ekle
        this.eventListenerEkle();
        
        // Sayfa elementlerini başlat
        this.sayElementleriniBaslat();
        
        // Otomatik güncellemeleri başlat
        this.otomatikGuncellemeleriBaslat();
        
        // İlk verileri yükle
        this.ilkVerileriYukle();
        
        // Başarı bildirimi
        this.bildirimEkle(
            'Dashboard başarıyla yüklendi ve hazır!',
            'success'
        );
        
        console.log('✅ Dashboard tamamen hazır!');
    }

    /**
     * Tüm grafikleri oluştur
     */
    tumGrafikleriOlustur() {
        console.log('📈 Grafikler oluşturuluyor...');
        
        // Ana grafik
        this.anaGrafikOlustur();
        
        // Risk meter
        this.riskMeterOlustur();
        
        // Performans grafik
        this.performansGrafikOlustur();
        
        // Mini grafikler
        this.miniGrafikleriOlustur();
        
        // MACD grafiği
        this.macdGrafikOlustur();
        
        console.log('📊 Tüm grafikler hazır!');
    }

    /**
     * Ana grafik oluşturma
     */
    anaGrafikOlustur() {
        const canvas = document.getElementById('anaGrafik');
        if (!canvas) {
            console.warn('⚠️ Ana grafik canvas bulunamadı');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        this.anaGrafik = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Altın (USD/oz)',
                    data: [],
                    borderColor: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 2,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#ffd700',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animasyonlarAktif ? 750 : 0,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Zaman',
                            font: { size: 12, weight: 'bold' }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)',
                            lineWidth: 1
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Fiyat (USD)',
                            font: { size: 12, weight: 'bold' }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: { size: 12, weight: 'bold' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#ffd700',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return 'Zaman: ' + context[0].label;
                            },
                            label: function(context) {
                                return context.dataset.label + ': $' + 
                                       context.parsed.y.toLocaleString('en-US', {
                                           minimumFractionDigits: 2,
                                           maximumFractionDigits: 2
                                       });
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Risk meter oluşturma
     */
    riskMeterOlustur() {
        const canvas = document.getElementById('riskMeter');
        if (!canvas) {
            console.warn('⚠️ Risk meter canvas bulunamadı');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        this.riskMeterGrafik = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Güvenli Alan', 'Risk Alanı'],
                datasets: [{
                    data: [70, 30],
                    backgroundColor: [
                        '#2ecc71', // Yeşil - Güvenli
                        '#e74c3c'  // Kırmızı - Riskli
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                animation: {
                    animateRotate: this.animasyonlarAktif,
                    duration: 1000
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': %' + context.parsed.toFixed(1);
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Performans grafik oluşturma
     */
    performansGrafikOlustur() {
        const canvas = document.getElementById('performansGrafik');
        if (!canvas) {
            console.warn('⚠️ Performans grafik canvas bulunamadı');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        this.performansGrafik = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Sistem Performansı (%)',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: this.animasyonlarAktif ? 500 : 0
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: true,
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    /**
     * Mini grafikler oluşturma
     */
    miniGrafikleriOlustur() {
        const miniCanvasIds = [
            'altinMiniGrafik',
            'dolarMiniGrafik', 
            'bitcoinMiniGrafik',
            'borsaMiniGrafik'
        ];
        
        const renkler = {
            altinMiniGrafik: '#ffd700',
            dolarMiniGrafik: '#27ae60',
            bitcoinMiniGrafik: '#f7931a',
            borsaMiniGrafik: '#3498db'
        };
        
        miniCanvasIds.forEach(canvasId => {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const renk = renkler[canvasId];
            
            const miniGrafik = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        borderColor: renk,
                        backgroundColor: renk + '20',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 0 },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
            
            this.miniGrafikler.set(canvasId, miniGrafik);
        });
    }

    /**
     * MACD grafik oluşturma
     */
    macdGrafikOlustur() {
        const canvas = document.getElementById('macdCanvas');
        if (!canvas) {
            console.warn('⚠️ MACD canvas bulunamadı');
            return;
        }
        
        this.macdCanvas = canvas.getContext('2d');
    }

    /**
     * Event listener'ları ekle
     */
    eventListenerEkle() {
        console.log('🎧 Event listenerlar ekleniyor...');
        
        // Grafik asset seçimi
        const assetSecim = document.getElementById('grafikAssetSecim');
        if (assetSecim) {
            assetSecim.addEventListener('change', (e) => {
                this.grafikAssetDegistir(e.target.value);
            });
        }
        
        // Zaman aralığı seçimi
        const zamanSecim = document.getElementById('grafikZamanAraligi');
        if (zamanSecim) {
            zamanSecim.addEventListener('change', (e) => {
                this.grafikZamanAraligiDegistir(e.target.value);
            });
        }
        
        // Mobil menü toggle
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => {
                this.mobilMenuToggle();
            });
        }
        
        // Fiyat kartları hover efekti
        document.querySelectorAll('.fiyat-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
        
        // Klavye kısayolları
        document.addEventListener('keydown', (e) => {
            this.klavyeKisayollari(e);
        });
        
        // Sayfa yenilenme uyarısı
        window.addEventListener('beforeunload', (e) => {
            if (typeof nakitSistem !== 'undefined' && nakitSistem.veriToplamaAktif) {
                e.preventDefault();
                e.returnValue = 'Veri toplama aktif. Sayfayı kapatmak istediğinizden emin misiniz?';
            }
        });
        
        // Sayfa boyut değişikliği
        window.addEventListener('resize', () => {
            this.sayfaBoyutDegisti();
        });
        
        console.log('✅ Event listenerlar hazır!');
    }

    /**
     * Sayfa elementlerini başlat
     */
    sayElementleriniBaslat() {
        // Saat güncellemesi
        this.saatGuncelle();
        this.saatTimer = setInterval(() => this.saatGuncelle(), 1000);
        
        // Başlangıç bildirimleri
        this.ilkBildirimleriEkle();
        
        // Tema ayarları
        this.temaAyarlariYukle();
        
        // Tooltip'leri başlat
        this.tooltipleriBaslat();
    }

    /**
     * Saat güncellemesi
     */
    saatGuncelle() {
        const simdi = new Date();
        const saatText = simdi.toLocaleTimeString('tr-TR');
        const tarihText = simdi.toLocaleDateString('tr-TR');
        
        // Son güncelleme zamanı
        const sonGuncellemeElement = document.getElementById('sonGuncellemeZamani');
        if (sonGuncellemeElement) {
            sonGuncellemeElement.textContent = saatText;
        }
        
        // Aktif süre
        if (this.sistemBaslamaZamani) {
            const aktifSure = simdi - this.sistemBaslamaZamani;
            const aktifSureText = this.formatSure(aktifSure / 1000);
            
            const aktifSureElement = document.getElementById('aktifSure');
            if (aktifSureElement) {
                aktifSureElement.textContent = aktifSureText;
            }
        }
    }

    /**
     * Süre formatla
     */
    formatSure(saniye) {
        const saat = Math.floor(saniye / 3600);
        const dakika = Math.floor((saniye % 3600) / 60);
        const sn = Math.floor(saniye % 60);
        
        return `${saat.toString().padStart(2, '0')}:${dakika.toString().padStart(2, '0')}:${sn.toString().padStart(2, '0')}`;
    }

    /**
     * İlk bildirimleri ekle
     */
    ilkBildirimleriEkle() {
        this.bildirimEkle(
            `Dashboard v${this.versiyon} aktif`,
            'info'
        );
        
        this.bildirimEkle(
            `Geliştirici: ${this.gelistirici}`,
            'info'
        );
    }    /**
     * Otomatik güncellemeleri başlat
     */
    otomatikGuncellemeleriBaslat() {
        // STARTUP DELAY - Dashboard güncellemelerini de geciktir
        console.log('⏳ Dashboard güncellemeleri için 60 saniye bekleniyor...');
        
        setTimeout(() => {
            // Daha uzun aralıklarla güncelleme yap - performans optimizasyonu
            if (this.otomatikYenileme) {
                this.otomatikYenilemeTimer = setInterval(() => {
                    this.otomatikVeriGuncelle();
                }, 15000); // 15 saniyede bir (daha da uzun aralık)
                
                console.log('🔄 Otomatik güncelleme başlatıldı (15s interval)');
            }

            // Performans izleme - çok daha uzun aralık
            this.performansTimer = setInterval(() => {
                this.performansGuncelle();
            }, 120000); // 2 dakikada bir
            
            console.log('📊 Performans izleme başlatıldı (120s interval)');
            
        }, 60000); // 60 saniye startup delay
    }    /**
     * İlk verileri yükle
     */
    ilkVerileriYukle() {
        // Demo veriler ile başlat - startup delay ekle
        console.log('⏳ İlk veriler 2 dakika sonra yüklenecek...');
        
        setTimeout(() => {
            this.demoVerileriOlustur();
            console.log('📊 İlk veriler yüklendi');
        }, 120000); // 2 dakika sonra başlat
    }

    /**
     * Demo verileri oluştur
     */
    demoVerileriOlustur() {
        const demoVeri = {
            zaman: new Date(),
            altin: 2000 + (Math.random() * 100),
            dolar: 30.5 + (Math.random() * 2),
            bitcoin: 67000 + (Math.random() * 5000),
            borsa: 8500 + (Math.random() * 500),
            ethereum: 3800 + (Math.random() * 300)
        };
        
        this.fiyatlariGuncelle(demoVeri);
        
        // Demo risk
        const demoRisk = {
            riskSkoru: Math.random() * 100,
            volatilite: { altin: Math.random() * 10 },
            trend: { altin: (Math.random() - 0.5) * 10 }
        };
        
        this.riskGuncelle(demoRisk);
    }    /**
     * Fiyat güncelleme - Ana fonksiyon
     */
    fiyatlariGuncelle(veriSeti) {
        if (!veriSeti) {
            console.warn('⚠️ Boş veri seti');
            return;
        }
        
        // Grafik güncelleme rate limiting
        const simdi = Date.now();
        if (simdi - this.sonGrafikGuncellemeZamani < this.grafikGuncellemeAraligi) {
            console.log('🚫 Grafik güncelleme rate limit aktif');
            return;
        }
        
        this.sonGrafikGuncellemeZamani = simdi;
        
        try {
            console.log('💰 Fiyatlar güncelleniyor...', veriSeti);
            
            // Her bir varlık için fiyat güncelle
            this.tekFiyatGuncelle('altinFiyat', 'altinDegisim', veriSeti.altin, 'altin', '$');
            this.tekFiyatGuncelle('dolarFiyat', 'dolarDegisim', veriSeti.dolar, 'dolar', '₺');
            this.tekFiyatGuncelle('bitcoinFiyat', 'bitcoinDegisim', veriSeti.bitcoin, 'bitcoin', '$');
            this.tekFiyatGuncelle('borsaFiyat', 'borsaDegisim', veriSeti.borsa, 'borsa', '');
            
            // Ana grafik güncelle
            this.anaGrafigeVeriEkle(veriSeti);
            
            // Mini grafikler güncelle
            this.miniGrafikleriGuncelle(veriSeti);
            
            // Günlük istatistikleri güncelle
            this.gunlukIstatistikleriGuncelle(veriSeti);
            
            // Son güncelleme zamanı
            this.sonGuncellemeZamani = new Date();
            
            // Fiyat güncelleme zamanını göster
            const fiyatSonGuncelleme = document.getElementById('fiyatSonGuncelleme');
            if (fiyatSonGuncelleme) {
                fiyatSonGuncelleme.textContent = this.sonGuncellemeZamani.toLocaleTimeString('tr-TR');
            }
            
            console.log('✅ Fiyatlar başarıyla güncellendi');
            
        } catch (hata) {
            console.error('❌ Fiyat güncelleme hatası:', hata);
            this.hataYonetimi(hata, 'Fiyat güncelleme');
        }
    }

    /**
     * Tek fiyat güncelleme
     */
    tekFiyatGuncelle(fiyatElementId, degisimElementId, yeniFiyat, varlıkTip, sembol) {
        const fiyatElement = document.getElementById(fiyatElementId);
        const degisimElement = document.getElementById(degisimElementId);
        
        if (!fiyatElement || !degisimElement) {
            console.warn(`⚠️ Element bulunamadı: ${fiyatElementId} veya ${degisimElementId}`);
            return;
        }
        
        try {
            // Eski fiyatı al
            const eskiFiyatText = fiyatElement.textContent.replace(/[^0-9.-]/g, '');
            const eskiFiyat = parseFloat(eskiFiyatText) || 0;
            
            // Değişim hesapla
            const degisim = yeniFiyat - eskiFiyat;
            const degisimYuzde = eskiFiyat > 0 ? ((degisim / eskiFiyat) * 100) : 0;
            
            // Fiyatı formatla ve güncelle
            const formatlanmisFiyat = this.fiyatFormatla(yeniFiyat, varlıkTip, sembol);
            fiyatElement.textContent = formatlanmisFiyat;
            
            // Değişim güncelle
            this.degisimGuncelle(degisimElement, degisimYuzde, degisim, sembol);
            
            // Animasyon efekti
            this.fiyatAnimasyonu(fiyatElement, degisimYuzde);
            
            // Grafik verilerine ekle
            this.grafikVerilerineEkle(varlıkTip, yeniFiyat);
            
        } catch (hata) {
            console.error(`❌ ${varlıkTip} fiyat güncelleme hatası:`, hata);
        }
    }

    /**
     * Fiyat formatla
     */
    fiyatFormatla(fiyat, tip, sembol) {
        switch(tip) {
            case 'altin':
                return `${sembol}${fiyat.toFixed(2)}`;
            case 'dolar':
                return `${sembol}${fiyat.toFixed(4)}`;
            case 'bitcoin':
                return `${sembol}${Math.round(fiyat).toLocaleString('en-US')}`;
            case 'borsa':
                return fiyat.toFixed(2);
            default:
                return `${sembol}${fiyat.toFixed(2)}`;
        }
    }

    /**
     * Değişim güncelle
     */
    degisimGuncelle(element, yuzde, miktar, sembol) {
        const oranElement = element.querySelector('.değişim-oran');
        const miktarElement = element.querySelector('.değişim-miktar');
        
        if (oranElement && miktarElement) {
            // Yüzde değişim
            const isaret = yuzde > 0 ? '+' : '';
            oranElement.textContent = `${isaret}${yuzde.toFixed(2)}%`;
            
            // Miktar değişim
            const miktarIsaret = miktar > 0 ? '+' : '';
            miktarElement.textContent = `${miktarIsaret}${sembol}${Math.abs(miktar).toFixed(2)}`;
            
            // Renk ayarla
            if (yuzde > 0) {
                oranElement.className = 'değişim-oran pozitif';
            } else if (yuzde < 0) {
                oranElement.className = 'değişim-oran negatif';
            } else {
                oranElement.className = 'değişim-oran';
            }
        }
    }

    /**
     * Fiyat animasyonu
     */
    fiyatAnimasyonu(element, degisimYuzde) {
        if (!this.animasyonlarAktif) return;
        
        // Renk değişimi
        const originalBg = element.style.backgroundColor;
        
        if (degisimYuzde > 0) {
            element.style.backgroundColor = 'rgba(46, 204, 113, 0.2)'; // Yeşil
        } else if (degisimYuzde < 0) {
            element.style.backgroundColor = 'rgba(231, 76, 60, 0.2)'; // Kırmızı
        }
        
        // Animasyonu temizle
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 1000);
        
        // Pulse efekti
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    /**
     * Grafik verilerine ekle
     */
    grafikVerilerineEkle(varlık, fiyat) {
        const zaman = new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        if (this.grafikVerileri[varlık]) {
            this.grafikVerileri[varlık].labels.push(zaman);
            this.grafikVerileri[varlık].data.push(fiyat);
            
            // Son 50 veriyi tut
            if (this.grafikVerileri[varlık].labels.length > 50) {
                this.grafikVerileri[varlık].labels.shift();
                this.grafikVerileri[varlık].data.shift();
            }
        }
    }

    /**
     * Ana grafiğe veri ekle
     */
    anaGrafigeVeriEkle(veriSeti) {
        if (!this.anaGrafik) return;
        
        const assetSecim = document.getElementById('grafikAssetSecim');
        const secilenAsset = assetSecim ? assetSecim.value : 'altin';
        
        let veriDegeri, label;
        
        switch(secilenAsset) {
            case 'altin':
                veriDegeri = veriSeti.altin;
                label = 'Altın (USD/oz)';
                break;
            case 'dolar':
                veriDegeri = veriSeti.dolar;
                label = 'USD/TRY';
                break;
            case 'bitcoin':
                veriDegeri = veriSeti.bitcoin;
                label = 'Bitcoin (USD)';
                break;
            case 'borsa':
                veriDegeri = veriSeti.borsa;
                label = 'BIST 100';
                break;
            default:
                veriDegeri = veriSeti.altin;
                label = 'Altın (USD/oz)';
        }
        
        const zaman = new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Grafik verilerini güncelle
        this.anaGrafik.data.labels.push(zaman);
        this.anaGrafik.data.datasets[0].data.push(veriDegeri);
        this.anaGrafik.data.datasets[0].label = label;
          // Son 20 veriyi tut (önceden 30'du) - daha agresif temizleme
        if (this.anaGrafik.data.labels.length > 20) {
            this.anaGrafik.data.labels.shift();
            this.anaGrafik.data.datasets[0].data.shift();
        }
        
        this.anaGrafik.update('none');
        
        // Grafik istatistikleri güncelle
        this.grafikIstatistikleriGuncelle();
    }

    /**
     * Mini grafikleri güncelle
     */
    miniGrafikleriGuncelle(veriSeti) {
        const varlıklar = [
            { id: 'altinMiniGrafik', deger: veriSeti.altin },
            { id: 'dolarMiniGrafik', deger: veriSeti.dolar },
            { id: 'bitcoinMiniGrafik', deger: veriSeti.bitcoin },
            { id: 'borsaMiniGrafik', deger: veriSeti.borsa }
        ];
        
        varlıklar.forEach(varlık => {
            const miniGrafik = this.miniGrafikler.get(varlık.id);
            if (miniGrafik) {
                miniGrafik.data.labels.push('');
                miniGrafik.data.datasets[0].data.push(varlık.deger);
                  // Son 8 veriyi tut (önceden 10'du) - daha agresif temizleme
                if (miniGrafik.data.labels.length > 8) {
                    miniGrafik.data.labels.shift();
                    miniGrafik.data.datasets[0].data.shift();
                }
                
                miniGrafik.update('none');
            }
        });
    }

    /**
     * Risk güncelleme
     */
    riskGuncelle(riskVerisi) {
        if (!riskVerisi) {
            console.warn('⚠️ Boş risk verisi');
            return;
        }
        
        try {
            console.log('⚠️ Risk verileri güncelleniyor...', riskVerisi);
            
            const riskSkoru = riskVerisi.riskSkoru || 0;
            
            // Risk meter güncelle
            this.riskMeterGuncelle(riskSkoru);
            
            // Risk seviyesi metni güncelle
            this.riskSeviyesiGuncelle(riskSkoru);
            
            // Risk detayları güncelle
            this.riskDetaylariGuncelle(riskVerisi);
            
            // Risk güncelleme zamanı
            const riskGuncellemeElement = document.getElementById('riskGuncellemeZamani');
            if (riskGuncellemeElement) {
                riskGuncellemeElement.textContent = new Date().toLocaleTimeString('tr-TR');
            }
            
            console.log('✅ Risk güncelleme tamamlandı');
            
        } catch (hata) {
            console.error('❌ Risk güncelleme hatası:', hata);
            this.hataYonetimi(hata, 'Risk güncelleme');
        }
    }

    /**
     * Risk meter güncelle
     */
    riskMeterGuncelle(riskSkoru) {
        if (!this.riskMeterGrafik) return;
        
        const guvenliOran = Math.max(0, 100 - riskSkoru);
        const riskliOran = Math.min(100, riskSkoru);
        
        this.riskMeterGrafik.data.datasets[0].data = [guvenliOran, riskliOran];
        this.riskMeterGrafik.update();
        
        // Risk skoru göster
        const riskSkoruElement = document.getElementById('riskSkoru');
        if (riskSkoruElement) {
            riskSkoruElement.textContent = riskSkoru.toFixed(0);
        }
    }

    /**
     * Risk seviyesi güncelle
     */
    riskSeviyesiGuncelle(riskSkoru) {
        const riskSeviyeElement = document.getElementById('riskSeviyeTekst');
        if (!riskSeviyeElement) return;
        
        let seviye, sinif;
        
        if (riskSkoru < 30) {
            seviye = 'DÜŞÜK RİSK';
            sinif = 'dusuk';
        } else if (riskSkoru < 70) {
            seviye = 'ORTA RİSK';
            sinif = 'orta';
        } else {
            seviye = 'YÜKSEK RİSK';
            sinif = 'yuksek';
        }
        
        riskSeviyeElement.textContent = seviye;
        riskSeviyeElement.className = `risk-seviye ${sinif}`;
    }

    /**
     * Risk detayları güncelle
     */
    riskDetaylariGuncelle(riskVerisi) {
        // Volatilite
        const volatiliteElement = document.getElementById('volatiliteDegeri');
        if (volatiliteElement && riskVerisi.volatilite && riskVerisi.volatilite.altin) {
            volatiliteElement.textContent = riskVerisi.volatilite.altin.toFixed(2) + '%';
        }
        
        // Trend
        const trendElement = document.getElementById('trendDegeri');
        if (trendElement && riskVerisi.trend && riskVerisi.trend.altin) {
            const trend = riskVerisi.trend.altin;
            const isaret = trend > 0 ? '+' : '';
            trendElement.textContent = isaret + trend.toFixed(2) + '%';
            
            // Trend rengi
            if (trend > 0) {
                trendElement.style.color = '#2ecc71';
            } else if (trend < 0) {
                trendElement.style.color = '#e74c3c';
            } else {
                trendElement.style.color = '#7f8c8d';
            }
        }
        
        // Makro risk
        const makroRiskElement = document.getElementById('makroRisk');
        if (makroRiskElement && riskVerisi.makroekonomik) {
            makroRiskElement.textContent = riskVerisi.makroekonomik.fedRiski || 'Bilinmiyor';
        }
        
        // Jeopolitik risk
        const jeopolitikElement = document.getElementById('jeopolitikRisk');
        if (jeopolitikElement && riskVerisi.makroekonomik) {
            jeopolitikElement.textContent = riskVerisi.makroekonomik.jeopolitikRisk || 'Bilinmiyor';
        }
    }

    /**
     * Tahmin güncelleme
     */
    tahminGuncelle(tahminSonucu) {
        if (!tahminSonucu) {
            console.warn('⚠️ Boş tahmin sonucu');
            return;
        }
        
        try {
            console.log('🤖 AI tahmin güncelleniyor...', tahminSonucu);
            
            // Karar güncelle
            this.tahminKararGuncelle(tahminSonucu);
            
            // Güven seviyesi güncelle
            this.tahminGuvenGuncelle(tahminSonucu);
            
            // Detay bilgileri güncelle
            this.tahminDetaylariGuncelle(tahminSonucu);
            
            // Puanları güncelle
            this.tahminPuanlariGuncelle(tahminSonucu);
            
            // Tahmin zamanı güncelle
            const tahminZamaniElement = document.getElementById('tahminZamani');
            if (tahminZamaniElement) {
                tahminZamaniElement.textContent = 'Son tahmin: ' + new Date().toLocaleTimeString('tr-TR');
            }
            
            // Ses uyarısı
            this.sesUyarisiCal(tahminSonucu.karar);
            
            console.log('✅ Tahmin güncelleme tamamlandı');
            
        } catch (hata) {
            console.error('❌ Tahmin güncelleme hatası:', hata);
            this.hataYonetimi(hata, 'Tahmin güncelleme');
        }
    }

    /**
     * Tahmin kararı güncelle
     */
    tahminKararGuncelle(tahminSonucu) {
        const kararElement = document.getElementById('tahminKarar');
        if (!kararElement) return;
        
        const karar = tahminSonucu.karar || 'BEKLE';
        const icon = this.tahminIkonuGetir(karar);
        
        kararElement.innerHTML = `
            <i class="fas ${icon} tahmin-icon"></i>
            <span class="tahmin-text">${karar}</span>
        `;
        
        kararElement.className = `tahmin-karar ${karar}`;
        
        // Animasyon efekti
        if (this.animasyonlarAktif) {
            kararElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                kararElement.style.transform = 'scale(1)';
            }, 300);
        }
    }

    /**
     * Tahmin ikonu getir
     */
    tahminIkonuGetir(karar) {
        switch(karar) {
            case 'ALIM': return 'fa-arrow-up';
            case 'SATIM': return 'fa-arrow-down';
            case 'BEKLE': return 'fa-pause';
            case 'HATA': return 'fa-exclamation-triangle';
            default: return 'fa-hourglass-half';
        }
    }

    /**
     * Tahmin güven güncelle
     */
    tahminGuvenGuncelle(tahminSonucu) {
        const güvenDegeri = Math.round(tahminSonucu.güven || 0);
        
        // Güven değeri
        const güvenElement = document.getElementById('güvenDegeri');
        if (güvenElement) {
            güvenElement.textContent = güvenDegeri + '%';
        }
        
        // Güven progress bar
        const güvenProgress = document.getElementById('güvenProgress');
        if (güvenProgress) {
            güvenProgress.style.width = güvenDegeri + '%';
            
            // Renk ayarla
            if (güvenDegeri >= 70) {
                güvenProgress.style.backgroundColor = '#2ecc71';
            } else if (güvenDegeri >= 40) {
                güvenProgress.style.backgroundColor = '#f39c12';
            } else {
                güvenProgress.style.backgroundColor = '#e74c3c';
            }
        }
    }

    /**
     * Tahmin detayları güncelle
     */
    tahminDetaylariGuncelle(tahminSonucu) {
        // Önerilen saat
        const saatElement = document.getElementById('önerilenSaat');
        if (saatElement) {
            saatElement.textContent = tahminSonucu.önerilen_saat || '--:--';
        }
        
        // Hedef fiyat
        const hedefElement = document.getElementById('hedefFiyat');
        if (hedefElement) {
            hedefElement.textContent = tahminSonucu.hedef_fiyat || '$--';
        }
        
        // Beklenen değişim
        const degisimElement = document.getElementById('beklenenDegisim');
        if (degisimElement) {
            const degisim = tahminSonucu.beklenen_degisim || 0;
            const isaret = degisim > 0 ? '+' : '';
            degisimElement.textContent = isaret + degisim.toFixed(2) + '%';
            
            // Renk
            if (degisim > 0) {
                degisimElement.style.color = '#2ecc71';
            } else if (degisim < 0) {
                degisimElement.style.color = '#e74c3c';
            } else {
                degisimElement.style.color = '#7f8c8d';
            }
        }
        
        // Tahmin nedeni
        const nedenElement = document.getElementById('tahminNedeni');
        if (nedenElement) {
            nedenElement.textContent = tahminSonucu.neden || 'Analiz bekleniyor...';
        }
    }

    /**
     * Tahmin puanları güncelle
     */
    tahminPuanlariGuncelle(tahminSonucu) {
        // Alım puanı
        const alimElement = document.getElementById('alimPuani');
        if (alimElement) {
            alimElement.textContent = tahminSonucu.alim_puani || '0';
        }
        
        // Satım puanı
        const satimElement = document.getElementById('satimPuani');
        if (satimElement) {
            satimElement.textContent = tahminSonucu.satim_puani || '0';
        }
    }

    /**
     * Ses uyarısı çal
     */
    sesUyarisiCal(karar) {
        if (!this.sesUyarilariAktif) return;
        
        // Web Audio API ile basit ses oluştur
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Karar tipine göre frekans
            let frequency;
            switch(karar) {
                case 'ALIM': frequency = 800; break;
                case 'SATIM': frequency = 400; break;
                default: frequency = 600;
            }
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            
        } catch (hata) {
            console.warn('⚠️ Ses uyarısı çalınamadı:', hata);
        }
    }    /**
     * Bildirim ekleme
     */
    bildirimEkle(mesaj, tip = 'info', otomatikKapat = true) {
        const bildirimListesi = document.getElementById('bildirimListesi');
        if (!bildirimListesi) {
            console.warn('⚠️ Bildirim listesi bulunamadı');
            return;
        }
        
        // Rate limiting kontrolü - aynı mesaj türü için
        const simdi = Date.now();
        const sonZaman = this.sonBildirimZamanlari.get(tip) || 0;
        
        if (simdi - sonZaman < this.bildirimRateLimit && tip !== 'error') {
            // Kritik olmayan bildirimleri engelle
            console.log(`🚫 Bildirim rate limit: ${tip} - ${mesaj}`);
            return;
        }
        
        this.sonBildirimZamanlari.set(tip, simdi);
        this.bildirimSayaci++;
        
        const ikonlar = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const yeniBildirim = document.createElement('div');
        yeniBildirim.className = `bildirim-item ${tip}`;
        yeniBildirim.innerHTML = `
            <div class="bildirim-icon">
                <i class="fas ${ikonlar[tip]}"></i>
            </div>
            <div class="bildirim-content">
                <div class="bildirim-header">
                    <span class="bildirim-title">${this.bildirimBasligi(tip)}</span>
                    <span class="bildirim-time">${new Date().toLocaleTimeString('tr-TR')}</span>
                </div>
                <div class="bildirim-message">${mesaj}</div>
            </div>
        `;
        
        // En üste ekle
        bildirimListesi.insertBefore(yeniBildirim, bildirimListesi.firstChild);
        
        // Animasyon
        if (this.animasyonlarAktif) {
            yeniBildirim.style.opacity = '0';
            yeniBildirim.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                yeniBildirim.style.opacity = '1';
                yeniBildirim.style.transform = 'translateX(0)';
                yeniBildirim.style.transition = 'all 0.3s ease';
            }, 10);
        }        // Agresif bildirim kontrolü - çok düşük limit uygula
        const maksimumGorunenBildirim = Math.min(this.maksimumBildirim, 8); // Maksimum 8 bildirim göster (çok düşük)
        while (bildirimListesi.children.length > maksimumGorunenBildirim) {
            const sonElement = bildirimListesi.lastChild;
            if (sonElement) {
                bildirimListesi.removeChild(sonElement);
            }
        }

        // Bildirim sayısını güncelle
        this.bildirimSayisiniGuncelle();

        // Otomatik kapanma ve temizleme - çok agresif
        if (otomatikKapat) {
            setTimeout(() => {
                if (yeniBildirim.parentNode) {
                    yeniBildirim.style.opacity = '0.5';
                    // 3 saniye sonra tamamen kaldır (çok hızlı)
                    setTimeout(() => {
                        if (yeniBildirim.parentNode) {
                            bildirimListesi.removeChild(yeniBildirim);
                            this.bildirimSayisiniGuncelle();
                        }
                    }, 3000);
                }
            }, 2000); // 2 saniye sonra fade (çok hızlı)
        }
        
        console.log(`📢 Bildirim eklendi: ${tip} - ${mesaj}`);
    }

    /**
     * Bildirim başlığı
     */
    bildirimBasligi(tip) {
        switch(tip) {
            case 'success': return 'Başarılı';
            case 'error': return 'Hata';
            case 'warning': return 'Uyarı';
            case 'info': return 'Bilgi';
            default: return 'Bildirim';
        }
    }

    /**
     * Bildirim sayısını güncelle
     */
    bildirimSayisiniGuncelle() {
        const bildirimSayisiElement = document.getElementById('bildirimSayisi');
        if (bildirimSayisiElement) {
            const okunmamisSayisi = document.querySelectorAll('.bildirim-item:not(.okundu)').length;
            bildirimSayisiElement.textContent = okunmamisSayisi;
            
            if (okunmamisSayisi > 0) {
                bildirimSayisiElement.style.display = 'block';
            } else {
                bildirimSayisiElement.style.display = 'none';
            }
        }
    }

        // ====== DİĞER FONKSİYONLAR DEVAM EDİYOR... ======

    /**
     * Grafik asset değiştir
     */
    grafikAssetDegistir(yeniAsset) {
        console.log(`📊 Grafik asset değiştiriliyor: ${yeniAsset}`);
        
        if (!this.anaGrafik) return;
        
        // Grafik verilerini temizle
        this.anaGrafik.data.labels = [];
        this.anaGrafik.data.datasets[0].data = [];
        
        // Asset'e göre grafik ayarları
        const assetAyarlari = this.assetGrafikAyarlariGetir(yeniAsset);
        
        // Grafik güncelle
        this.anaGrafik.data.datasets[0].label = assetAyarlari.label;
        this.anaGrafik.data.datasets[0].borderColor = assetAyarlari.renk;
        this.anaGrafik.data.datasets[0].backgroundColor = assetAyarlari.renk + '20';
        
        // Mevcut verileri yükle
        this.mevcutVerileriGrafigeYukle(yeniAsset);
        
        this.anaGrafik.update();
        
        console.log(`✅ Grafik asset değiştirildi: ${yeniAsset}`);
    }

    /**
     * Asset grafik ayarları getir
     */
    assetGrafikAyarlariGetir(asset) {
        const ayarlar = {
            altin: {
                label: 'Altın (XAU/USD)',
                renk: '#ffd700',
                birim: '$',
                desimal: 2
            },
            dolar: {
                label: 'USD/TRY',
                renk: '#27ae60',
                birim: '₺',
                desimal: 4
            },
            bitcoin: {
                label: 'Bitcoin (BTC/USD)',
                renk: '#f7931a',
                birim: '$',
                desimal: 0
            },
            borsa: {
                label: 'BIST 100 Endeksi',
                renk: '#3498db',
                birim: '',
                desimal: 2
            }
        };
        
        return ayarlar[asset] || ayarlar.altin;
    }

    /**
     * Mevcut verileri grafiğe yükle
     */
    mevcutVerileriGrafigeYukle(asset) {
        if (this.grafikVerileri[asset]) {
            const veriler = this.grafikVerileri[asset];
            this.anaGrafik.data.labels = [...veriler.labels];
            this.anaGrafik.data.datasets[0].data = [...veriler.data];
        }
    }

    /**
     * Grafik zaman aralığı değiştir
     */
    grafikZamanAraligiDegistir(zamanAraligi) {
        console.log(`⏰ Grafik zaman aralığı değiştiriliyor: ${zamanAraligi}`);
        
        let veriSayisi;
        switch(zamanAraligi) {
            case '10m': veriSayisi = 10; break;
            case '1h': veriSayisi = 60; break;
            case '6h': veriSayisi = 360; break;
            case '24h': veriSayisi = 1440; break;
            default: veriSayisi = 30;
        }
        
        // Ana grafikte gösterilecek veri sayısını ayarla
        if (this.anaGrafik) {
            const mevcutVeriSayisi = this.anaGrafik.data.labels.length;
            
            if (mevcutVeriSayisi > veriSayisi) {
                // Fazla verileri kaldır
                this.anaGrafik.data.labels = this.anaGrafik.data.labels.slice(-veriSayisi);
                this.anaGrafik.data.datasets[0].data = this.anaGrafik.data.datasets[0].data.slice(-veriSayisi);
            }
            
            this.anaGrafik.update();
        }
        
        console.log(`✅ Zaman aralığı değiştirildi: ${zamanAraligi} (${veriSayisi} veri)`);
    }

    /**
     * Grafik istatistikleri güncelle
     */
    grafikIstatistikleriGuncelle() {
        if (!this.anaGrafik || this.anaGrafik.data.datasets[0].data.length === 0) return;
        
        const veriler = this.anaGrafik.data.datasets[0].data;
        
        const enYuksek = Math.max(...veriler);
        const enDusuk = Math.min(...veriler);
        const ortalama = veriler.reduce((a, b) => a + b, 0) / veriler.length;
        const veriSayisi = veriler.length;
        
        // Elementleri güncelle
        this.statistikElementGuncelle('günlükYüksek', enYuksek);
        this.statistikElementGuncelle('günlükDüşük', enDusuk);
        this.statistikElementGuncelle('günlükOrtalama', ortalama);
        
        const veriSayisiElement = document.getElementById('grafikVeriSayisi');
        if (veriSayisiElement) {
            veriSayisiElement.textContent = veriSayisi;
        }
    }

    /**
     * Statistik element güncelle
     */
    statistikElementGuncelle(elementId, deger) {
        const element = document.getElementById(elementId);
        if (element) {
            // Asset tipine göre formatla
            const assetSecim = document.getElementById('grafikAssetSecim');
            const asset = assetSecim ? assetSecim.value : 'altin';
            const ayarlar = this.assetGrafikAyarlariGetir(asset);
            
            element.textContent = ayarlar.birim + deger.toFixed(ayarlar.desimal);
        }
    }

    /**
     * Günlük istatistikler güncelle
     */
    gunlukIstatistikleriGuncelle(veriSeti) {
        // Toplam veri sayısı
        const toplamVeriElement = document.getElementById('toplamVeriSayisi');
        if (toplamVeriElement && typeof nakitSistem !== 'undefined') {
            toplamVeriElement.textContent = nakitSistem.toplamVeriSayisi || 0;
        }
        
        // Toplam tahmin
        const toplamTahminElement = document.getElementById('toplamTahmin');
        if (toplamTahminElement && typeof nakitSistem !== 'undefined') {
            toplamTahminElement.textContent = nakitSistem.toplamTahminSayisi || 0;
        }
        
        // Aktif gün sayısı
        const aktifGunElement = document.getElementById('aktifGunSayisi');
        if (aktifGunElement) {
            const baslangic = new Date('2025-06-01');
            const bugun = new Date();
            const fark = Math.ceil((bugun - baslangic) / (1000 * 60 * 60 * 24));
            aktifGunElement.textContent = Math.max(1, fark);
        }
        
        // Çalışma süresi
        this.calismaSuresiniGuncelle();
    }

    /**
     * Çalışma süresini güncelle
     */
    calismaSuresiniGuncelle() {
        const calismaSuresiElement = document.getElementById('toplamCalismaSuresi');
        if (!calismaSuresiElement) return;
        
        if (this.sistemBaslamaZamani) {
            const gecenSure = new Date() - this.sistemBaslamaZamani;
            const formatliSure = this.formatSure(gecenSure / 1000);
            calismaSuresiElement.textContent = formatliSure;
        } else {
            calismaSuresiElement.textContent = '00:00:00';
        }
    }

    /**
     * Performans güncelleme
     */
    performansGuncelle() {
        if (typeof nakitSistem === 'undefined') return;
        
        const performans = nakitSistem.sistemPerformansiHesapla();
        
        // Sistem performansı
        const performansElement = document.getElementById('sistemPerformansi');
        if (performansElement) {
            performansElement.textContent = performans.basariOrani.toFixed(1) + '%';
        }
        
        // Bellek kullanımı
        const bellekElement = document.getElementById('bellekKullanimi');
        if (bellekElement) {
            bellekElement.textContent = performans.bellekKullanimi || 'Bilinmiyor';
        }
        
        // Başarı oranı (footer)
        const basariOraniElement = document.getElementById('basariOrani');
        if (basariOraniElement) {
            basariOraniElement.textContent = performans.basariOrani.toFixed(1) + '%';
        }
        
        // Toplam API çağrısı
        const toplamApiElement = document.getElementById('toplamApiCagrisi');
        if (toplamApiElement) {
            const toplam = nakitSistem.basariliApiCagrisi + nakitSistem.basarisizApiCagrisi;
            toplamApiElement.textContent = toplam.toLocaleString();
        }
        
        // Performans grafiğini güncelle
        this.performansGrafigiGuncelle(performans.basariOrani);
    }    /**
     * Performans grafiği güncelle
     */
    performansGrafigiGuncelle(performansOrani) {
        if (!this.performansGrafik) return;
        
        // Startup sırasında grafik güncellemelerini engelle
        if (!this.sistemBaslamaZamani || (new Date() - this.sistemBaslamaZamani) < 120000) {
            console.log('🚫 Startup sırasında grafik güncelleme atlandı');
            return;
        }
        
        const zaman = new Date().toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        this.performansGrafik.data.labels.push(zaman);
        this.performansGrafik.data.datasets[0].data.push(performansOrani);
        
        // Son 10 veriyi tut (daha da agresif temizleme)
        if (this.performansGrafik.data.labels.length > 10) {
            this.performansGrafik.data.labels.shift();
            this.performansGrafik.data.datasets[0].data.shift();
        }
        
        this.performansGrafik.update('none');
    }

    /**
     * Teknik analiz güncelle
     */
    teknikAnalizGuncelle(teknikVeriler) {
        if (!teknikVeriler) return;
        
        console.log('📊 Teknik analiz güncelleniyor...', teknikVeriler);
        
        // RSI güncelle
        this.rsiGuncelle(teknikVeriler.rsi);
        
        // MACD güncelle
        this.macdGuncelle(teknikVeriler.macd);
        
        // MA güncelle
        this.hareketliOrtalamaGuncelle(teknikVeriler.hareketliOrtalama);
        
        // Teknik analiz zamanı
        const teknikGuncellemeElement = document.getElementById('teknikGuncelleme');
        if (teknikGuncellemeElement) {
            teknikGuncellemeElement.textContent = new Date().toLocaleTimeString('tr-TR');
        }
    }

    /**
     * RSI güncelle
     */
    rsiGuncelle(rsiVerisi) {
        if (!rsiVerisi) return;
        
        // RSI değeri
        const rsiDegerElement = document.getElementById('rsiDegeri');
        if (rsiDegerElement) {
            rsiDegerElement.textContent = rsiVerisi.deger.toFixed(1);
        }
        
        // RSI sinyali
        const rsiSinyalElement = document.getElementById('rsiSinyali');
        if (rsiSinyalElement) {
            rsiSinyalElement.textContent = rsiVerisi.sinyal;
            rsiSinyalElement.className = `sinyal ${rsiVerisi.sinyal}`;
        }
        
        // RSI bar
        const rsiFillElement = document.getElementById('rsiFill');
        if (rsiFillElement) {
            rsiFillElement.style.width = rsiVerisi.deger + '%';
        }
    }

    /**
     * MACD güncelle
     */
    macdGuncelle(macdVerisi) {
        if (!macdVerisi) return;
        
        // MACD değeri
        const macdDegerElement = document.getElementById('macdDegeri');
        if (macdDegerElement) {
            macdDegerElement.textContent = macdVerisi.histogram.toFixed(4);
        }
        
        // MACD sinyali
        const macdSinyalElement = document.getElementById('macdSinyali');
        if (macdSinyalElement) {
            macdSinyalElement.textContent = macdVerisi.sinyal;
            macdSinyalElement.className = `sinyal ${macdVerisi.sinyal}`;
        }
        
        // MACD histogram çiz
        this.macdHistogramCiz(macdVerisi);
    }

    /**
     * MACD histogram çiz
     */
    macdHistogramCiz(macdVerisi) {
        if (!this.macdCanvas) return;
        
        const canvas = document.getElementById('macdCanvas');
        const ctx = this.macdCanvas;
        
        // Canvas temizle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Histogram çiz
        const centerY = canvas.height / 2;
        const barWidth = canvas.width / 10;
        
        for (let i = 0; i < 10; i++) {
            const x = i * barWidth;
            const histogramValue = (Math.random() - 0.5) * 0.01; // Demo değer
            const barHeight = histogramValue * 1000;
            
            if (histogramValue > 0) {
                ctx.fillStyle = '#2ecc71';
                ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight);
            } else {
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(x, centerY, barWidth - 1, Math.abs(barHeight));
            }
        }
        
        // Orta çizgi
        ctx.strokeStyle = '#7f8c8d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
    }

    /**
     * Hareketli ortalama güncelle
     */
    hareketliOrtalamaGuncelle(maVerisi) {
        if (!maVerisi) return;
        
        // MA5
        const ma5Element = document.getElementById('ma5');
        if (ma5Element) {
            ma5Element.textContent = '$' + maVerisi.ma5.toFixed(2);
        }
        
        // MA20
        const ma20Element = document.getElementById('ma20');
        if (ma20Element) {
            ma20Element.textContent = '$' + maVerisi.ma20.toFixed(2);
        }
        
        // MA sinyali
        const maSinyalElement = document.getElementById('maSinyali');
        if (maSinyalElement) {
            maSinyalElement.textContent = maVerisi.sinyal;
            maSinyalElement.className = `ma-sinyal ${maVerisi.sinyal}`;
        }
    }

    /**
     * Otomatik veri güncelleme
     */
    otomatikVeriGuncelle() {
        if (typeof nakitSistem === 'undefined') return;
        
        // Sistem durumunu kontrol et
        const sistemDurumu = nakitSistem.veriToplamaAktif;
        this.sistemDurumuGuncelle(sistemDurumu);
        
        // İstatistikleri güncelle
        this.gunlukIstatistikleriGuncelle();
        this.performansGuncelle();
    }

    /**
     * Sistem durumu güncelle
     */
    sistemDurumuGuncelle(aktif) {
        const sistemDurumuElement = document.getElementById('sistemDurumu');
        if (!sistemDurumuElement) return;
        
        if (aktif) {
            sistemDurumuElement.textContent = '🟢 Aktif';
            sistemDurumuElement.className = 'sistem-durumu aktif';
        } else {
            sistemDurumuElement.textContent = '🔴 Durduruldu';
            sistemDurumuElement.className = 'sistem-durumu durduruldu';
        }
    }

    /**
     * Mobil menü toggle
     */
    mobilMenuToggle() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        }
    }

    /**
     * Klavye kısayolları
     */
    klavyeKisayollari(event) {
        // Ctrl tuşu ile kısayollar
        if (event.ctrlKey) {
            switch(event.key) {
                case '1':
                    event.preventDefault();
                    this.sayfaGec('dashboard');
                    break;
                case '2':
                    event.preventDefault();
                    this.sayfaGec('analiz');
                    break;
                case '3':
                    event.preventDefault();
                    this.sayfaGec('portfoy');
                    break;
                case '4':
                    event.preventDefault();
                    this.sayfaGec('ayarlar');
                    break;
                case 'r':
                    event.preventDefault();
                    this.fiyatlariYenile();
                    break;
            }
        }
        
        // F tuşları
        switch(event.key) {
            case 'F5':
                if (typeof nakitSistem !== 'undefined' && nakitSistem.veriToplamaAktif) {
                    event.preventDefault();
                    this.bildirimEkle('Sistem aktifken sayfa yenilenemez!', 'warning');
                }
                break;
        }
    }

    /**
     * Sayfa boyut değişikliği
     */
    sayfaBoyutDegisti() {
        // Grafikleri yeniden boyutlandır
        if (this.anaGrafik) {
            this.anaGrafik.resize();
        }
        
        if (this.riskMeterGrafik) {
            this.riskMeterGrafik.resize();
        }
        
        if (this.performansGrafik) {
            this.performansGrafik.resize();
        }
        
        // Mini grafikleri yeniden boyutlandır
        this.miniGrafikler.forEach(grafik => {
            grafik.resize();
        });
    }

    /**
     * Tema ayarlari yukle
     */
    temaAyarlariYukle() {
        const kaydedilmisTema = localStorage.getItem('nakit_tema');
        if (kaydedilmisTema) {
            this.koyu_tema = kaydedilmisTema === 'koyu';
            this.temaUygula();
        }
    }

    /**
     * Tema uygula
     */
    temaUygula() {
        if (this.koyu_tema) {
            document.body.classList.add('koyu-tema');
        } else {
            document.body.classList.remove('koyu-tema');
        }
        
        // Tema tercihini kaydet
        localStorage.setItem('nakit_tema', this.koyu_tema ? 'koyu' : 'acik');
    }

    /**
     * Tooltip'leri başlat
     */
    tooltipleriBaslat() {
        const tooltipElements = document.querySelectorAll('[title]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.tooltipGoster(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.tooltipGizle();
            });
        });
    }

    /**
     * Tooltip göster
     */
    tooltipGoster(element) {
        const tooltipText = element.getAttribute('title');
        if (!tooltipText) return;
        
        // Title'ı geçici olarak kaldır
        element.setAttribute('data-original-title', tooltipText);
        element.removeAttribute('title');
        
        // Tooltip elementi oluştur
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            pointer-events: none;
            z-index: 10000;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        // Pozisyon hesapla
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        this.aktifTooltip = tooltip;
    }

    /**
     * Tooltip gizle
     */
    tooltipGizle() {
        if (this.aktifTooltip) {
            this.aktifTooltip.remove();
            this.aktifTooltip = null;
        }
        
        // Title'ı geri getir
        const elementWithData = document.querySelector('[data-original-title]');
        if (elementWithData) {
            elementWithData.setAttribute('title', elementWithData.getAttribute('data-original-title'));
            elementWithData.removeAttribute('data-original-title');
        }
    }

    /**
     * Hata yönetimi
     */
    hataYonetimi(hata, konum) {
        console.error(`❌ Hata (${konum}):`, hata);
        
        this.bildirimEkle(
            `${konum} sırasında hata: ${hata.message}`,
            'error'
        );
        
        // Kritik hatalarda sistem durdur
        if (hata.name === 'TypeError' || hata.name === 'ReferenceError') {
            this.kritikHataYonetimi(hata, konum);
        }
    }

    /**
     * Kritik hata yönetimi
     */
    kritikHataYonetimi(hata, konum) {
        console.error(`🚨 Kritik hata (${konum}):`, hata);
        
        // Sistemle bağlantıyı kes
        if (typeof nakitSistem !== 'undefined') {
            nakitSistem.veriToplamayiDurdur();
        }
        
        this.bildirimEkle(
            `Kritik hata nedeniyle sistem durduruldu. Sayfa yenilenecek.`,
            'error'
        );
        
        // 5 saniye sonra sayfayı yenile
        setTimeout(() => {
            location.reload();
        }, 5000);
    }    /**
     * Dashboard başlangıç fonksiyonu - Sistem başlatıldığında çağrılır
     */
    sistemBasladi() {
        this.sistemBaslamaZamani = new Date();
        
        // Startup progress göstergesi
        this.startupProgressGoster();
        
        // Hemen DOM temizliği yap
        this.agresifDomTemizligi();
        
        // Gelişmiş bellek izleme sistemini başlat
        this.gelistirilenBellekIzleme();
        
        // İlk agresif temizliği başlat (daha erken)
        setTimeout(() => {
            this.agresifDomTemizligi();
        }, 2000);
        
        // Periyodik temizlik başlat - her 20 saniyede bir
        this.periyodikTemizlikTimer = setInterval(() => {
            console.log('🧹 Periyodik DOM temizliği...');
            this.agresifDomTemizligi();
        }, 20000);
        
        this.bildirimEkle(
            'Nakit finansal sistem başarıyla başlatıldı!',
            'success'
        );
        
        this.bildirimEkle(
            'Gelişmiş bellek izleme sistemi aktifleştirildi',
            'info'
        );
        
        // Dashboard butonlarını aktifleştir
        const baslatBtn = document.getElementById('başlatBtn');
        const durdurBtn = document.getElementById('durdurBtn');
        
        if (baslatBtn) baslatBtn.disabled = true;
        if (durdurBtn) durdurBtn.disabled = false;
        
        console.log('✅ Dashboard - Sistem başlatıldı');
        console.log('🧠 Bellek izleme sistemi aktif');
        
        // Startup progress göstergesi
        this.startupProgressGoster();
    }    /**
     * Dashboard durdurma fonksiyonu - Sistem durdurulduğunda çağrılır
     */
    sistemDurduruldu() {
        // Bellek izleme sistemini durdur
        if (this.bellekIzlemeTimer) {
            clearInterval(this.bellekIzlemeTimer);
            this.bellekIzlemeTimer = null;
            console.log('🧠 Bellek izleme sistemi durduruldu');
        }
        
        // Periyodik temizlik sistemini durdur
        if (this.periyodikTemizlikTimer) {
            clearInterval(this.periyodikTemizlikTimer);
            this.periyodikTemizlikTimer = null;
            console.log('🧹 Periyodik temizlik sistemi durduruldu');
        }
        
        this.bildirimEkle(
            'Nakit finansal sistem durduruldu.',
            'warning'
        );
        
        this.bildirimEkle(
            'Bellek izleme sistemi devre dışı bırakıldı',
            'info'
        );
        
        // Dashboard butonlarını güncel duruma getir
        const baslatBtn = document.getElementById('başlatBtn');
        const durdurBtn = document.getElementById('durdurBtn');
        
        if (baslatBtn) baslatBtn.disabled = false;
        if (durdurBtn) durdurBtn.disabled = true;
        
        console.log('⏹️ Dashboard - Sistem durduruldu');
    }

    /**
     * Dashboard temizleme - Memory leak'leri önlemek için
     */
    temizle() {
        console.log('🧹 Dashboard temizleniyor...');
        
        // Timer'ları temizle
        if (this.guncellemeTimer) {
            clearInterval(this.guncellemeTimer);
            this.guncellemeTimer = null;
        }
        
        if (this.performansTimer) {
            clearInterval(this.performansTimer);
            this.performansTimer = null;
        }
        
        if (this.saatTimer) {
            clearInterval(this.saatTimer);
            this.saatTimer = null;
        }
        
        if (this.otomatikYenilemeTimer) {
            clearInterval(this.otomatikYenilemeTimer);
            this.otomatikYenilemeTimer = null;
        }
        
        // Grafikleri temizle
        if (this.anaGrafik) {
            this.anaGrafik.destroy();
            this.anaGrafik = null;
        }
        
        if (this.riskMeterGrafik) {
            this.riskMeterGrafik.destroy();
            this.riskMeterGrafik = null;
        }
        
        if (this.performansGrafik) {
            this.performansGrafik.destroy();
            this.performansGrafik = null;
        }
        
        // Mini grafikleri temizle
        this.miniGrafikler.forEach(grafik => {
            grafik.destroy();
        });
        this.miniGrafikler.clear();
        
        console.log('✅ Dashboard temizlendi');
    }

    /**
     * Dashboard durumu al
     */
    durumAl() {
        return {
            versiyon: this.versiyon,
            aktifSayfa: this.aktifSayfa,
            sistemBaslamaZamani: this.sistemBaslamaZamani,
            sonGuncellemeZamani: this.sonGuncellemeZamani,
            bildirimSayaci: this.bildirimSayaci,
            grafikSayisi: this.miniGrafikler.size + 3, // Ana + Risk + Performans
            animasyonlarAktif: this.animasyonlarAktif,
            otomatikYenileme: this.otomatikYenileme
        };
    }

    /**
     * Dashboard ayarları kaydet
     */
    ayarlariKaydet() {
        const ayarlar = {
            animasyonlarAktif: this.animasyonlarAktif,
            sesUyarilariAktif: this.sesUyarilariAktif,
            otomatikYenileme: this.otomatikYenileme,
            koyu_tema: this.koyu_tema,
            maksimumBildirim: this.maksimumBildirim
        };
        
        localStorage.setItem('nakit_dashboard_ayarlari', JSON.stringify(ayarlar));
        console.log('💾 Dashboard ayarları kaydedildi');
    }

    /**
     * Dashboard ayarları yükle
     */
    ayarlariYukle() {
        const kaydedilmisAyarlar = localStorage.getItem('nakit_dashboard_ayarlari');
        if (kaydedilmisAyarlar) {
            try {
                const ayarlar = JSON.parse(kaydedilmisAyarlar);
                
                this.animasyonlarAktif = ayarlar.animasyonlarAktif ?? true;
                this.sesUyarilariAktif = ayarlar.sesUyarilariAktif ?? true;
                this.otomatikYenileme = ayarlar.otomatikYenileme ?? true;
                this.koyu_tema = ayarlar.koyu_tema ?? false;
                this.maksimumBildirim = ayarlar.maksimumBildirim ?? 50;
                
                console.log('📥 Dashboard ayarları yüklendi');
            } catch (hata) {
                console.warn('⚠️ Dashboard ayarları yüklenemedi:', hata);
            }
        }
    }    /**
     * Agresif DOM temizliği - Sayfa büyümesini önlemek için
     */
    agresifDomTemizligi() {
        console.log('🧹 Agresif DOM temizliği başlatılıyor...');
        
        // Bildirimleri çok agresif şekilde temizle - maksimum 5 bildirim
        const bildirimListesi = document.getElementById('bildirimListesi');
        if (bildirimListesi) {
            while (bildirimListesi.children.length > 5) {
                const sonElement = bildirimListesi.lastChild;
                if (sonElement) {
                    bildirimListesi.removeChild(sonElement);
                }
            }
        }
        
        // Log listesini daha agresif temizle - maksimum 10 log
        const logListesi = document.getElementById('logListesi');
        if (logListesi) {
            while (logListesi.children.length > 10) {
                const sonElement = logListesi.lastChild;
                if (sonElement) {
                    logListesi.removeChild(sonElement);
                }
            }
        }
        
        // Grafik verilerini çok agresif temizle - maksimum 10 veri noktası
        if (this.anaGrafik && this.anaGrafik.data.labels.length > 10) {
            const veriSayisi = this.anaGrafik.data.labels.length;
            const silinecekSayisi = veriSayisi - 10;
            
            for (let i = 0; i < silinecekSayisi; i++) {
                this.anaGrafik.data.labels.shift();
                this.anaGrafik.data.datasets[0].data.shift();
            }
            this.anaGrafik.update('none');
        }
        
        // Mini grafikleri temizle
        this.miniGrafikler.forEach(miniGrafik => {
            if (miniGrafik.data.labels.length > 6) {
                const veriSayisi = miniGrafik.data.labels.length;
                const silinecekSayisi = veriSayisi - 6;
                
                for (let i = 0; i < silinecekSayisi; i++) {
                    miniGrafik.data.labels.shift();
                    miniGrafik.data.datasets[0].data.shift();
                }
                miniGrafik.update('none');
            }
        });
        
        // Performans grafiğini temizle
        if (this.performansGrafik && this.performansGrafik.data.labels.length > 10) {
            const veriSayisi = this.performansGrafik.data.labels.length;
            const silinecekSayisi = veriSayisi - 10;
            
            for (let i = 0; i < silinecekSayisi; i++) {
                this.performansGrafik.data.labels.shift();
                this.performansGrafik.data.datasets[0].data.shift();
            }
            this.performansGrafik.update('none');
        }
        
        // Gereksiz event listener'ları temizle
        this.temizleEskiEventListenerlar();
        
        console.log('✅ Agresif DOM temizliği tamamlandı');
    }

    /**
     * Eski event listener'ları temizle
     */
    temizleEskiEventListenerlar() {
        // Mevcut event listener'ları temizlemek için yeniden ekle
        const elementler = [
            'grafikAssetSecim', 
            'grafikZamanAraligi',
            'mobile-menu'
        ];
        
        elementler.forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                // Yeni element oluştur ve eski ile değiştir (event listener'ları temizler)
                const yeniElement = element.cloneNode(true);
                if (element.parentNode) {
                    element.parentNode.replaceChild(yeniElement, element);
                }
            }
        });
    }

    /**
     * Gelişmiş bellek izleme sistemi
     */
    gelistirilenBellekIzleme() {
        if (!this.bellekIzlemeTimer) {
            this.bellekIzlemeTimer = setInterval(() => {
                if (performance.memory) {
                    const kullanilan = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
                    const limit = performance.memory.jsHeapSizeLimit / 1024 / 1024; // MB
                    const kullanımOrani = (kullanilan / limit) * 100;
                      console.log(`🧠 Bellek kullanımı: ${kullanilan.toFixed(1)}MB / ${limit.toFixed(1)}MB (${kullanımOrani.toFixed(1)}%)`);
                    
                    // %40'dan fazla bellek kullanılıyorsa agresif temizlik yap (daha proaktif)
                    if (kullanımOrani > 40) {
                        console.warn('⚠️ Yüksek bellek kullanımı! Agresif temizlik başlatılıyor...');
                        
                        if (typeof nakitSistem !== 'undefined') {
                            nakitSistem.agresifTemizlik();
                        }
                        
                        this.agresifDomTemizligi();
                        
                        // Bildirim ekle
                        this.bildirimEkle(
                            `Yüksek bellek kullanımı: ${kullanımOrani.toFixed(1)}% - Otomatik temizlik yapıldı`,
                            'warning'
                        );
                    }
                    
                    // %60'dan fazla kullanılıyorsa acil müdahale (daha düşük eşik)
                    if (kullanımOrani > 60) {
                        console.error('🚨 Kritik bellek kullanımı! Acil temizlik başlatılıyor...');
                        this.acilBellekTemizligi();
                    }                }
            }, 10000); // Her 10 saniyede bir kontrol et (daha sık)
        }
    }

    /**
     * Acil bellek temizliği
     */
    acilBellekTemizligi() {
        console.log('🚨 Acil bellek temizliği başlatılıyor...');
        
        // Tüm grafikleri yeniden başlat
        if (this.anaGrafik) {
            this.anaGrafik.data.labels = [];
            this.anaGrafik.data.datasets[0].data = [];
            this.anaGrafik.update();
        }
        
        if (this.performansGrafik) {
            this.performansGrafik.data.labels = [];
            this.performansGrafik.data.datasets[0].data = [];
            this.performansGrafik.update();
        }
        
        // Mini grafikleri temizle
        this.miniGrafikler.forEach(grafik => {
            grafik.data.labels = [];
            grafik.data.datasets[0].data = [];
            grafik.update();
        });
        
        // Tüm bildirimleri temizle
        const bildirimListesi = document.getElementById('bildirimListesi');
        if (bildirimListesi) {
            bildirimListesi.innerHTML = '';
        }
        
        // Log listesini temizle
        const logListesi = document.getElementById('logListesi');
        if (logListesi) {
            logListesi.innerHTML = '';
        }
        
        // Grafik verilerini sıfırla
        this.grafikVerileri = {
            altin: { labels: [], data: [] },
            dolar: { labels: [], data: [] },
            bitcoin: { labels: [], data: [] },
            borsa: { labels: [], data: [] }
        };
        
        // Sistem bildirimini ekle
        setTimeout(() => {
            this.bildirimEkle(
                'Kritik bellek kullanımı nedeniyle tüm veriler temizlendi',
                'error'
            );
        }, 1000);
        
        console.log('✅ Acil bellek temizliği tamamlandı');
    }

    /**
     * Startup progress göstergesi
     */
    startupProgressGoster() {
        const bildirimListesi = document.getElementById('bildirimListesi');
        if (!bildirimListesi) return;
        
        const progressBildirim = document.createElement('div');
        progressBildirim.id = 'startupProgress';
        progressBildirim.className = 'bildirim info startup-progress';
        progressBildirim.innerHTML = `
            <div class="bildirim-header">
                <i class="fas fa-rocket"></i>
                <span class="bildirim-title">Sistem Başlatılıyor</span>
                <span class="bildirim-time">${new Date().toLocaleTimeString('tr-TR')}</span>
            </div>
            <div class="bildirim-message">
                Sistem optimizasyonu için veri toplama 30 saniye geciktirildi...
                <div class="progress-bar">
                    <div class="progress-fill" id="startupProgressFill"></div>
                </div>
            </div>
        `;
        
        bildirimListesi.insertBefore(progressBildirim, bildirimListesi.firstChild);
        
        // Progress bar animasyonu
        let progress = 0;
        const progressFill = document.getElementById('startupProgressFill');
        
        const progressTimer = setInterval(() => {
            progress += 3.33; // 30 saniyede %100'e ulaş
            if (progressFill) {
                progressFill.style.width = `${Math.min(progress, 100)}%`;
            }
            
            if (progress >= 100) {
                clearInterval(progressTimer);
                
                // 2 saniye sonra kaldır
                setTimeout(() => {
                    if (progressBildirim.parentNode) {
                        progressBildirim.remove();
                        
                        this.bildirimEkle(
                            'Sistem startup aşaması tamamlandı! Veri toplama başladı.',
                            'success'
                        );
                    }
                }, 2000);
            }
        }, 1000);
    }

    /**
     * Startup tamamlandı bildirimi
     */
    startupTamamlandiBildirimi() {
        // Sistem durumunu güncelle
        const sistemDurumu = document.getElementById('sistemDurumu');
        if (sistemDurumu) {
            sistemDurumu.textContent = 'Normal Çalışma';
            sistemDurumu.className = 'sistem-durumu active';
            sistemDurumu.style.color = '#28a745';
        }
        
        // Bellek durumunu güncelle
        const bellekDurumu = document.getElementById('bellekDurumu');
        if (bellekDurumu) {
            bellekDurumu.textContent = 'Optimize Edildi';
            bellekDurumu.style.color = '#28a745';
        }
        
        // Başarı bildirimi
        this.bildirimEkle(
            'Sistem startup optimizasyonu tamamlandı. Artık tam performansla çalışıyor.',
            'success',
            false // Otomatik kapanmasın
        );
        
        console.log('🎉 Startup optimizasyonu tamamlandı!');
    }
}

// Global fonksiyonlar - HTML'den çağrılacak
window.sistemiBaslat = function() {
    if (typeof nakitSistem === 'undefined') {
        console.error('❌ nakitSistem bulunamadı');
        return;
    }
    
    const basarili = nakitSistem.veriToplamayiBaşlat();
    if (basarili && dashboardYoneticisi) {
        dashboardYoneticisi.sistemBasladi();
    }
};

window.sistemiDurdur = function() {
    if (typeof nakitSistem === 'undefined') {
        console.error('❌ nakitSistem bulunamadı');
        return;
    }
    
    const basarili = nakitSistem.veriToplamayiDurdur();
    if (basarili && dashboardYoneticisi) {
        dashboardYoneticisi.sistemDurduruldu();
    }
};

window.fiyatlariYenile = function() {
    if (typeof nakitSistem !== 'undefined') {
        nakitSistem.canliVeriCek().then(veri => {
            if (dashboardYoneticisi) {
                dashboardYoneticisi.fiyatlariGuncelle(veri);
            }
        }).catch(hata => {
            console.error('❌ Manual fiyat yenileme hatası:', hata);
        });
    }
};

window.manuelTahmin = function() {
    if (typeof nakitSistem !== 'undefined') {
        nakitSistem.alimSatimTahmini().then(tahmin => {
            if (dashboardYoneticisi) {
                dashboardYoneticisi.tahminGuncelle(tahmin);
            }
        }).catch(hata => {
            console.error('❌ Manuel tahmin hatası:', hata);
        });
    }
};

window.veriExport = function() {
    if (typeof nakitSistem !== 'undefined') {
        const veriJson = nakitSistem.veriExport('json');
        const blob = new Blob([veriJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nakit-veriler-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        if (dashboardYoneticisi) {
            dashboardYoneticisi.bildirimEkle('Veriler başarıyla dışa aktarıldı', 'success');
        }
    }
};

window.grafikleriTemizle = function() {
    if (dashboardYoneticisi && dashboardYoneticisi.anaGrafik) {
        dashboardYoneticisi.anaGrafik.data.labels = [];
        dashboardYoneticisi.anaGrafik.data.datasets[0].data = [];
        dashboardYoneticisi.anaGrafik.update();
        
        dashboardYoneticisi.bildirimEkle('Grafikler temizlendi', 'info');
    }
};

window.grafikFullscreen = function() {
    const grafikContainer = document.querySelector('.grafik-widget');
    if (grafikContainer) {
        if (grafikContainer.requestFullscreen) {
            grafikContainer.requestFullscreen();
        } else if (grafikContainer.webkitRequestFullscreen) {
            grafikContainer.webkitRequestFullscreen();
        } else if (grafikContainer.msRequestFullscreen) {
            grafikContainer.msRequestFullscreen();
        }
    }
};

window.grafikDownload = function() {
    if (dashboardYoneticisi && dashboardYoneticisi.anaGrafik) {
        const url = dashboardYoneticisi.anaGrafik.toBase64Image();
        const a = document.createElement('a');
        a.href = url;
        a.download = `nakit-grafik-${new Date().toISOString().split('T')[0]}.png`;
        a.click();
        
        dashboardYoneticisi.bildirimEkle('Grafik indirildi', 'success');
    }
};

window.tumBildirimleriOku = function() {
    document.querySelectorAll('.bildirim-item').forEach(item => {
        item.classList.add('okundu');
        item.style.opacity = '0.7';
    });
    
    if (dashboardYoneticisi) {
        dashboardYoneticisi.bildirimSayisiniGuncelle();
    }
};

window.bildirimleriTemizle = function() {
    const bildirimListesi = document.getElementById('bildirimListesi');
    if (bildirimListesi) {
        bildirimListesi.innerHTML = '';
        
        if (dashboardYoneticisi) {
            dashboardYoneticisi.bildirimSayaci = 0;
            dashboardYoneticisi.bildirimSayisiniGuncelle();
            dashboardYoneticisi.bildirimEkle('Bildirimler temizlendi', 'info');
        }
    }
};

window.istatistikleriYenile = function() {
    if (dashboardYoneticisi) {
        dashboardYoneticisi.performansGuncelle();
        dashboardYoneticisi.gunlukIstatistikleriGuncelle();
        dashboardYoneticisi.bildirimEkle('İstatistikler yenilendi', 'info');
    }
};

// Sayfa kapatılmadan önce temizlik
window.addEventListener('beforeunload', function() {
    if (dashboardYoneticisi) {
        dashboardYoneticisi.ayarlariKaydet();
        dashboardYoneticisi.temizle();
    }
});




// Global instance
let dashboardYoneticisi;

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    dashboardYoneticisi = new DashboardYoneticisi();
});

console.log('📊 Dashboard.js tamamen yüklendi!');
console.log(`👤 Geliştirici: Dmrilker`);
console.log(`🕐 Yükleme Zamanı: ${new Date('2025-06-01T15:05:31Z').toLocaleString('tr-TR')}`);