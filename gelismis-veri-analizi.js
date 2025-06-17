// ==========================================
// GELİŞMİŞ VERİ SAKLAMA SİSTEMİ
// ==========================================
class GelismisVeriAnalizi {
    constructor() {
        // Çoklu zaman dilimi veri saklama
        this.veriZamanDilimleri = {
            '5dakika': [],     // Son 5 dakika (12 veri × 5dk = 1 saat)
            '30dakika': [],    // Son 30 dakika (48 veri × 30dk = 24 saat)  
            '1saat': [],       // Son 1 saat (24 veri × 1sa = 1 gün)
            '4saat': [],       // Son 4 saat (42 veri × 4sa = 1 hafta)
            '1gun': [],        // Son 1 gün (30 veri × 1gn = 1 ay)
            '1hafta': []       // Son 1 hafta (12 veri × 1hf = 3 ay)
        };
        
        // Her varlık için ayrı historik veri
        this.historikVeriler = {
            altin: { kisa: [], orta: [], uzun: [] },
            dolar: { kisa: [], orta: [], uzun: [] },
            bitcoin: { kisa: [], orta: [], uzun: [] },
            borsa: { kisa: [], orta: [], uzun: [] },
            ethereum: { kisa: [], orta: [], uzun: [] }
        };
        
        // İstatistiksel metrikler
        this.istatistikler = {
            hareketliOrtalamalar: {},
            standartSapmalar: {},
            korelasyonlar: {},
            trendGüçleri: {}
        };
    }
    
    // ==========================================
    // VERİ KAYDETME - ÇOK SEVİYELİ
    // ==========================================
    veriKaydetCokSeviyeli(yeniVeri) {
        const simdikiZaman = Date.now();
        
        // Her zaman dilimine kaydet
        Object.keys(this.veriZamanDilimleri).forEach(zamanDilimi => {
            this.veriZamanDilimleri[zamanDilimi].push({
                ...yeniVeri,
                zamanDilimi: zamanDilimi,
                kayitZamani: simdikiZaman
            });
            
            // Maksimum veri sınırları
            const maksimumlar = {
                '5dakika': 72,    // 6 saat veri
                '30dakika': 48,   // 24 saat veri
                '1saat': 168,     // 1 hafta veri
                '4saat': 168,     // 4 hafta veri
                '1gun': 90,       // 3 ay veri
                '1hafta': 52      // 1 yıl veri
            };
            
            if (this.veriZamanDilimleri[zamanDilimi].length > maksimumlar[zamanDilimi]) {
                this.veriZamanDilimleri[zamanDilimi].shift();
            }
        });
        
        // Historik verilere de kaydet
        this.historikVerilereKaydet(yeniVeri);
        
        console.log('📊 Çok seviyeli veri kaydedildi');
    }
    
    historikVerilereKaydet(veriSeti) {
        ['altin', 'dolar', 'bitcoin', 'borsa', 'ethereum'].forEach(varlık => {
            if (veriSeti[varlık]) {
                const veriNoktasi = {
                    fiyat: veriSeti[varlık],
                    zaman: veriSeti.zaman,
                    timestamp: veriSeti.timestamp
                };
                
                // Kısa vade (son 24 saat)
                this.historikVeriler[varlık].kisa.push(veriNoktasi);
                if (this.historikVeriler[varlık].kisa.length > 48) {
                    this.historikVeriler[varlık].kisa.shift();
                }
                
                // Orta vade (son 1 hafta) - her saat bir kayıt
                if (this.historikVeriler[varlık].kisa.length % 2 === 0) {
                    this.historikVeriler[varlık].orta.push(veriNoktasi);
                    if (this.historikVeriler[varlık].orta.length > 168) {
                        this.historikVeriler[varlık].orta.shift();
                    }
                }
                
                // Uzun vade (son 3 ay) - günlük kayıt
                if (this.historikVeriler[varlık].orta.length % 24 === 0) {
                    this.historikVeriler[varlık].uzun.push(veriNoktasi);
                    if (this.historikVeriler[varlık].uzun.length > 90) {
                        this.historikVeriler[varlık].uzun.shift();
                    }
                }
            }
        });
    }
    
    // ==========================================
    // GELİŞMİŞ TREND ANALİZİ
    // ==========================================
    gelismisTrendAnalizi(varlık, zamanDilimi = 'orta') {
        const veriler = this.historikVeriler[varlık][zamanDilimi];
        if (veriler.length < 10) return null;
        
        const fiyatlar = veriler.map(v => v.fiyat);
        
        // 1. Basit Trend (Linear Regression)
        const basitTrend = this.linearRegression(fiyatlar);
        
        // 2. Hareketli Ortalama Trendi
        const ema12 = this.exponentialMovingAverage(fiyatlar, 12);
        const ema26 = this.exponentialMovingAverage(fiyatlar, 26);
        const macdTrend = ema12[ema12.length - 1] - ema26[ema26.length - 1];
        
        // 3. Momentum Trendi
        const momentum = this.momentumHesapla(fiyatlar, 10);
        
        // 4. RSI Trendi
        const rsi = this.rsiHesapla(fiyatlar, 14);
        
        // 5. Bollinger Bands Trendi
        const bollinger = this.bollingerBands(fiyatlar, 20, 2);
        const bbTrend = this.bollingerTrendAnalizi(fiyatlar[fiyatlar.length - 1], bollinger);
        
        return {
            basitTrend: basitTrend.slope,
            macdTrend: macdTrend,
            momentum: momentum,
            rsi: rsi,
            bollingerTrend: bbTrend,
            güçlüTrend: this.trendGücüHesapla(basitTrend.rSquared),
            genel: this.genelTrendBelirle([basitTrend.slope, macdTrend, momentum])
        };
    }
    
