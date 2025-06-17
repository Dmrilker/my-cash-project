/**
 * Nakit Finansal Sistem - Ana Uygulama Koordinatörü
 * Geliştirici: Dmrilker
 * Güncel Tarih: 2025-06-01 15:11:37 UTC
 * Versiyon: 1.0.0
 * 
 * Bu dosya tüm sistemin koordinasyonunu yapar ve ana entry point'tir.
 */

class NakitUygulama {
    constructor() {
        // Sistem bilgileri
        this.versiyon = '1.0.0';
        this.gelistirici = 'Dmrilker';
        this.olusturmaZamani = new Date('2025-06-01T15:11:37Z');
        this.kullanici = 'Dmrilker'; // Mevcut kullanıcı
        
        // Sistem durumu
        this.sistemDurumu = 'BAŞLATILIYOR';
        this.baslatmaZamani = null;
        this.sonAktiviteZamani = null;
        this.otomatikKaydetmeAktif = true;
        this.debugging = true; // Geliştirme modu
        
        // Sistem bileşenleri
        this.finansalSistem = null;
        this.dashboardYoneticisi = null;
        this.eventBus = new Map(); // Event yönetimi
        
        // Performans izleme
        this.performansMetrikleri = {
            baslamaZamani: performance.now(),
            toplamHataSayisi: 0,
            kritikHataSayisi: 0,
            toplamEventSayisi: 0,
            bellekKullanımTakibi: []
        };
        
        // Uygulama ayarları
        this.ayarlar = {
            veriKaydetmeAraligi: 30000, // 30 saniye
            otomatikYedekleme: true,
            gelistiriciModu: true,
            sesUyarilari: true,
            darkMode: false,
            dil: 'tr-TR'
        };
        
        console.log(`🚀 Nakit Uygulama v${this.versiyon} başlatılıyor...`);
        console.log(`👤 Kullanıcı: ${this.kullanici}`);
        console.log(`🕐 Zaman: ${this.olusturmaZamani.toLocaleString('tr-TR')}`);
        console.log(`⚙️ Geliştirici Modu: ${this.debugging ? 'Açık' : 'Kapalı'}`);
        
        this.init();
    }

    /**
     * Ana başlatma fonksiyonu
     */
    async init() {
        try {
            this.sistemDurumu = 'BAŞLATILIYOR';
            console.log('🔧 Sistem başlatılıyor...');
            
            // 1. Ön kontroller
            await this.onKontrollerYap();
            
            // 2. Ayarları yükle
            await this.ayarlariYukle();
            
            // 3. Sistem bileşenlerini başlat
            await this.sistemBilesenleriniBaslat();
            
            // 4. Event sistemini kur
            await this.eventSisteminiKur();
            
            // 5. Performans izlemeyi başlat
            await this.performansIzlemeBaslat();
            
            // 6. Otomatik işlemleri başlat
            await this.otomatikIslemleriBaslat();
            
            // 7. Final kontroller
            await this.finalKontrollerYap();
            
            this.sistemDurumu = 'HAZIR';
            this.baslatmaZamani = new Date();
              console.log('✅ Nakit Finansal Sistem tamamen hazır!');
            console.log(`⏱️ Başlatma süresi: ${this.getBaslatmaSuresi()}ms`);
            
            // Loading screen'i gizle ve uygulamayı göster
            this.loadingScreenGizle();
            
            // Başarı bildirimi
            this.sistemBasariBildirimi();
            
        } catch (hata) {
            this.kritikHataYonetimi(hata, 'Sistem Başlatma');
        }
    }

    /**
     * Ön kontroller
     */
    async onKontrollerYap() {
        console.log('🔍 Ön kontroller yapılıyor...');
        
        // Browser uyumluluğu
        this.browserUyumlulukKontrol();
        
        // Gerekli API'ler kontrolü
        this.gerekliApiKontrol();
        
        // DOM hazırlık kontrolü
        await this.domHazirlikKontrol();
        
        // Local Storage kontrolü
        this.localStorageKontrol();
        
        console.log('✅ Ön kontroller tamamlandı');
    }

