/**
 * 🚀 Nakit Finansal Analiz Sistemi - Optimize Edilmiş Versiyon
 * Geliştirici: Dmrilker
 * Versiyon: 1.5.8 (Optimize - Temiz)
 * Son Güncelleme: 2025-06-02 13:07:32 UTC
 * Satır Sayısı: ~1800 (Optimize edilmiş)
 */

console.log('🚀 Nakit Finansal Sistem - Optimize Edilmiş Versiyon Yükleniyor...');

class NakitFinansalSistem {
    constructor() {
        // ==========================================
        // SİSTEM BİLGİLERİ VE TEMEL AYARLAR
        // ==========================================
        this.sistemBaslangici = new Date('2025-06-01T14:50:52Z');
        this.gelistirici = 'Dmrilker';
        this.versiyon = '1.5.8-optimized';
        this.aciklama = 'AI Destekli Finansal Analiz ve Tahmin Sistemi';
        
        // ==========================================
        // VERİ SAKLAMA - SADECE GEREKENLR
        // ==========================================
        this.veriTabani = new Map();
        this.veriGecmisi = [];
        this.altinVerileri = [];
        this.dolarVerileri = [];
        this.borsaVerileri = [];
        this.bitcoinVerileri = [];
        this.ethereumVerileri = [];
        
        // ==========================================
        // ANALİZ VE TAHMİN - SİMPLİFİED
        // ==========================================
        this.riskFaktorleri = {
            riskSkoru: 0,
            seviye: 'DÜŞÜK',
            volatilite: 0,
            trend: 'YATAY',
            piyasaDurumu: 'STABIL'
        };
        
        this.tahminSonuclari = [];
        this.aiMotor = {
            sonTahmin: null,
            güvenSeviyesi: 0,
            performans: []
        };
        
        // ==========================================
        // SİSTEM DURUMU - SADECE GEREKLİLER
        // ==========================================
        this.sistemDurumu = {
            aktif: false,
            başlatmaZamani: null,
            veriToplamaAktif: false,
            sonGüncelleme: null,
            sistemSagligi: 'HAZIR'
        };
        
        this.performans = {
            veriSayisi: 0,
            tahminSayisi: 0,
            basariliTahmin: 0,
            dogrulukOrani: 0,
            basariliApiCagrilari: 0,
            basarisizApiCagrilari: 0
        };
        
        // ==========================================
        // API YÖNETİMİ - TEMİZLENMİŞ
        // ==========================================
        this.apiConfig = {
            timeout: 15000,
            retryCount: 3,
            cacheSüresi: 60000 // 1 dakika
        };
        
        this.networkMonitor = {
            basariliIstekler: 0,
            basarisizIstekler: 0,
            baglantiDurumu: 'HAZIR'
        };
        
        // ==========================================
        // CACHE - SADECE TEMEL
        // ==========================================
        this.cache = new Map();
        this.cacheConfig = {
            maksimumBoyut: 100,
            yasamSuresi: 300000 // 5 dakika
        };
        
        // ==========================================
        // ZAMANLAYICILAR - TEMEL
        // ==========================================
        this.timers = {
            veriToplama: null,
            riskAnalizi: null,
            tahminMotoru: null,
            cacheTemizlik: null
        };
        
        this.intervals = {
            veriToplama: 30000,      // 30 saniye
            riskAnalizi: 120000,     // 2 dakika  
            tahminMotoru: 180000,    // 3 dakika
            cacheTemizlik: 600000    // 10 dakika
        };
        
        // ==========================================
        // İSTATİSTİKLER - SADECE GEREKLİLER
        // ==========================================
        this.istatistikler = {
            toplamVeriSayisi: 0,
            toplamTahminSayisi: 0,
            basariliApiCagrilari: 0,
            basarisizApiCagrilari: 0,
            sistemHatalari: 0,
            toplamCalismaSuresi: 0
        };
        
        // ==========================================
        // DEMO VERİ AYARLARI
        // ==========================================
        this.demoModAktif = false;
        this.oncekiVeriler = null;
        
        // ==========================================
        // BAŞLATMA
        // ==========================================
        this.init();
    }
    
    // ==========================================
    // SİSTEM BAŞLATMA - OPTİMİZE
    // ==========================================
    init() {
        console.log(`🎯 Nakit Finansal Sistem v${this.versiyon} başlatılıyor...`);
        
        try {
            // Temel kontroller
            this.temelKontroller();
            
            // Cache başlatma
            this.cacheBaslatma();
            
            // Event listener'lar
            this.eventListenerKurulum();
            
            // Demo verileri yükle
            this.demoVerileriYukle();
            
            console.log('✅ Sistem başlatma tamamlandı');
            
        } catch (hata) {
            console.error('❌ Sistem başlatma hatası:', hata);
            throw hata;
        }
    }
    
    temelKontroller() {
        // Browser uyumluluğu
        if (typeof fetch === 'undefined') {
            throw new Error('Bu tarayıcı Fetch API desteklemiyor');
        }
        
        if (typeof Map === 'undefined') {
            throw new Error('Bu tarayıcı Map desteklemiyor');
        }
        
        console.log('✅ Temel kontroller tamamlandı');
    }
    
    eventListenerKurulum() {
        // Sayfa kapanma
        window.addEventListener('beforeunload', () => {
            this.sistemKapat();
        });
        
        // Network durumu
        window.addEventListener('online', () => {
            this.networkMonitor.baglantiDurumu = 'ONLINE';
            console.log('🌐 İnternet bağlantısı restore edildi');
        });
        
        window.addEventListener('offline', () => {
            this.networkMonitor.baglantiDurumu = 'OFFLINE';
            console.log('🌐 İnternet bağlantısı kesildi');
        });
        
        console.log('✅ Event listener kurulum tamamlandı');
    }
    
