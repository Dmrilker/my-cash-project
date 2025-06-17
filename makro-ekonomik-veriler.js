// ==========================================
// MAKRO EKONOMİK VERİLER SINIFI
// ==========================================
class MakroEkonomikVeriler {
    constructor() {
        // Makro ekonomik veri kaynakları
        this.ekonomikGostergeler = {
            faizOranlari: null,
            enflasyon: null,
            issizlik: null,
            gsyh: null,
            merkenzBankasiKararlari: null,
            jeopolitikRisk: 0,
            volatiliteIndeksi: 0
        };
        
        // Haber ve duyuru takibi
        this.haberAnalizi = {
            pozitifHaberler: 0,
            negatifHaberler: 0,
            nötralHaberler: 0,
            toplamDuyguSkoru: 0,
            sonHaberler: []
        };
        
        // Küresel piyasa durumu
        this.kureselPiyasalar = {
            spx500: null,
            nasdaq: null,
            dxy: null,           // Dolar Endeksi
            vix: null,           // Korku Endeksi
            gold: null,
            oil: null,
            bonds10y: null       // 10 yıllık tahvil faizi
        };
        
        // Ekonomik takvim
        this.ekonomikTakvim = {
            bugunEtkinlikler: [],
            gelecekEtkinlikler: [],
            sonSonuclar: []
        };
        
        console.log('🌐 Makro Ekonomik Veriler sistemi başlatıldı');
    }
    
    // ==========================================
    // MAKRO EKONOMİK VERİ TOPLAMA
    // ==========================================
    async makroVerileriGuncelle() {
        console.log('🌐 Makro ekonomik veriler güncelleniyor...');
        
        try {
            // Paralel veri çekme
            const [
                faizVerileri,
                piyasaVerileri,
                ekonomikTakvimVerileri,
                haberAnalizi,
                jeopolitikAnaliz
            ] = await Promise.allSettled([
                this.faizOranlariCek(),
                this.kureselPiyasaVerileriCek(),
                this.ekonomikTakvimCek(),
                this.haberAnaliziYap(),
                this.jeopolitikRiskAnalizi()
            ]);
            
            // Sonuçları işle
            if (faizVerileri.status === 'fulfilled') {
                this.ekonomikGostergeler = { ...this.ekonomikGostergeler, ...faizVerileri.value };
            }
            
            if (piyasaVerileri.status === 'fulfilled') {
                this.kureselPiyasalar = { ...this.kureselPiyasalar, ...piyasaVerileri.value };
            }
            
            if (ekonomikTakvimVerileri.status === 'fulfilled') {
                this.ekonomikTakvim = { ...this.ekonomikTakvim, ...ekonomikTakvimVerileri.value };
            }
            
            if (haberAnalizi.status === 'fulfilled') {
                this.haberAnalizi = { ...this.haberAnalizi, ...haberAnalizi.value };
            }
            
            if (jeopolitikAnaliz.status === 'fulfilled') {
                this.ekonomikGostergeler.jeopolitikRisk = jeopolitikAnaliz.value;
            }
            
            // Makro skoru hesapla
            const makroSkoru = this.makroSkoruHesapla();
            
            console.log('✅ Makro ekonomik veriler güncellendi');
            console.log(`📊 Makro Skoru: ${makroSkoru.skor}/100 (${makroSkoru.seviye})`);
            
            return {
                ekonomikGostergeler: this.ekonomikGostergeler,
                kureselPiyasalar: this.kureselPiyasalar,
                ekonomikTakvim: this.ekonomikTakvim,
                haberAnalizi: this.haberAnalizi,
                makroSkoru: makroSkoru
            };
            
        } catch (hata) {
            console.error('❌ Makro veri güncelleme hatası:', hata);
            return this.fallbackMakroVerileri();
        }
    }
    
    // ==========================================
    // FAİZ ORANLARI VE MERKEZ BANKASI VERİLERİ
    // ==========================================
    async faizOranlariCek() {
        try {
            // FRED API (Federal Reserve Economic Data) - Ücretsiz
            const fedFaizResponse = await fetch(
                'https://api.stlouisfed.org/fred/series/observations?series_id=FEDFUNDS&api_key=demo&file_type=json&limit=1&sort_order=desc'
            );
            
            if (fedFaizResponse.ok) {
                const fedData = await fedFaizResponse.json();
                const fedFaiz = fedData.observations?.[0]?.value;
                
                // Türkiye Merkez Bankası faizi (demo veri)
                const tcmbFaiz = this.demoTcmbFaizi();
                
                // ECB faizi (demo veri)
                const ecbFaiz = this.demoEcbFaizi();
                
                return {
                    faizOranlari: {
                        fed: parseFloat(fedFaiz) || 5.25,
                        tcmb: tcmbFaiz,
                        ecb: ecbFaiz,
                        sonGuncelleme: new Date()
                    }
                };
            } else {
                throw new Error('FRED API hatası');
            }
            
        } catch (hata) {
            console.warn('⚠️ Faiz oranları API hatası, demo veri kullanılıyor');
            return {
                faizOranlari: {
                    fed: 5.25,
                    tcmb: this.demoTcmbFaizi(),
                    ecb: 4.50,
                    sonGuncelleme: new Date()
                }
            };
        }
    }
    