    /**
     * Browser uyumluluk kontrolü
     */
    browserUyumlulukKontrol() {
        const gerekliOzellikler = [
            'fetch',
            'Promise',
            'Map',
            'Set',
            'localStorage',
            'JSON'
        ];
        
        const eksikOzellikler = gerekliOzellikler.filter(ozellik => 
            typeof window[ozellik] === 'undefined'
        );
        
        if (eksikOzellikler.length > 0) {
            throw new Error(`Browser desteği yetersiz. Eksik özellikler: ${eksikOzellikler.join(', ')}`);
        }
        
        // Chart.js kontrolü
        if (typeof Chart === 'undefined') {
            console.warn('⚠️ Chart.js yüklenmemiş - Grafikler çalışmayabilir');
        }
        
        console.log('✅ Browser uyumluluğu onaylandı');
    }

    /**
     * Gerekli API kontrolü
     */
    gerekliApiKontrol() {
        const apis = [
            'console',
            'performance',
            'Date',
            'Math',
            'parseInt',
            'parseFloat'
        ];
        
        apis.forEach(api => {
            if (typeof window[api] === 'undefined') {
                throw new Error(`Gerekli API eksik: ${api}`);
            }
        });
        
        console.log('✅ Gerekli APIler mevcut');
    }

    /**
     * DOM hazırlık kontrolü
     */
    async domHazirlikKontrol() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * Local Storage kontrolü
     */
    localStorageKontrol() {
        try {
            const testKey = 'nakit_test';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            console.log('✅ Local Storage kullanılabilir');
        } catch (hata) {
            console.warn('⚠️ Local Storage kullanılamıyor:', hata);
        }
    }

    /**
     * Ayarları yükle
     */
    async ayarlariYukle() {
        console.log('📥 Ayarlar yükleniyor...');
        
        try {
            const kaydedilmisAyarlar = localStorage.getItem('nakit_uygulama_ayarlari');
            if (kaydedilmisAyarlar) {
                const parsedAyarlar = JSON.parse(kaydedilmisAyarlar);
                this.ayarlar = { ...this.ayarlar, ...parsedAyarlar };
                console.log('📥 Kaydedilmiş ayarlar yüklendi');
            }
        } catch (hata) {
            console.warn('⚠️ Ayarlar yüklenemedi, varsayılan ayarlar kullanılıyor:', hata);
        }
        
        // Ayarları uygula
        this.ayarlariUygula();
        
        console.log('✅ Ayarlar hazır');
    }

    /**
     * Ayarları uygula
     */
    ayarlariUygula() {
        // Dark mode
        if (this.ayarlar.darkMode) {
            document.body.classList.add('dark-mode');
        }
        
        // Dil ayarı
        document.documentElement.lang = this.ayarlar.dil;
        
        console.log(`⚙️ Ayarlar uygulandı: ${JSON.stringify(this.ayarlar)}`);
    }

    /**
     * Sistem bileşenlerini başlat
     */
    async sistemBilesenleriniBaslat() {
        console.log('🔧 Sistem bileşenleri başlatılıyor...');
        
        // 1. Finansal Sistemi başlat
        await this.finansalSistemBaslat();
        
        // 2. Dashboard'u başlat
        await this.dashboardBaslat();
        
        // 3. Navigasyon sistemini kur
        await this.navigasyonSisteminiKur();
        
        console.log('✅ Sistem bileşenleri hazır');
    }

    /**
     * Finansal sistem başlat
     */
    async finansalSistemBaslat() {
        try {
            if (typeof NakitFinansalSistem === 'undefined') {
                throw new Error('NakitFinansalSistem sınıfı bulunamadı');
            }
            
            // Global nakitSistem zaten oluşturulmuş olmalı
            if (typeof nakitSistem !== 'undefined') {
                this.finansalSistem = nakitSistem;
                console.log('💰 Finansal sistem bağlandı');
            } else {
                throw new Error('nakitSistem global değişkeni bulunamadı');
            }
            
        } catch (hata) {
            console.error('❌ Finansal sistem başlatma hatası:', hata);
            throw hata;
        }
    }

    /**
     * Dashboard başlat
     */
    async dashboardBaslat() {
        try {
            // Dashboard zaten DOMContentLoaded'da başlatılmış olmalı
            if (typeof dashboardYoneticisi !== 'undefined') {
                this.dashboardYoneticisi = dashboardYoneticisi;
                console.log('📊 Dashboard bağlandı');
            } else {
                console.warn('⚠️ Dashboard henüz hazır değil, bekleniyor...');
                
                // Dashboard'un hazır olmasını bekle
                await this.dashboardHazirBekle();
            }
            
        } catch (hata) {
            console.error('❌ Dashboard başlatma hatası:', hata);
            throw hata;
        }
    }