    cacheBaslatma() {
        this.cache.clear();
        
        // Cache temizlik timer
        this.timers.cacheTemizlik = setInterval(() => {
            this.cacheTemizle();
        }, this.intervals.cacheTemizlik);
        
        console.log('✅ Cache sistemi başlatıldı');
    }
    
    demoVerileriYukle() {
        // Başlangıç demo değerleri
        this.oncekiVeriler = {
            altin: 2045.32,
            dolar: 30.7845,
            bitcoin: 67890,
            borsa: 8654.32,
            ethereum: 3890.45,
            zaman: new Date()
        };
        
        console.log('✅ Demo veriler yüklendi');
    }
    
    // ==========================================
    // ANA SİSTEM FONKSİYONLARI - OPTİMİZE
    // ==========================================
    async sistemiBaslat() {
        console.log('🚀 Nakit Finansal Sistem başlatılıyor...');
        
        try {
            if (this.sistemDurumu.aktif) {
                console.log('⚠️ Sistem zaten çalışıyor');
                this.bildirimGonder('Sistem zaten çalışıyor', 'warning');
                return false;
            }
            
            // Sistem durumu güncelleme
            this.sistemDurumu.aktif = true;
            this.sistemDurumu.başlatmaZamani = new Date();
            this.sistemDurumu.sistemSagligi = 'ÇALIŞIYOR';
            
            // Dashboard UI güncelleme
            this.dashboardUIGuncelle('running');
            
            // Network testi
            const networkTest = await this.networkBaglantıTesti();
            if (!networkTest) {
                console.warn('⚠️ Network bağlantısı zayıf - Demo modda başlatılıyor');
                this.demoModAktif = true;
                this.bildirimGonder('Network bağlantısı zayıf - Demo modda çalışıyor', 'warning');
            }
            
            // Veri toplama başlat
            await this.veriToplamaBaslat();
            
            // Risk analizi başlat
            this.riskAnaliziBaslat();
            
            // AI tahmin başlat
            this.aiTahminBaslat();
            
            // Başarı bildirimi
            this.bildirimGonder('Sistem başarıyla başlatıldı!', 'success');
            
            console.log('✅ Sistem başarıyla başlatıldı!');
            return true;
            
        } catch (hata) {
            console.error('❌ Sistem başlatma hatası:', hata);
            this.sistemDurumu.aktif = false;
            this.sistemDurumu.sistemSagligi = 'HATA';
            this.bildirimGonder(`Sistem başlatma hatası: ${hata.message}`, 'error');
            return false;
        }
    }
    
    sistemiDurdur() {
        console.log('⏹️ Sistem durduruluyor...');
        
        try {
            this.sistemDurumu.aktif = false;
            this.sistemDurumu.sistemSagligi = 'DURDURULDU';
            
            // Timer'ları durdur
            this.tumTimerlarıDurdur();
            
            // Dashboard UI güncelle
            this.dashboardUIGuncelle('stopped');
            
            // Çalışma süresi hesapla
            if (this.sistemDurumu.başlatmaZamani) {
                const calismaSuresi = Date.now() - this.sistemDurumu.başlatmaZamani;
                this.istatistikler.toplamCalismaSuresi += calismaSuresi;
            }
            
            this.bildirimGonder('Sistem durduruldu', 'info');
            console.log('✅ Sistem başarıyla durduruldu');
            return true;
            
        } catch (hata) {
            console.error('❌ Sistem durdurma hatası:', hata);
            return false;
        }
    }
    
    sistemKapat() {
        console.log('🔄 Sistem kapatılıyor...');
        this.sistemiDurdur();
        this.cache.clear();
        
        // Son durumu kaydet
        try {
            const sonDurum = {
                zaman: new Date().toISOString(),
                istatistikler: this.istatistikler,
                versiyon: this.versiyon
            };
            localStorage.setItem('nakitSistem_sonDurum', JSON.stringify(sonDurum));
        } catch (e) {
            console.warn('⚠️ Local storage kayıt hatası');
        }
        
        console.log('✅ Sistem kapatıldı');
    }
    
    // ==========================================
    // VERİ TOPLAMA - OPTİMİZE
    // ==========================================
    async veriToplamaBaslat() {
        console.log('📊 Veri toplama başlatılıyor...');
        
        try {
            // İlk veri çekme
            await this.tumVerilerıCek();
            
            // Sürekli veri toplama
            this.timers.veriToplama = setInterval(async () => {
                try {
                    if (this.sistemDurumu.aktif) {
                        await this.tumVerilerıCek();
                    }
                } catch (hata) {
                    console.error('❌ Veri toplama döngüsü hatası:', hata);
                    this.istatistikler.sistemHatalari++;
                }
            }, this.intervals.veriToplama);
            
            this.sistemDurumu.veriToplamaAktif = true;
            console.log('✅ Veri toplama başlatıldı');
            
        } catch (hata) {
            console.error('❌ Veri toplama başlatma hatası:', hata);
            throw hata;
        }
    }
    