    demoTcmbFaizi() {
        // Gerçekçi TCMB faizi simülasyonu
        const temelFaiz = 45.0;
        const volatilite = 2.0;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        const politikaEtkisi = Math.sin(Date.now() / 2592000000) * 5; // Aylık değişim
        
        return Math.max(25, Math.min(65, temelFaiz + rastgeleEtki + politikaEtkisi));
    }
    
    demoEcbFaizi() {
        // Gerçekçi ECB faizi simülasyonu
        const temelFaiz = 4.50;
        const volatilite = 0.25;
        const rastgeleEtki = (Math.random() - 0.5) * volatilite;
        
        return Math.max(3.5, Math.min(5.5, temelFaiz + rastgeleEtki));
    }
    
    // ==========================================
    // KÜRESEL PİYASA VERİLERİ
    // ==========================================
    async kureselPiyasaVerileriCek() {
        try {
            // Yahoo Finance API kullanarak küresel endeksler
            const endeksler = [
                '^GSPC',    // S&P 500
                '^IXIC',    // NASDAQ
                'DX-Y.NYB', // Dollar Index
                '^VIX',     // VIX
                'GC=F',     // Gold Futures
                'CL=F',     // Oil Futures
                '^TNX'      // 10-Year Treasury
            ];
            
            const piyasaVerileri = {};
            
            // Paralel API çağrıları
            const sonuclar = await Promise.allSettled(
                endeksler.map(sembol => this.yahooFinanceVeriCek(sembol))
            );
            
            // Sonuçları işle
            const [spx, nasdaq, dxy, vix, gold, oil, bonds] = sonuclar;
            
            return {
                spx500: spx.status === 'fulfilled' ? spx.value : this.demoSpx500(),
                nasdaq: nasdaq.status === 'fulfilled' ? nasdaq.value : this.demoNasdaq(),
                dxy: dxy.status === 'fulfilled' ? dxy.value : this.demoDxy(),
                vix: vix.status === 'fulfilled' ? vix.value : this.demoVix(),
                gold: gold.status === 'fulfilled' ? gold.value : this.demoGoldFutures(),
                oil: oil.status === 'fulfilled' ? oil.value : this.demoOilFutures(),
                bonds10y: bonds.status === 'fulfilled' ? bonds.value : this.demoBonds(),
                sonGuncelleme: new Date()
            };
            
        } catch (hata) {
            console.warn('⚠️ Küresel piyasa verileri hatası, demo veri kullanılıyor');
            return this.fallbackKureselPiyasaVerileri();
        }
    }
    
    async yahooFinanceVeriCek(sembol) {
        try {
            const response = await fetch(
                `https://query1.finance.yahoo.com/v8/finance/chart/${sembol}?interval=1d&range=1d`
            );
            
            if (!response.ok) throw new Error(`Yahoo Finance API hatası: ${response.status}`);
            
            const data = await response.json();
            const meta = data.chart?.result?.[0]?.meta;
            
            if (meta && meta.regularMarketPrice) {
                return {
                    fiyat: meta.regularMarketPrice,
                    değişim: meta.regularMarketChangePercent || 0,
                    hacim: meta.regularMarketVolume || 0,
                    sembol: sembol
                };
            } else {
                throw new Error('Veri bulunamadı');
            }
            
        } catch (hata) {
            throw new Error(`${sembol} verisi alınamadı: ${hata.message}`);
        }
    }
    
    // ==========================================
    // HABER ANALİZİ VE DUYGU ANALİZİ
    // ==========================================
    async haberAnaliziYap() {
        try {
            // NewsAPI ile finansal haberler (demo implementation)
            const haberler = await this.finansalHaberleriCek();
            const duyguAnalizi = this.haberDuyguAnalizi(haberler);
            
            return {
                pozitifHaberler: duyguAnalizi.pozitif,
                negatifHaberler: duyguAnalizi.negatif,
                nötralHaberler: duyguAnalizi.nötral,
                toplamDuyguSkoru: duyguAnalizi.toplamSkor,
                sonHaberler: haberler.slice(0, 5), // Son 5 haber
                sonGuncelleme: new Date()
            };
            
        } catch (hata) {
            console.warn('⚠️ Haber analizi hatası, demo veri kullanılıyor');
            return this.fallbackHaberAnalizi();
        }
    }
    