    /**
     * Dashboard hazır bekle
     */
    async dashboardHazirBekle() {
        return new Promise((resolve, reject) => {
            let deneme = 0;
            const maksimumDeneme = 50; // 5 saniye
            
            const kontrol = setInterval(() => {
                deneme++;
                
                if (typeof dashboardYoneticisi !== 'undefined') {
                    this.dashboardYoneticisi = dashboardYoneticisi;
                    clearInterval(kontrol);
                    console.log('📊 Dashboard hazır oldu');
                    resolve();
                } else if (deneme >= maksimumDeneme) {
                    clearInterval(kontrol);
                    reject(new Error('Dashboard timeout'));
                }
            }, 100);
        });
    }

    /**
     * Navigasyon sistemini kur
     */
    async navigasyonSisteminiKur() {
        console.log('🧭 Navigasyon sistemi kuruluyor...');
        
        // Sayfa geçiş fonksiyonu
        window.sayfaGec = (sayfaId) => {
            this.sayfaGecisYap(sayfaId);
        };
        
        // Browser geri/ileri butonları
        window.addEventListener('popstate', (event) => {
            this.browserNavigasyonYonet(event);
        });
        
        // Hash değişikliklerini izle
        window.addEventListener('hashchange', (event) => {
            this.hashDegisiklikYonet(event);
        });
        
        console.log('✅ Navigasyon sistemi kuruldu');
    }