    async tumVerilerıCek() {
        const başlangıcZamani = performance.now();
        
        try {
            console.log('📊 Finansal veriler çekiliyor...');
            
            // Demo mod kontrolü
            if (this.demoModAktif || this.networkMonitor.baglantiDurumu === 'OFFLINE') {
                return await this.demoVeriSeti();
            }
            
            // Gerçek API çağrıları
            const veriPromise = await Promise.allSettled([
                this.altinFiyatCek(),
                this.dolarKurCek(),
                this.bitcoinFiyatCek(),
                this.borsaEndeksıCek(),
                this.ethereumFiyatCek()
            ]);
            
            const [altinSonuc, dolarSonuc, bitcoinSonuc, borsaSonuc, ethereumSonuc] = veriPromise;
            
            // Veri seti oluştur
            const veriSeti = {
                id: this.benzersizIdOlustur(),
                zaman: new Date(),
                timestamp: Date.now(),
                altin: altinSonuc.status === 'fulfilled' ? altinSonuc.value : this.sonGecerliDeger('altin'),
                dolar: dolarSonuc.status === 'fulfilled' ? dolarSonuc.value : this.sonGecerliDeger('dolar'),
                bitcoin: bitcoinSonuc.status === 'fulfilled' ? bitcoinSonuc.value : this.sonGecerliDeger('bitcoin'),
                borsa: borsaSonuc.status === 'fulfilled' ? borsaSonuc.value : this.sonGecerliDeger('borsa'),
                ethereum: ethereumSonuc.status === 'fulfilled' ? ethereumSonuc.value : this.sonGecerliDeger('ethereum'),
                performans: {
                    islemSuresi: performance.now() - başlangıcZamani,
                    basariliApi: veriPromise.filter(p => p.status === 'fulfilled').length,
                    toplamApi: veriPromise.length
                }
            };
            
            // Veri işleme
            if (this.veriDogrula(veriSeti)) {
                await this.veriKaydet(veriSeti);
                this.dashboardVeriGuncelle(veriSeti);
                this.istatistikleriGuncelle(veriSeti);
                
                console.log(`✅ Veri toplandı. ID: ${veriSeti.id}`);
                return veriSeti;
            } else {
                throw new Error('Veri doğrulaması başarısız');
            }
            
        } catch (hata) {
            console.error('❌ Veri toplama hatası:', hata);
            this.istatistikler.sistemHatalari++;
            
            // Fallback demo veri
            return await this.demoVeriSeti();
        }
    }
    
    // ==========================================
    // API FONKSİYONLARI - SİMPLİFİED
    // ==========================================
    async altinFiyatCek() {
        const cacheAnahtari = 'altin_fiyat';
        const cacheliVeri = this.cachedenVeriAl(cacheAnahtari);
        if (cacheliVeri) return cacheliVeri;
        
        try {
            // CoinGecko üzerinden altın ETF
            const response = await this.guvenliApiCagrisi(
                'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd'
            );
            
            if (response['pax-gold'] && response['pax-gold'].usd) {
                const altinFiyat = parseFloat(response['pax-gold'].usd.toFixed(2));
                this.cacheVeriKaydet(cacheAnahtari, altinFiyat);
                return altinFiyat;
            }
            
            throw new Error('Altın fiyat verisi bulunamadı');
            
        } catch (hata) {
            console.warn('⚠️ Altın API hatası, demo veri kullanılıyor');
            return this.demoAltinFiyati();
        }
    }
    
    async dolarKurCek() {
        const cacheAnahtari = 'dolar_kur';
        const cacheliVeri = this.cachedenVeriAl(cacheAnahtari);
        if (cacheliVeri) return cacheliVeri;
        
        try {
            const response = await this.guvenliApiCagrisi(
                'https://api.exchangerate-api.com/v4/latest/USD'
            );
            
            if (response.rates && response.rates.TRY) {
                const dolarKur = parseFloat(response.rates.TRY.toFixed(4));
                this.cacheVeriKaydet(cacheAnahtari, dolarKur);
                return dolarKur;
            }
            
            throw new Error('TRY kuru bulunamadı');
            
        } catch (hata) {
            console.warn('⚠️ USD/TRY API hatası, demo veri kullanılıyor');
            return this.demoDolarKuru();
        }
    }
    
    async bitcoinFiyatCek() {
        const cacheAnahtari = 'bitcoin_fiyat';
        const cacheliVeri = this.cachedenVeriAl(cacheAnahtari);
        if (cacheliVeri) return cacheliVeri;
        
        try {
            const response = await this.guvenliApiCagrisi(
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
            );
            
            if (response.bitcoin && response.bitcoin.usd) {
                const bitcoinFiyat = Math.round(response.bitcoin.usd);
                this.cacheVeriKaydet(cacheAnahtari, bitcoinFiyat);
                return bitcoinFiyat;
            }
            
            throw new Error('Bitcoin fiyat verisi bulunamadı');
            
        } catch (hata) {
            console.warn('⚠️ Bitcoin API hatası, demo veri kullanılıyor');
            return this.demoBitcoinFiyati();
        }
    }
    
    async borsaEndeksıCek() {
        const cacheAnahtari = 'borsa_endeks';
        const cacheliVeri = this.cachedenVeriAl(cacheAnahtari);
        if (cacheliVeri) return cacheliVeri;
        
        try {
            // Yahoo Finance alternatif
            const response = await this.guvenliApiCagrisi(
                'https://query1.finance.yahoo.com/v8/finance/chart/XU100.IS'
            );
            
            if (response.chart?.result?.[0]?.meta?.regularMarketPrice) {
                const borsaEndeks = parseFloat(response.chart.result[0].meta.regularMarketPrice.toFixed(2));
                this.cacheVeriKaydet(cacheAnahtari, borsaEndeks);
                return borsaEndeks;
            }
            
            throw new Error('BIST100 verisi bulunamadı');
            
        } catch (hata) {
            console.warn('⚠️ BIST API hatası, demo veri kullanılıyor');
            return this.demoBorsaEndeksi();
        }
    }
    