    // ==========================================
    // TEKNİK İNDİKATÖRLER
    // ==========================================
    exponentialMovingAverage(fiyatlar, period) {
        const k = 2 / (period + 1);
        const ema = [fiyatlar[0]];
        
        for (let i = 1; i < fiyatlar.length; i++) {
            ema.push(fiyatlar[i] * k + ema[i - 1] * (1 - k));
        }
        
        return ema;
    }
    
    rsiHesapla(fiyatlar, period = 14) {
        if (fiyatlar.length < period + 1) return 50;
        
        let gains = 0;
        let losses = 0;
        
        // İlk period için ortalama hesapla
        for (let i = 1; i <= period; i++) {
            const change = fiyatlar[i] - fiyatlar[i - 1];
            if (change > 0) {
                gains += change;
            } else {
                losses += Math.abs(change);
            }
        }
        
        let avgGain = gains / period;
        let avgLoss = losses / period;
        
        // Geri kalan veriler için RSI hesapla
        for (let i = period + 1; i < fiyatlar.length; i++) {
            const change = fiyatlar[i] - fiyatlar[i - 1];
            
            if (change > 0) {
                avgGain = (avgGain * (period - 1) + change) / period;
                avgLoss = (avgLoss * (period - 1)) / period;
            } else {
                avgGain = (avgGain * (period - 1)) / period;
                avgLoss = (avgLoss * (period - 1) + Math.abs(change)) / period;
            }
        }
        
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }
    
    bollingerBands(fiyatlar, period = 20, multiplier = 2) {
        if (fiyatlar.length < period) return null;
        
        const sma = this.simpleMovingAverage(fiyatlar, period);
        const standardSapma = this.rollingStandardDeviation(fiyatlar, period);
        
        return {
            upper: sma + (standardSapma * multiplier),
            middle: sma,
            lower: sma - (standardSapma * multiplier)
        };
    }
    
    momentumHesapla(fiyatlar, period = 10) {
        if (fiyatlar.length < period) return 0;
        
        const son = fiyatlar[fiyatlar.length - 1];
        const eski = fiyatlar[fiyatlar.length - period];
        
        return ((son - eski) / eski) * 100;
    }
    
    linearRegression(fiyatlar) {
        const n = fiyatlar.length;
        const x = Array.from({length: n}, (_, i) => i);
        const y = fiyatlar;
        
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
        const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // R-squared hesaplama
        const yMean = sumY / n;
        const totalVariation = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
        const predictedY = x.map(xi => slope * xi + intercept);
        const residualVariation = y.reduce((sum, yi, i) => sum + Math.pow(yi - predictedY[i], 2), 0);
        const rSquared = 1 - (residualVariation / totalVariation);
        
        return { slope, intercept, rSquared };
    }
    
    // ==========================================
    // YARDIMCI FONKSİYONLAR
    // ==========================================
    simpleMovingAverage(fiyatlar, period) {
        if (fiyatlar.length < period) return fiyatlar[fiyatlar.length - 1];
        
        const sonPeriod = fiyatlar.slice(-period);
        return sonPeriod.reduce((a, b) => a + b, 0) / period;
    }
    
    rollingStandardDeviation(fiyatlar, period) {
        if (fiyatlar.length < period) return 0;
        
        const sonPeriod = fiyatlar.slice(-period);
        const ortalama = this.simpleMovingAverage(sonPeriod, period);
        const varyans = sonPeriod.reduce((sum, fiyat) => sum + Math.pow(fiyat - ortalama, 2), 0) / period;
        
        return Math.sqrt(varyans);
    }
    
    trendGücüHesapla(rSquared) {
        if (rSquared > 0.8) return 'GÜÇLÜ';
        if (rSquared > 0.5) return 'ORTA';
        if (rSquared > 0.2) return 'ZAYIF';
        return 'YOK';
    }
    
    genelTrendBelirle(trendler) {
        const pozitifSayisi = trendler.filter(t => t > 0).length;
        const negatifSayisi = trendler.filter(t => t < 0).length;
        
        if (pozitifSayisi > negatifSayisi) return 'YUKSELİŞ';
        if (negatifSayisi > pozitifSayisi) return 'DÜŞÜŞ';
        return 'YATAY';
    }
    
    bollingerTrendAnalizi(mevcutFiyat, bollinger) {
        if (!bollinger) return 'NORMAL';
        
        if (mevcutFiyat > bollinger.upper) return 'ASIRI_ALIM';
        if (mevcutFiyat < bollinger.lower) return 'ASIRI_SATIM';
        if (mevcutFiyat > bollinger.middle) return 'YUKARI_BAND';
        return 'AŞAĞI_BAND';
    }
}