    /**
     * Sayfa geçiş yap
     */
    sayfaGecisYap(sayfaId) {
        try {
            console.log(`🧭 Sayfa geçişi: ${sayfaId}`);
            
            // Mevcut sayfayı gizle
            document.querySelectorAll('.page').forEach(sayfa => {
                sayfa.classList.remove('active');
            });
            
            // Yeni sayfayı göster
            const yeniSayfa = document.getElementById(sayfaId);
            if (yeniSayfa) {
                yeniSayfa.classList.add('active');
                
                // Nav butonlarını güncelle
                document.querySelectorAll('.nav-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.page === sayfaId) {
                        btn.classList.add('active');
                    }
                });
                
                // URL'yi güncelle
                history.pushState({ page: sayfaId }, '', `#${sayfaId}`);
                
                // Event fırlat
                this.eventFirla('sayfaDegisti', { eskiSayfa: this.aktifSayfa, yeniSayfa: sayfaId });
                this.aktifSayfa = sayfaId;
                
                console.log(`✅ Sayfa geçişi tamamlandı: ${sayfaId}`);
            } else {
                console.error(`❌ Sayfa bulunamadı: ${sayfaId}`);
            }
            
        } catch (hata) {
            console.error('❌ Sayfa geçiş hatası:', hata);
        }
    }

    /**
     * Browser navigasyon yönet
     */
    browserNavigasyonYonet(event) {
        const state = event.state;
        if (state && state.page) {
            this.sayfaGecisYap(state.page);
        }
    }

    /**
     * Hash değişiklik yönet
     */
    hashDegisiklikYonet(event) {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            this.sayfaGecisYap(hash);
        }
    }

    /**
     * Event sistemini kur
     */
    async eventSisteminiKur() {
        console.log('📡 Event sistemi kuruluyor...');
        
        // Global error handler
        window.addEventListener('error', (event) => {
            this.globalHataYakala(event.error, 'Global Error');
        });
        
        // Unhandled promise rejection
        window.addEventListener('unhandledrejection', (event) => {
            this.globalHataYakala(event.reason, 'Unhandled Promise Rejection');
        });
        
        // Sayfa görünürlük değişikliği
        document.addEventListener('visibilitychange', () => {
            this.sayfaGorunurlukDegisti();
        });
        
        // Online/Offline durumu
        window.addEventListener('online', () => {
            this.internetDurumuDegisti(true);
        });
        
        window.addEventListener('offline', () => {
            this.internetDurumuDegisti(false);
        });
        
        console.log('✅ Event sistemi kuruldu');
    }

    /**
     * Event fırlat
     */
    eventFirla(eventAdi, veri = null) {
        this.performansMetrikleri.toplamEventSayisi++;
        
        if (this.eventBus.has(eventAdi)) {
            const listeners = this.eventBus.get(eventAdi);
            listeners.forEach(listener => {
                try {
                    listener(veri);
                } catch (hata) {
                    console.error(`❌ Event listener hatası (${eventAdi}):`, hata);
                }
            });
        }
        
        if (this.debugging) {
            console.log(`📡 Event: ${eventAdi}`, veri);
        }
    }

    /**
     * Event dinle
     */
    eventDinle(eventAdi, callback) {
        if (!this.eventBus.has(eventAdi)) {
            this.eventBus.set(eventAdi, []);
        }
        
        this.eventBus.get(eventAdi).push(callback);
        
        if (this.debugging) {
            console.log(`👂 Event listener eklendi: ${eventAdi}`);
        }
    }

    /**
     * Global hata yakala
     */
    globalHataYakala(hata, kaynak) {
        this.performansMetrikleri.toplamHataSayisi++;
        
        console.error(`🚨 Global Hata (${kaynak}):`, hata);
        
        // Kritik hata kontrolü
        if (this.kritikHataMi(hata)) {
            this.performansMetrikleri.kritikHataSayisi++;
            this.kritikHataYonetimi(hata, kaynak);
        } else {
            // Normal hata bildirimi
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.bildirimEkle(
                    `Hata oluştu: ${hata.message}`,
                    'error'
                );
            }
        }
        
        // Event fırlat
        this.eventFirla('hataOlustu', { hata, kaynak });
    }

    /**
     * Kritik hata mı kontrol et
     */
    kritikHataMi(hata) {
        const kritikHatalar = [
            'ReferenceError',
            'TypeError',
            'SyntaxError'
        ];
        
        return kritikHatalar.includes(hata.name) || 
               hata.message.includes('Script error') ||
               hata.message.includes('Network error');
    }

    /**
     * Kritik hata yönetimi
     */
    kritikHataYonetimi(hata, kaynak) {
        console.error(`🚨 KRİTİK HATA (${kaynak}):`, hata);
        
        this.sistemDurumu = 'HATA';
        
        // Kullanıcıya bildir
        if (this.dashboardYoneticisi) {
            this.dashboardYoneticisi.bildirimEkle(
                `Kritik hata: ${hata.message}. Sistem yeniden başlatılıyor...`,
                'error'
            );
        }
        
        // Otomatik recovery dene
        setTimeout(() => {
            this.sistemKurtarmaDenemesi(hata, kaynak);
        }, 2000);
    }

    /**
     * Sistem kurtarma denemesi
     */
    sistemKurtarmaDenemesi(hata, kaynak) {
        console.log('🔄 Sistem kurtarma denemesi...');
        
        try {
            // Hafıza temizle
            this.hafizaTemizle();
            
            // Sistem bileşenlerini yeniden başlat
            this.sistemBilesenleriniYenidenBaslat();
            
            this.sistemDurumu = 'KURTARILDI';
            
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.bildirimEkle(
                    'Sistem başarıyla kurtarıldı!',
                    'success'
                );
            }
            
            console.log('✅ Sistem kurtarma başarılı');
            
        } catch (kurtarmaHatasi) {
            console.error('❌ Sistem kurtarma başarısız:', kurtarmaHatasi);
            
            // Son çare: Sayfa yenile
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }

    /**
     * Hafıza temizle
     */
    hafizaTemizle() {
        console.log('🧹 Hafıza temizleniyor...');
        
        // Event bus temizle
        this.eventBus.clear();
        
        // Performance metrikleri sıfırla
        this.performansMetrikleri.bellekKullanımTakibi = [];
        
        // Garbage collection tetikle (eğer mümkünse)
        if (window.gc) {
            window.gc();
        }
        
        console.log('✅ Hafıza temizlendi');
    }

    /**
     * Sistem bileşenlerini yeniden başlat
     */
    async sistemBilesenleriniYenidenBaslat() {
        console.log('🔄 Sistem bileşenleri yeniden başlatılıyor...');
        
        try {
            // Dashboard'u yeniden başlat
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.temizle();
                await this.dashboardBaslat();
            }
            
            // Event sistemini yeniden kur
            await this.eventSisteminiKur();
            
            console.log('✅ Sistem bileşenleri yeniden başlatıldı');
            
        } catch (hata) {
            console.error('❌ Yeniden başlatma hatası:', hata);
            throw hata;
        }
    }

    /**
     * Sayfa görünürlük değişti
     */
    sayfaGorunurlukDegisti() {
        if (document.hidden) {
            console.log('👁️ Sayfa gizlendi');
            this.eventFirla('sayfaGizlendi');
            
            // Performans optimizasyonu
            this.performansModuAc(true);
            
        } else {
            console.log('👁️ Sayfa göründü');
            this.eventFirla('sayfaGoruldu');
            this.sonAktiviteZamani = new Date();
            
            // Normal moda dön
            this.performansModuAc(false);
        }
    }

    /**
     * Performans modu aç/kapat
     */
    performansModuAc(aktif) {
        if (aktif) {
            // Animasyonları durdur
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.animasyonlarAktif = false;
            }
            
            console.log('⚡ Performans modu açıldı');
        } else {
            // Animasyonları aç
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.animasyonlarAktif = true;
            }
            
            console.log('⚡ Performans modu kapatıldı');
        }
    }

    /**
     * İnternet durumu değişti
     */
    internetDurumuDegisti(online) {
        if (online) {
            console.log('🌐 İnternet bağlantısı yeniden kuruldu');
            
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.bildirimEkle(
                    'İnternet bağlantısı yeniden kuruldu',
                    'success'
                );
            }
            
            // Finansal sistemi yeniden başlat
            if (this.finansalSistem && !this.finansalSistem.veriToplamaAktif) {
                this.finansalSistem.veriToplamayiBaşlat();
            }
            
        } else {
            console.log('🌐 İnternet bağlantısı kesildi');
            
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.bildirimEkle(
                    'İnternet bağlantısı kesildi',
                    'warning'
                );
            }
        }
        
        this.eventFirla('internetDurumuDegisti', { online });
    }    /**
     * Performans izleme başlat
     */
    async performansIzlemeBaslat() {
        console.log('📊 Performans izleme başlatılıyor...');
        
        // STARTUP DELAY - Performans izlemeyi de geciktir
        console.log('⏳ Performans metriklerini toplamadan önce 90 saniye bekleniyor...');
        
        setTimeout(() => {
            // Her 60 saniyede performans metrikleri topla (daha uzun aralık)
            setInterval(() => {
                this.performansMetrikleriniTopla();
            }, 60000); // 60 saniye (önceden 30'du)
            
            console.log('📊 Performans metrikleri başlatıldı (60s interval)');
        }, 90000); // 90 saniye startup delay
        
        setTimeout(() => {
            // Her 10 dakikada performans raporu oluştur (daha uzun aralık)
            setInterval(() => {
                this.performansRaporuOlustur();
            }, 600000); // 10 dakika (önceden 5'ti)
            
            console.log('📊 Performans raporları başlatıldı (10m interval)');
        }, 120000); // 2 dakika sonra başlat
        
        console.log('✅ Performans izleme geciktirilmiş olarak ayarlandı');
    }    /**
     * Performans metriklerini topla
     */
    performansMetrikleriniTopla() {
        const simdikiZaman = performance.now();
        
        // Bellek kullanımı - sadece sistem stabil olduktan sonra kaydet
        if (performance.memory && this.sistemDurumu === 'HAZIR') {
            const bellekKullanimi = {
                zaman: simdikiZaman,
                kullanilan: performance.memory.usedJSHeapSize,
                toplam: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
            
            this.performansMetrikleri.bellekKullanımTakibi.push(bellekKullanimi);
            
            // Son 50 ölçümü tut (daha agresif temizlik)
            if (this.performansMetrikleri.bellekKullanımTakibi.length > 50) {
                this.performansMetrikleri.bellekKullanımTakibi.shift();
            }
        }
        
        // FPS ölçümü (approximation) - sadece sistem hazır olduktan sonra
        if (this.sistemDurumu === 'HAZIR') {
            this.fpsOlcumYap();
        }
    }

    /**
     * FPS ölçümü yap
     */
    fpsOlcumYap() {
        let fps = 0;
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // FPS'i kaydet
                this.performansMetrikleri.mevcut_fps = fps;
                
                // Düşük FPS uyarısı
                if (fps < 30 && this.dashboardYoneticisi) {
                    console.warn(`⚠️ Düşük FPS: ${fps}`);
                }
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    /**
     * Performans raporu oluştur
     */
    performansRaporuOlustur() {
        const rapor = {
            sistem_durumu: this.sistemDurumu,
            calisme_suresi: this.getCalismaSuresi(),
            toplam_hata: this.performansMetrikleri.toplamHataSayisi,
            kritik_hata: this.performansMetrikleri.kritikHataSayisi,
            toplam_event: this.performansMetrikleri.toplamEventSayisi,
            mevcut_fps: this.performansMetrikleri.mevcut_fps || 'Bilinmiyor',
            bellek_kullanimi: this.getBellekKullanimiOrtalama(),
            sistem_sagligi: this.sistemSagligiHesapla()
        };
        
        if (this.debugging) {
            console.log('📊 Performans Raporu:', rapor);
        }
        
        return rapor;
    }

    /**
     * Bellek kullanımı ortalama
     */
    getBellekKullanimiOrtalama() {
        const olcumler = this.performansMetrikleri.bellekKullanımTakibi;
        if (olcumler.length === 0) return 'Bilinmiyor';
        
        const toplam = olcumler.reduce((sum, olcum) => sum + olcum.kullanilan, 0);
        const ortalama = toplam / olcumler.length;
        
        return `${Math.round(ortalama / 1024 / 1024)} MB`;
    }

    /**
     * Sistem sağlığı hesapla
     */
    sistemSagligiHesapla() {
        let skor = 100;
        
        // Hata oranına göre puan düş
        const hataOrani = this.performansMetrikleri.toplamHataSayisi / Math.max(1, this.performansMetrikleri.toplamEventSayisi);
        skor -= (hataOrani * 50);
        
        // Kritik hata varsa puan düş
        skor -= (this.performansMetrikleri.kritikHataSayisi * 10);
        
        // FPS'e göre puan düş
        if (this.performansMetrikleri.mevcut_fps < 30) {
            skor -= 15;
        }
        
        return Math.max(0, Math.round(skor));
    }    /**
     * Otomatik işlemleri başlat
     */
    async otomatikIslemleriBaslat() {
        console.log('⚙️ Otomatik işlemler başlatılıyor...');
        
        // STARTUP DELAY - Otomatik işlemleri de geciktir
        setTimeout(() => {
            // Otomatik kaydetme
            if (this.otomatikKaydetmeAktif) {
                setInterval(() => {
                    this.otomatikKaydet();
                }, this.ayarlar.veriKaydetmeAraligi);
                console.log('💾 Otomatik kaydetme başlatıldı');
            }
        }, 300000); // 5 dakika sonra başlat
        
        setTimeout(() => {
            // Otomatik temizlik - çok daha az sıklıkta
            setInterval(() => {
                this.otomatikTemizlik();
            }, 1800000); // 30 dakika (önceden 10'du)
            console.log('🧹 Otomatik temizlik başlatıldı');
        }, 600000); // 10 dakika sonra başlat
        
        setTimeout(() => {
            // Sağlık kontrolü
            setInterval(() => {
                this.saglikKontrolu();
            }, 900000); // 15 dakika (önceden 5'ti)
            console.log('🏥 Sağlık kontrolü başlatıldı');
        }, 900000); // 15 dakika sonra başlat
        
        console.log('✅ Otomatik işlemler geciktirilmiş olarak ayarlandı');
    }

    /**
     * Otomatik kaydet
     */
    otomatikKaydet() {
        try {
            const veri = {
                ayarlar: this.ayarlar,
                performans: this.performansRaporuOlustur(),
                zaman: new Date().toISOString()
            };
            
            localStorage.setItem('nakit_otomatik_yedek', JSON.stringify(veri));
            
            if (this.debugging) {
                console.log('💾 Otomatik kayıt yapıldı');
            }
            
        } catch (hata) {
            console.error('❌ Otomatik kayıt hatası:', hata);
        }
    }

    /**
     * Otomatik temizlik
     */
    otomatikTemizlik() {
        console.log('🧹 Otomatik temizlik başlatılıyor...');
        
        // Eski performans verilerini temizle
        if (this.performansMetrikleri.bellekKullanımTakibi.length > 100) {
            this.performansMetrikleri.bellekKullanımTakibi = 
                this.performansMetrikleri.bellekKullanımTakibi.slice(-50);
        }
        
        // Event sayaçlarını sıfırla
        if (this.performansMetrikleri.toplamEventSayisi > 10000) {
            this.performansMetrikleri.toplamEventSayisi = 0;
        }
        
        // LocalStorage temizle
        this.localStorageTemizle();
        
        console.log('✅ Otomatik temizlik tamamlandı');
    }

    /**
     * LocalStorage temizle
     */
    localStorageTemizle() {
        try {
            const eskiKeys = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                
                // Nakit ile ilgili eski verileri bul
                if (key && key.startsWith('nakit_')) {
                    const veri = localStorage.getItem(key);
                    try {
                        const parsed = JSON.parse(veri);
                        if (parsed.zaman) {
                            const veriZamani = new Date(parsed.zaman);
                            const yediGunOnce = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
                            
                            if (veriZamani < yediGunOnce) {
                                eskiKeys.push(key);
                            }
                        }
                    } catch (e) {
                        // Parse edilemeyen verileri de temizle
                        eskiKeys.push(key);
                    }
                }
            }
            
            eskiKeys.forEach(key => {
                localStorage.removeItem(key);
            });
            
            if (eskiKeys.length > 0) {
                console.log(`🗑️ ${eskiKeys.length} eski veri temizlendi`);
            }
            
        } catch (hata) {
            console.error('❌ LocalStorage temizlik hatası:', hata);
        }
    }

    /**
     * Sağlık kontrolü
     */
    saglikKontrolu() {
        const saglikSkoru = this.sistemSagligiHesapla();
        
        if (saglikSkoru < 70) {
            console.warn(`⚠️ Sistem sağlığı düşük: ${saglikSkoru}%`);
            
            if (this.dashboardYoneticisi) {
                this.dashboardYoneticisi.bildirimEkle(
                    `Sistem sağlığı: ${saglikSkoru}% - Performans düşük`,
                    'warning'
                );
            }
            
            // Otomatik iyileştirme dene
            this.otomatikIyilestirme();
        }
        
        if (this.debugging) {
            console.log(`💚 Sistem sağlığı: ${saglikSkoru}%`);
        }
    }

    /**
     * Otomatik iyileştirme
     */
    otomatikIyilestirme() {
        console.log('🔧 Otomatik iyileştirme başlatılıyor...');
        
        // Hafıza temizle
        this.hafizaTemizle();
        
        // Performans modunu geçici olarak aç
        this.performansModuAc(true);
        
        setTimeout(() => {
            this.performansModuAc(false);
        }, 30000); // 30 saniye
        
        console.log('✅ Otomatik iyileştirme tamamlandı');
    }

    /**
     * Final kontroller
     */
    async finalKontrollerYap() {
        console.log('🔍 Final kontroller yapılıyor...');
        
        // Tüm sistem bileşenlerinin hazır olup olmadığını kontrol et
        const kontroller = [
            this.finansalSistem !== null,
            this.dashboardYoneticisi !== null,
            typeof Chart !== 'undefined',
            document.readyState === 'complete'
        ];
        
        const basarisizKontroller = kontroller.filter(kontrol => !kontrol).length;
        
        if (basarisizKontroller > 0) {
            console.warn(`⚠️ ${basarisizKontroller} kontrol başarısız`);
        }
        
        // İlk sayfa ayarla
        this.ilkSayfaAyarla();
        
        console.log('✅ Final kontroller tamamlandı');
    }

    /**
     * İlk sayfa ayarla
     */
    ilkSayfaAyarla() {
        const hash = window.location.hash.substring(1);
        const ilkSayfa = hash && document.getElementById(hash) ? hash : 'dashboard';
        
        this.sayfaGecisYap(ilkSayfa);
        this.aktifSayfa = ilkSayfa;
    }

    /**
     * Sistem başarı bildirimi
     */
    sistemBasariBildirimi() {
        const bildirimMesaji = `
            🎉 Nakit Finansal Sistem Hazır!
            👤 Kullanıcı: ${this.kullanici}
            ⏱️ Başlatma Süresi: ${this.getBaslatmaSuresi()}ms
            📊 Sistem Sağlığı: ${this.sistemSagligiHesapla()}%
        `;
        
        console.log(bildirimMesaji);
        
        if (this.dashboardYoneticisi) {
            this.dashboardYoneticisi.bildirimEkle(
                `Nakit v${this.versiyon} başarıyla başlatıldı!`,
                'success'
            );
        }
        
        // Event fırlat
        this.eventFirla('sistemHazir', {
            versiyon: this.versiyon,
            kullanici: this.kullanici,
            baslatmaSuresi: this.getBaslatmaSuresi()
        });    }

    /**
     * Loading screen'i gizle ve ana uygulamayı göster
     */
    loadingScreenGizle() {
        try {
            const loadingScreen = document.getElementById('loadingScreen');
            const app = document.getElementById('app');
            
            if (loadingScreen && app) {
                console.log('🎬 Loading screen gizleniyor, ana uygulama gösteriliyor...');
                
                // Loading screen'i animasyonla gizle
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    app.style.display = 'block';
                    
                    // Ana uygulamayı animasyonla göster
                    app.style.opacity = '0';
                    app.style.transition = 'opacity 0.5s ease-in';
                    
                    setTimeout(() => {
                        app.style.opacity = '1';
                        console.log('✅ Ana uygulama gösterildi');
                        
                        // Event fırlat
                        this.eventFirla('uygulamaGosterildi');
                    }, 50);
                }, 500);
                
            } else {
                console.error('❌ Loading screen veya app elementi bulunamadı');
            }
            
        } catch (hata) {
            console.error('❌ Loading screen gizleme hatası:', hata);
            
            // Hata durumunda direkt göster
            const loadingScreen = document.getElementById('loadingScreen');
            const app = document.getElementById('app');
            
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (app) app.style.display = 'block';
        }
    }

    /**
     * Başlatma süresi al
     */
    getBaslatmaSuresi() {
        return Math.round(performance.now() - this.performansMetrikleri.baslamaZamani);
    }

    /**
     * Çalışma süresi al
     */
    getCalismaSuresi() {
        if (!this.baslatmaZamani) return 0;
        return Math.round((new Date() - this.baslatmaZamani) / 1000);
    }

    /**
     * Ayarları kaydet
     */
    ayarlariKaydet() {
        try {
            localStorage.setItem('nakit_uygulama_ayarlari', JSON.stringify(this.ayarlar));
            console.log('💾 Ayarlar kaydedildi');
        } catch (hata) {
            console.error('❌ Ayar kaydetme hatası:', hata);
        }
    }

    /**
     * Uygulama durumu al
     */
    durumAl() {
        return {
            versiyon: this.versiyon,
            gelistirici: this.gelistirici,
            kullanici: this.kullanici,
            sistemDurumu: this.sistemDurumu,
            aktifSayfa: this.aktifSayfa,
            calismaSuresi: this.getCalismaSuresi(),
            performans: this.performansRaporuOlustur(),
            sistem_sagligi: this.sistemSagligiHesapla()
        };
    }

    /**
     * Uygulama kapat
     */
    uygulamaKapat() {
        console.log('👋 Nakit uygulaması kapatılıyor...');
        
        // Ayarları kaydet
        this.ayarlariKaydet();
        
        // Sistem bileşenlerini temizle
        if (this.dashboardYoneticisi) {
            this.dashboardYoneticisi.temizle();
        }
        
        if (this.finansalSistem) {
            this.finansalSistem.veriToplamayiDurdur();
        }
        
        // Event fırlat
        this.eventFirla('uygulamaKapaniyor');
        
        this.sistemDurumu = 'KAPATILDI';
        
        console.log('✅ Uygulama güvenli şekilde kapatıldı');
    }
}