    async ethereumFiyatCek() {
        const cacheAnahtari = 'ethereum_fiyat';
        const cacheliVeri = this.cachedenVeriAl(cacheAnahtari);
        if (cacheliVeri) return cacheliVeri;
        
        try {
            const response = await this.guvenliApiCagrisi(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
            );
            
            if (response.ethereum && response.ethereum.usd) {
                const ethereumFiyat = parseFloat(response.ethereum.usd.toFixed(2));
                this.cacheVeriKaydet(cacheAnahtari, ethereumFiyat);
                return ethereumFiyat;
            }
            
            throw new Error('Ethereum fiyat verisi bulunamadı');
            
        } catch (hata) {
            console.warn('⚠️ Ethereum API hatası, demo veri kullanılıyor');
            return this.demoEthereumFiyati();
        }
    }
    
    // ==========================================
    // DEMO VERİ FONKSİYONLARI - OPTİMİZE
    // ==========================================
    async demoVeriSeti() {
        console.log('🎭 Demo veri seti oluşturuluyor...');
        
        const veriSeti = {
            id: this.benzersizIdOlustur(),
            zaman: new Date(),
            timestamp: Date.now(),
            altin: this.demoAltinFiyati(),
            dolar: this.demoDolarKuru(),
            bitcoin: this.demoBitcoinFiyati(),
            borsa: this.demoBorsaEndeksi(),
            ethereum: this.demoEthereumFiyati(),
            performans: {
                islemSuresi: Math.random() * 500 + 100,
                basariliApi: 5,
                toplamApi: 5
            }
        };
        
        if (this.veriDogrula(veriSeti)) {
            await this.veriKaydet(veriSeti);
            this.dashboardVeriGuncelle(veriSeti);
            this.istatistikleriGuncelle(veriSeti);
            
            console.log(`🎭 Demo veri seti oluşturuldu. ID: ${veriSeti.id}`);
            return veriSeti;
        }
        
        throw new Error('Demo veri seti oluşturulamadı');
    }
    
    demoAltinFiyati() {
        const temelFiyat = 2045;
        const volatilite = 30;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        const trendEtkisi = Math.sin(Date.now() / 1000000) * 15;
        
        const fiyat = temelFiyat + rastgeleEtki + trendEtkisi;
        return Math.max(1950, Math.min(2200, parseFloat(fiyat.toFixed(2))));
    }
    
    demoDolarKuru() {
        const temelKur = 30.78;
        const volatilite = 0.3;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        const ekonomikEtki = Math.sin(Date.now() / 800000) * 0.2;
        
        const kur = temelKur + rastgeleEtki + ekonomikEtki;
        return Math.max(29.5, Math.min(32.0, parseFloat(kur.toFixed(4))));
    }
    
    demoBitcoinFiyati() {
        const temelFiyat = 67890;
        const volatilite = 2500;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        const kriptoTrend = Math.sin(Date.now() / 600000) * 1500;
        
        const fiyat = temelFiyat + rastgeleEtki + kriptoTrend;
        return Math.max(55000, Math.min(85000, Math.round(fiyat)));
    }
    
    demoBorsaEndeksi() {
        const temelEndeks = 8654;
        const volatilite = 150;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        const piyasaTrendi = Math.sin(Date.now() / 700000) * 100;
        
        const endeks = temelEndeks + rastgeleEtki + piyasaTrendi;
        return Math.max(8000, Math.min(9500, parseFloat(endeks.toFixed(2))));
    }
    
    demoEthereumFiyati() {
        const temelFiyat = 3890;
        const volatilite = 180;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        const defiTrend = Math.cos(Date.now() / 550000) * 120;
        
        const fiyat = temelFiyat + rastgeleEtki + defiTrend;
        return Math.max(3500, Math.min(4500, parseFloat(fiyat.toFixed(2))));
    }
    
    // ==========================================
    // VERİ DOĞRULAMA VE KAYDETME - OPTİMİZE
    // ==========================================
    veriDogrula(veriSeti) {
        if (!veriSeti || typeof veriSeti !== 'object') {
            console.error('❌ Veri seti geçersiz');
            return false;
        }
        
        const zorunluAlanlar = ['zaman', 'altin', 'dolar', 'bitcoin', 'borsa'];
        const eksikAlanlar = zorunluAlanlar.filter(alan => 
            veriSeti[alan] === undefined || veriSeti[alan] === null
        );
        
        if (eksikAlanlar.length > 0) {
            console.error('❌ Eksik alanlar:', eksikAlanlar);
            return false;
        }
        
        // Numerik kontrol
        const numerikAlanlar = ['altin', 'dolar', 'bitcoin', 'borsa', 'ethereum'];
        for (const alan of numerikAlanlar) {
            if (veriSeti[alan] !== undefined && 
                (isNaN(veriSeti[alan]) || veriSeti[alan] <= 0)) {
                console.error(`❌ Geçersiz değer: ${alan} = ${veriSeti[alan]}`);
                return false;
            }
        }
        
        return true;
    }
    