    async finansalHaberleriCek() {
        // Gerçek NewsAPI entegrasyonu burada olacak
        // Demo amaçlı simüle edilmiş haberler
        return [
            {
                başlık: "Fed faiz kararı açıklandı",
                özet: "Federal Reserve faiz oranlarını değiştirmeme kararı aldı",
                duygu: "nötral",
                önem: "yüksek",
                zaman: new Date()
            },
            {
                başlık: "Altın fiyatları yükselişte",
                özet: "Jeopolitik gerilimler altın talebini artırıyor", 
                duygu: "pozitif",
                önem: "orta",
                zaman: new Date()
            },
            {
                başlık: "Kripto para düzenlemeleri",
                özet: "Yeni düzenlemeler Bitcoin fiyatını etkileyebilir",
                duygu: "negatif", 
                önem: "yüksek",
                zaman: new Date()
            }
        ];
    }
    
    haberDuyguAnalizi(haberler) {
        let pozitif = 0;
        let negatif = 0;
        let nötral = 0;
        let toplamSkor = 0;
        
        haberler.forEach(haber => {
            switch(haber.duygu) {
                case 'pozitif':
                    pozitif++;
                    toplamSkor += (haber.önem === 'yüksek' ? 2 : 1);
                    break;
                case 'negatif':
                    negatif++;
                    toplamSkor -= (haber.önem === 'yüksek' ? 2 : 1);
                    break;
                default:
                    nötral++;
            }
        });
        
        return { pozitif, negatif, nötral, toplamSkor };
    }
    
    // ==========================================
    // JEOPOLİTİK RİSK ANALİZİ
    // ==========================================
    async jeopolitikRiskAnalizi() {
        try {
            // Basit jeopolitik risk skoru (0-100)
            // Gerçek uygulamada haber API'lerinden beslenecek
            
            const riskFaktörleri = [
                this.bölgeselGerilimRiski(),
                this.ekonomikSavaşRiski(), 
                this.enerjiGüvenliğiRiski(),
                this.parabirimSavaşıRiski()
            ];
            
            const ortalama = riskFaktörleri.reduce((a, b) => a + b, 0) / riskFaktörleri.length;
            
            return Math.min(100, Math.max(0, Math.round(ortalama)));
            
        } catch (hata) {
            console.warn('⚠️ Jeopolitik risk analizi hatası');
            return 35; // Orta seviye risk
        }
    }
    
    bölgeselGerilimRiski() {
        // Simüle edilmiş bölgesel gerilim riski
        const temelRisk = 30;
        const rastgeleEtki = Math.random() * 20;
        const mevsimselEtki = Math.sin(Date.now() / 7776000000) * 10; // 3 aylık cycle
        
        return Math.max(0, Math.min(100, temelRisk + rastgeleEtki + mevsimselEtki));
    }
    
    ekonomikSavaşRiski() {
        // Ticaret savaşları riski
        return 25 + (Math.random() * 30);
    }
    
    enerjiGüvenliğiRiski() {
        // Enerji güvenliği riski
        return 20 + (Math.random() * 40);
    }
    
    parabirimSavaşıRiski() {
        // Para birimi savaşları riski
        return 15 + (Math.random() * 25);
    }
    
    // ==========================================
    // EKONOMİK TAKVİM
    // ==========================================
    async ekonomikTakvimCek() {
        // Gerçek uygulamada ekonomik takvim API'si kullanılacak
        // Demo amaçlı simüle edilmiş etkinlikler
        
        const bugün = new Date();
        const yarın = new Date(bugün.getTime() + 24 * 60 * 60 * 1000);
        
        return {
            bugunEtkinlikler: [
                {
                    saat: '16:30',
                    ülke: 'ABD',
                    etkinlik: 'İşsizlik Maaşı Başvuruları',
                    önem: 'orta',
                    beklenen: '220K',
                    önceki: '215K'
                }
            ],
            gelecekEtkinlikler: [
                {
                    tarih: yarın,
                    saat: '20:30', 
                    ülke: 'ABD',
                    etkinlik: 'NFP (Tarım Dışı İstihdam)',
                    önem: 'yüksek',
                    beklenen: '185K',
                    önceki: '199K'
                }
            ],
            sonSonuclar: [
                {
                    etkinlik: 'TCMB Faiz Kararı',
                    sonuç: '45.00%',
                    beklenen: '45.00%',
                    etki: 'nötral'
                }
            ]
        };
    }
    