// Global Nakit Uygulaması oluştur
let nakitUygulama;

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM yüklendi, Nakit Uygulaması başlatılıyor...');
    nakitUygulama = new NakitUygulama();
});

// Güvenlik timeout'u - Loading screen'in çok uzun süre açık kalmasını önler
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    const app = document.getElementById('app');
    
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        console.warn('⚠️ Timeout: Loading screen zorunlu olarak gizleniyor...');
        
        loadingScreen.style.display = 'none';
        if (app) {
            app.style.display = 'block';
        }
        
        // Hata bildirimi ekle
        if (typeof dashboardYoneticisi !== 'undefined') {
            dashboardYoneticisi.bildirimEkle(
                'Sistem yavaş başladı - Timeout nedeniyle zorla başlatıldı',
                'warning'
            );
        }
    }
}, 10000); // 10 saniye timeout

// Sayfa kapatılmadan önce temizlik
window.addEventListener('beforeunload', function(event) {
    if (nakitUygulama) {
        nakitUygulama.uygulamaKapat();
    }
});

// Global erişim için
window.nakitUygulama = nakitUygulama;

console.log('📱 Nakit App.js yüklendi!');
console.log(`👤 Kullanıcı: Dmrilker`);
console.log(`🕐 Yükleme Zamanı: ${new Date().toLocaleString('tr-TR')}`);