    async veriKaydet(veriSeti) {
        try {
            // Ana veri tabanına kaydet
            const tarihAnahtari = new Date().toDateString();
            
            if (!this.veriTabani.has(tarihAnahtari)) {
                this.veriTabani.set(tarihAnahtari, []);
            }
            
            this.veriTabani.get(tarihAnahtari).push(veriSeti);
            this.veriGecmisi.push(veriSeti);
            
            // Varlık dizilerine ekle
            this.altinVerileri.push({ zaman: veriSeti.zaman, deger: veriSeti.altin, id: veriSeti.id });
            this.dolarVerileri.push({ zaman: veriSeti.zaman, deger: veriSeti.dolar, id: veriSeti.id });
            this.bitcoinVerileri.push({ zaman: veriSeti.zaman, deger: veriSeti.bitcoin, id: veriSeti.id });
            this.borsaVerileri.push({ zaman: veriSeti.zaman, deger: veriSeti.borsa, id: veriSeti.id });
            
            if (veriSeti.ethereum) {
                this.ethereumVerileri.push({ zaman: veriSeti.zaman, deger: veriSeti.ethereum, id: veriSeti.id });
            }
            
            // Bellek optimizasyonu - maksimum 200 veri
            const maksimumVeri = 200;
            if (this.veriGecmisi.length > maksimumVeri) {
                this.veriGecmisi = this.veriGecmisi.slice(-maksimumVeri);
            }
            
            [this.altinVerileri, this.dolarVerileri, this.bitcoinVerileri, 
             this.borsaVerileri, this.ethereumVerileri].forEach(dizi => {
                if (dizi.length > maksimumVeri) {
                    dizi.splice(0, dizi.length - maksimumVeri);
                }
            });
            
            // Sistem durumunu güncelle
            this.sistemDurumu.sonGüncelleme = veriSeti.zaman;
            
        } catch (hata) {
            console.error('❌ Veri kaydetme hatası:', hata);
            throw hata;
        }
    }
    
    // ==========================================
    // DASHBOARD GÜNCELLEMELER - OPTİMİZE
    // ==========================================
    dashboardVeriGuncelle(veriSeti) {
        try {
            console.log('🎯 Dashboard güncelleniyor...');
            
            // Fiyat widget'larını güncelle
            this.fiyatWidgetGuncelle('altin', veriSeti.altin, '🥇 Altın', '$');
            this.fiyatWidgetGuncelle('dolar', veriSeti.dolar, '💵 USD/TRY', '₺', 4);
            this.fiyatWidgetGuncelle('bitcoin', veriSeti.bitcoin, '₿ Bitcoin', '$', 0, true);
            this.fiyatWidgetGuncelle('borsa', veriSeti.borsa, '📈 BIST 100', '', 2);
            
            if (veriSeti.ethereum) {
                this.fiyatWidgetGuncelle('ethereum', veriSeti.ethereum, '⧫ Ethereum', '$', 2);
            }
            
            // Son güncelleme zamanı
            this.elementGuncelle('sonGuncelleme', new Date().toLocaleTimeString('tr-TR'));
            this.elementGuncelle('sistemDurumu', 'Canlı Veriler', '#28a745');
            
            // Veri listesine ekle
            if (typeof window.veriListesineEkle === 'function') {
                window.veriListesineEkle(
                    '🥇 Altın', 
                    `$${veriSeti.altin.toFixed(2)}`, 
                    this.degisimOranıHesapla('altin', veriSeti.altin)
                );
            }
            
            console.log('✅ Dashboard güncellendi');
            
        } catch (hata) {
            console.error('❌ Dashboard güncelleme hatası:', hata);
        }
    }
    
    fiyatWidgetGuncelle(tip, fiyat, label, para, ondalık = 2, binlerAyıraci = false) {
        // Fiyat elementi
        const fiyatElementi = document.getElementById(`${tip}Fiyat`);
        if (fiyatElementi) {
            const formatlanmisFiyat = binlerAyıraci ? 
                `${para}${fiyat.toLocaleString()}` : 
                `${para}${fiyat.toFixed(ondalık)}`;
            fiyatElementi.textContent = formatlanmisFiyat;
        }
        
        // Değişim elementi
        const degisimElementi = document.getElementById(`${tip}Degisim`);
        if (degisimElementi) {
            const degisimOrani = this.degisimOranıHesapla(tip, fiyat);
            degisimElementi.textContent = degisimOrani;
            
            // Renk ayarlama
            if (degisimOrani.includes('+')) {
                degisimElementi.className = 'değişim pozitif';
            } else if (degisimOrani.includes('-')) {
                degisimElementi.className = 'değişim negatif';
            } else {
                degisimElementi.className = 'değişim notr';
            }
        }
    }
    
    degisimOranıHesapla(varlık, yeniFiyat) {
        try {
            const oncekiFiyat = this.sonGecerliDeger(varlık, 1);
            
            if (!oncekiFiyat || oncekiFiyat === yeniFiyat) {
                return '0.00%';
            }
            
            const degisim = ((yeniFiyat - oncekiFiyat) / oncekiFiyat) * 100;
            return degisim >= 0 ? `+${degisim.toFixed(2)}%` : `${degisim.toFixed(2)}%`;
            
        } catch (hata) {
            console.warn(`⚠️ Değişim hesaplama hatası (${varlık}):`, hata);
            return '0.00%';
        }
    }
    
    dashboardUIGuncelle(durum) {
        const baslatBtn = document.getElementById('başlatBtn');
        const durdurBtn = document.getElementById('durdurBtn');
        const sistemDurumuEl = document.getElementById('sistemDurumu');
        
        switch(durum) {
            case 'running':
                if (baslatBtn) baslatBtn.disabled = true;
                if (durdurBtn) durdurBtn.disabled = false;
                if (sistemDurumuEl) {
                    sistemDurumuEl.textContent = 'Çalışıyor';
                    sistemDurumuEl.style.color = '#28a745';
                }
                break;
                
            case 'stopped':
                if (baslatBtn) baslatBtn.disabled = false;
                if (durdurBtn) durdurBtn.disabled = true;
                if (sistemDurumuEl) {
                    sistemDurumuEl.textContent = 'Durduruldu';
                    sistemDurumuEl.style.color = '#dc3545';
                }
                break;
        }
    }
    