    // ==========================================
    // MAKRO SKORU HESAPLAMA
    // ==========================================
    makroSkoruHesapla() {
        let skor = 50; // Nötral başlangıç
        
        // Faiz oranları etkisi
        if (this.ekonomikGostergeler.faizOranlari) {
            const faizTrendi = this.faizTrendiAnalizi();
            skor += faizTrendi * 5;
        }
        
        // Küresel piyasa etkisi
        if (this.kureselPiyasalar.spx500) {
            const piyasaTrendi = this.kureselPiyasalar.spx500.değişim || 0;
            skor += piyasaTrendi;
        }
        
        // VIX (korku endeksi) etkisi
        if (this.kureselPiyasalar.vix) {
            const vixSeviyesi = this.kureselPiyasalar.vix.fiyat || 20;
            if (vixSeviyesi > 30) skor -= 10; // Yüksek korku
            else if (vixSeviyesi < 15) skor += 5; // Düşük korku
        }
        
        // Haber duygu analizi etkisi
        skor += this.haberAnalizi.toplamDuyguSkoru * 2;
        
        // Jeopolitik risk etkisi
        const jeopolitikEtki = (this.ekonomikGostergeler.jeopolitikRisk || 35) / 100;
        skor -= jeopolitikEtki * 15;
        
        // Skor sınırları (0-100)
        skor = Math.max(0, Math.min(100, Math.round(skor)));
        
        // Seviye belirleme
        let seviye = 'NÖTRAL';
        if (skor > 70) seviye = 'ÇOK POZİTİF';
        else if (skor > 60) seviye = 'POZİTİF';
        else if (skor < 30) seviye = 'ÇOK NEGATİF';
        else if (skor < 40) seviye = 'NEGATİF';
        
        return { skor, seviye };
    }
    
    faizTrendiAnalizi() {
        // Basit faiz trendi analizi (-1: düşüş, 0: sabit, +1: yükseliş)
        if (!this.ekonomikGostergeler.faizOranlari) return 0;
        
        const fed = this.ekonomikGostergeler.faizOranlari.fed;
        const tcmb = this.ekonomikGostergeler.faizOranlari.tcmb;
        
        // Karşılaştırmalı faiz analizi
        if (tcmb > fed * 8) return -1; // Yüksek faiz spreadi, TL için negatif
        if (tcmb < fed * 6) return 1;  // Düşük faiz spreadi, TL için pozitif
        return 0;
    }
    
    // ==========================================
    // FALLBACK VERİLERİ
    // ==========================================
    fallbackMakroVerileri() {
        return {
            ekonomikGostergeler: {
                faizOranlari: { fed: 5.25, tcmb: 45.0, ecb: 4.50 },
                jeopolitikRisk: 35
            },
            kureselPiyasalar: this.fallbackKureselPiyasaVerileri(),
            haberAnalizi: this.fallbackHaberAnalizi(),
            makroSkoru: { skor: 50, seviye: 'NÖTRAL' }
        };
    }
    
    fallbackKureselPiyasaVerileri() {
        return {
            spx500: { fiyat: 4500, değişim: 0.5 },
            nasdaq: { fiyat: 14000, değişim: 0.8 },
            dxy: { fiyat: 104.5, değişim: -0.2 },
            vix: { fiyat: 18.5, değişim: -2.1 },
            gold: { fiyat: 2050, değişim: 0.3 },
            oil: { fiyat: 75.2, değişim: 1.2 },
            bonds10y: { fiyat: 4.25, değişim: 0.1 }
        };
    }
    
    fallbackHaberAnalizi() {
        return {
            pozitifHaberler: 2,
            negatifHaberler: 1,
            nötralHaberler: 3,
            toplamDuyguSkoru: 1
        };
    }
    
    // Demo veriler için yardımcı fonksiyonlar
    demoSpx500() { return { fiyat: 4500 + (Math.random() - 0.5) * 100, değişim: (Math.random() - 0.5) * 4 }; }
    demoNasdaq() { return { fiyat: 14000 + (Math.random() - 0.5) * 500, değişim: (Math.random() - 0.5) * 6 }; }
    demoDxy() { return { fiyat: 104.5 + (Math.random() - 0.5) * 2, değişim: (Math.random() - 0.5) * 1 }; }
    demoVix() { return { fiyat: 18.5 + (Math.random() - 0.5) * 8, değişim: (Math.random() - 0.5) * 10 }; }
    demoGoldFutures() { return { fiyat: 2050 + (Math.random() - 0.5) * 50, değişim: (Math.random() - 0.5) * 3 }; }
    demoOilFutures() { return { fiyat: 75.2 + (Math.random() - 0.5) * 10, değişim: (Math.random() - 0.5) * 5 }; }
    demoBonds() { return { fiyat: 4.25 + (Math.random() - 0.5) * 0.5, değişim: (Math.random() - 0.5) * 0.2 }; }
}