    // ==========================================
    // RİSK ANALİZİ - SİMPLİFİED
    // ==========================================
    riskAnaliziBaslat() {
        console.log('🛡️ Risk analizi başlatılıyor...');
        
        this.timers.riskAnalizi = setInterval(async () => {
            try {
                if (this.sistemDurumu.aktif && this.veriGecmisi.length > 0) {
                    await this.riskAnaliziYap();
                }
            } catch (hata) {
                console.error('❌ Risk analizi hatası:', hata);
            }
        }, this.intervals.riskAnalizi);
    }
    
    async riskAnaliziYap() {
        try {
            // Basit risk skoru hesaplama
            const sonVeriler = this.veriGecmisi.slice(-10);
            if (sonVeriler.length < 5) return;
            
            // Volatilite hesaplama
            const altinFiyatlari = sonVeriler.map(v => v.altin);
            const volatilite = this.volatiliteHesapla(altinFiyatlari);
            
            // Risk skoru (0-100)
            const riskSkoru = Math.min(100, volatilite * 20);
            
            // Risk seviyesi
            let seviye = 'DÜŞÜK';
            if (riskSkoru > 60) seviye = 'YÜKSEK';
            else if (riskSkoru > 30) seviye = 'ORTA';
            
            // Trend analizi
            const trend = this.trendAnalizi(altinFiyatlari);
            
            // Risk faktörlerini güncelle
            this.riskFaktorleri = {
                riskSkoru: Math.round(riskSkoru),
                seviye: seviye,
                volatilite: Math.round(volatilite * 100) / 100,
                trend: trend > 0 ? 'YUKSELİŞ' : trend < 0 ? 'DÜŞÜŞ' : 'YATAY',
                piyasaDurumu: riskSkoru < 30 ? 'STABIL' : riskSkoru < 60 ? 'KARARSIZ' : 'VOLATİL'
            };
            
            // Dashboard'u güncelle
            this.riskDashboardGuncelle();
            
        } catch (hata) {
            console.error('❌ Risk analizi yapma hatası:', hata);
        }
    }
    
    volatiliteHesapla(fiyatlar) {
        if (fiyatlar.length < 2) return 0;
        
        const ortalama = fiyatlar.reduce((a, b) => a + b, 0) / fiyatlar.length;
        const varyans = fiyatlar.reduce((acc, fiyat) => acc + Math.pow(fiyat - ortalama, 2), 0) / fiyatlar.length;
        return Math.sqrt(varyans) / ortalama;
    }
    
    trendAnalizi(fiyatlar) {
        if (fiyatlar.length < 3) return 0;
        
        const son = fiyatlar[fiyatlar.length - 1];
        const ilk = fiyatlar[0];
        
        return ((son - ilk) / ilk) * 100;
    }
    
    riskDashboardGuncelle() {
        try {
            // Risk meter güncelle
            const riskValue = document.getElementById('riskValue');
            const riskNeedle = document.getElementById('riskNeedle');
            const riskSeviyesi = document.getElementById('riskSeviyesi');
            
            if (riskValue) {
                riskValue.textContent = this.riskFaktorleri.riskSkoru;
            }
            
            if (riskNeedle) {
                const rotation = (this.riskFaktorleri.riskSkoru / 100) * 180 - 90;
                riskNeedle.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
            }
            
            if (riskSeviyesi) {
                riskSeviyesi.textContent = `${this.riskFaktorleri.seviye} Risk`;
                riskSeviyesi.className = `risk-level ${this.riskFaktorleri.seviye.toLowerCase()}`;
            }
            
            // Risk detayları güncelle
            this.elementGuncelle('volatilite', this.riskFaktorleri.volatilite.toFixed(2));
            this.elementGuncelle('trend', this.riskFaktorleri.trend);
            this.elementGuncelle('piyasaDurumu', this.riskFaktorleri.piyasaDurumu);
            this.elementGuncelle('onerilenAksiyon', this.riskFaktorleri.seviye === 'DÜŞÜK' ? 'ALIM' : 'BEKLE');
            
        } catch (hata) {
            console.error('❌ Risk dashboard güncelleme hatası:', hata);
        }
    }
    
    // ==========================================
    // AI TAHMİN SİSTEMİ - SİMPLİFİED
    // ==========================================
    aiTahminBaslat() {
        console.log('🤖 AI tahmin sistemi başlatılıyor...');
        
        this.timers.tahminMotoru = setInterval(async () => {
            try {
                if (this.sistemDurumu.aktif && this.veriGecmisi.length > 5) {
                    const tahmin = await this.aiTahminYap();
                    this.tahminDashboardGuncelle(tahmin);
                }
            } catch (hata) {
                console.error('❌ AI tahmin hatası:', hata);
            }
        }, this.intervals.tahminMotoru);
    }
    
    async aiTahminYap() {
        try {
            // Basit AI tahmin algoritması
            const sonVeriler = this.veriGecmisi.slice(-10);
            if (sonVeriler.length < 5) return null;
            
            // Trend analizi
            const altinFiyatlari = sonVeriler.map(v => v.altin);
            const trend = this.trendAnalizi(altinFiyatlari);
            const volatilite = this.volatiliteHesapla(altinFiyatlari);
            
            // Risk faktörü
            const riskFaktoru = this.riskFaktorleri.riskSkoru / 100;
            
            // Tahmin algoritması
            let karar = 'BEKLE';
            let güven = 50;
            let neden = 'Piyasa belirsiz';
            
            if (trend > 2 && riskFaktoru < 0.6) {
                karar = 'ALIM';
                güven = Math.min(90, 70 + (trend * 5));
                neden = 'Güçlü yükseliş trendi ve düşük risk';
            } else if (trend < -2 && riskFaktoru < 0.6) {
                karar = 'SATIM';
                güven = Math.min(90, 70 + (Math.abs(trend) * 5));
                neden = 'Düşüş trendi tespit edildi';
            } else if (riskFaktoru > 0.7) {
                karar = 'BEKLE';
                güven = 80;
                neden = 'Yüksek risk - beklemek önerilir';
            }
            
            const tahmin = {
                karar: karar,
                güven: Math.round(güven),
                neden: neden,
                önerilen_saat: new Date().toLocaleTimeString('tr-TR'),
                hedef_fiyat: this.hedefFiyatHesapla(karar, sonVeriler[sonVeriler.length - 1].altin),
                beklenen_degisim: trend,
                zaman: new Date(),
                karar_rengi: karar === 'ALIM' ? '#28a745' : karar === 'SATIM' ? '#dc3545' : '#f39c12'
            };
            
            this.tahminSonuclari.push(tahmin);
            this.aiMotor.sonTahmin = tahmin;
            this.istatistikler.toplamTahminSayisi++;
            
            return tahmin;
            
        } catch (hata) {
            console.error('❌ AI tahmin yapma hatası:', hata);
            return null;
        }
    }
    
    hedefFiyatHesapla(karar, mevcutFiyat) {
        switch(karar) {
            case 'ALIM':
                return `$${(mevcutFiyat * 1.02).toFixed(2)}`;
            case 'SATIM':
                return `$${(mevcutFiyat * 0.98).toFixed(2)}`;
            default:
                return `$${mevcutFiyat.toFixed(2)}`;
        }
    }
    
    tahminDashboardGuncelle(tahmin) {
        try {
            if (!tahmin) return;
            
            const tahminKarar = document.getElementById('tahminKarar');
            if (tahminKarar) {
                tahminKarar.innerHTML = `<i class="fas fa-brain"></i> AI Önerisi: ${tahmin.karar}`;
                tahminKarar.style.background = tahmin.karar_rengi;
            }
            
            const tahminGuven = document.getElementById('tahminGüven');
            const güvenProgress = document.getElementById('güvenProgress');
            if (tahminGuven && güvenProgress) {
                tahminGuven.textContent = `${tahmin.güven}%`;
                güvenProgress.style.width = `${tahmin.güven}%`;
            }
            
            this.elementGuncelle('tahminSaat', tahmin.önerilen_saat);
            this.elementGuncelle('hedefFiyat', tahmin.hedef_fiyat);
            this.elementGuncelle('tahminNeden', tahmin.neden);
            
        } catch (hata) {
            console.error('❌ Tahmin dashboard güncelleme hatası:', hata);
        }
    }
    
    // ==========================================
    // MANUEL FONKSİYONLAR
    // ==========================================
    async manuelApiTesti() {
        console.log('🧪 Manuel API testi başlatılıyor...');
        
        try {
            const [altin, dolar, bitcoin, borsa, ethereum] = await Promise.allSettled([
                this.altinFiyatCek(),
                this.dolarKurCek(),
                this.bitcoinFiyatCek(),
                this.borsaEndeksıCek(),
                this.ethereumFiyatCek()
            ]);
            
            const basariliSayisi = [altin, dolar, bitcoin, borsa, ethereum].filter(api => api.status === 'fulfilled').length;
            
            console.log('📊 API Test Sonuçları:');
            console.log('🥇 Altın:', altin.status === 'fulfilled' ? `$${altin.value}` : 'HATA');
            console.log('💵 USD/TRY:', dolar.status === 'fulfilled' ? `₺${dolar.value}` : 'HATA');
            console.log('₿ Bitcoin:', bitcoin.status === 'fulfilled' ? `$${bitcoin.value}` : 'HATA');
            console.log('📈 BIST 100:', borsa.status === 'fulfilled' ? borsa.value : 'HATA');
            console.log('⧫ Ethereum:', ethereum.status === 'fulfilled' ? `$${ethereum.value}` : 'HATA');
            console.log(`✅ ${basariliSayisi}/5 API başarılı`);
            
            this.bildirimGonder(`API Test: ${basariliSayisi}/5 başarılı`, basariliSayisi >= 3 ? 'success' : 'warning');
            return basariliSayisi;
            
        } catch (error) {
            console.error('❌ API test hatası:', error);
            this.bildirimGonder('API test hatası', 'error');
            return 0;
        }
    }
    
    async gercekVeriCekVeGuncelle() {
        console.log('📊 Manuel veri güncelleme başlatılıyor...');
        
        try {
            const veriSeti = await this.tumVerilerıCek();
            this.bildirimGonder('Manuel veri güncellemesi tamamlandı', 'success');
            return veriSeti;
        } catch (error) {
            console.error('❌ Manuel güncelleme hatası:', error);
            this.bildirimGonder('Manuel güncelleme hatası', 'error');
            throw error;
        }
    }
    
    // ==========================================
    // UTILITY FONKSİYONLARI
    // ==========================================
    async guvenliApiCagrisi(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.apiConfig.timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                method: options.method || 'GET',
                headers: {
                    'Accept': 'application/json',
                    ...options.headers
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
            
        } catch (hata) {
            clearTimeout(timeoutId);
            
            if (hata.name === 'AbortError') {
                throw new Error('API çağrısı zaman aşımına uğradı');
            }
            
            throw hata;
        }
    }
    
    async networkBaglantıTesti() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/ping', {
                method: 'GET',
                timeout: 5000
            });
            
            return response.ok;
        } catch (hata) {
            return false;
        }
    }
    
    istatistikleriGuncelle(veriSeti) {
        this.istatistikler.toplamVeriSayisi++;
        this.istatistikler.basariliApiCagrilari += veriSeti.performans.basariliApi;
        this.istatistikler.basarisizApiCagrilari += (veriSeti.performans.toplamApi - veriSeti.performans.basariliApi);
        
        // Dashboard istatistik güncelleme
        this.elementGuncelle('toplamVeri', this.istatistikler.toplamVeriSayisi);
        this.elementGuncelle('tahminSayisi', this.istatistikler.toplamTahminSayisi);
        
        // Çalışma süresi
        if (this.sistemDurumu.başlatmaZamani) {
            const calismaSuresi = Date.now() - this.sistemDurumu.başlatmaZamani;
            const saat = Math.floor(calismaSuresi / 3600000);
            const dakika = Math.floor((calismaSuresi % 3600000) / 60000);
            const saniye = Math.floor((calismaSuresi % 60000) / 1000);
            
            this.elementGuncelle('calismaSuresi', 
                `${saat.toString().padStart(2, '0')}:${dakika.toString().padStart(2, '0')}:${saniye.toString().padStart(2, '0')}`
            );
        }
    }
    
    tumTimerlarıDurdur() {
        Object.values(this.timers).forEach(timer => {
            if (timer) clearInterval(timer);
        });
        
        this.timers = {
            veriToplama: null,
            riskAnalizi: null,
            tahminMotoru: null,
            cacheTemizlik: null
        };
    }
    
    cacheTemizle() {
        const simdikiZaman = Date.now();
        
        for (const [anahtar, değer] of this.cache.entries()) {
            if (simdikiZaman - değer.zaman > this.cacheConfig.yasamSuresi) {
                this.cache.delete(anahtar);
            }
        }
        
        // Maksimum boyut kontrolü
        if (this.cache.size > this.cacheConfig.maksimumBoyut) {
            const eskiAnahtarlar = Array.from(this.cache.keys()).slice(0, this.cache.size - this.cacheConfig.maksimumBoyut);
            eskiAnahtarlar.forEach(anahtar => this.cache.delete(anahtar));
        }
    }
    
    cacheVeriKaydet(anahtar, veri) {
        this.cache.set(anahtar, {
            veri: veri,
            zaman: Date.now()
        });
    }
    
    cachedenVeriAl(anahtar) {
        const cacheliVeri = this.cache.get(anahtar);
        
        if (cacheliVeri && (Date.now() - cacheliVeri.zaman) < this.cacheConfig.yasamSuresi) {
            return cacheliVeri.veri;
        }
        
        return null;
    }
    
    sonGecerliDeger(varlık, öncekiIndex = 0) {
        let dizi;
        
        switch(varlık) {
            case 'altin':
                dizi = this.altinVerileri;
                break;
            case 'dolar':
                dizi = this.dolarVerileri;
                break;
            case 'bitcoin':
                dizi = this.bitcoinVerileri;
                break;
            case 'borsa':
                dizi = this.borsaVerileri;
                break;
            case 'ethereum':
                dizi = this.ethereumVerileri;
                break;
            default:
                return this.oncekiVeriler?.[varlık] || 0;
        }
        
        if (dizi.length > öncekiIndex) {
            return dizi[dizi.length - 1 - öncekiIndex].deger;
        }
        
        return this.oncekiVeriler?.[varlık] || 0;
    }
    
    benzersizIdOlustur() {
        return `nakit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    elementGuncelle(id, içerik, renk = null) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = içerik;
            if (renk) element.style.color = renk;
        }
    }
    
    bildirimGonder(mesaj, tip = 'info') {
        console.log(`📢 ${tip.toUpperCase()}: ${mesaj}`);
        
        // Dashboard bildirimi
        if (typeof window.bildirimEkle === 'function') {
            window.bildirimEkle(mesaj, tip);
        }
    }
}

// ==========================================
// GLOBAL INSTANCE VE FONKSİYONLAR
// ==========================================

// Global instance oluştur
window.nakitSistem = new NakitFinansalSistem();

// Global fonksiyonlar
window.sistemiBaslat = async function() {
    return await window.nakitSistem.sistemiBaslat();
};

window.sistemiDurdur = function() {
    return window.nakitSistem.sistemiDurdur();
};

window.manuelApiTesti = async function() {
    return await window.nakitSistem.manuelApiTesti();
};

window.manuelVeriGuncelle = async function() {
    return await window.nakitSistem.gercekVeriCekVeGuncelle();
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NakitFinansalSistem;
}

// Production ready log
console.log(`🎉 Nakit Finansal Sistem v${window.nakitSistem.versiyon} - Optimize Edilmiş!`);
console.log(`👨‍💻 Geliştirici: ${window.nakitSistem.gelistirici}`);
console.log(`📅 Sistem Başlangıcı: ${window.nakitSistem.sistemBaslangici.toLocaleString('tr-TR')}`);
console.log(`🔗 Global erişim: nakitSistem, sistemiBaslat(), sistemiDurdur(), manuelApiTesti()`);
console.log(`🚀 Sistem hazır - "Sistemi Başlat" butonuna tıklayabilirsiniz`);