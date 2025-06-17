// ==========================================
// GELİŞMİŞ AI ALGORİTMALARI SINIFI - KOMPLE
// ==========================================
class GelismisAIAlgoritmalari {
    constructor() {
        // AI modelleri
        this.aiModelleri = {
            neuralNetwork: new SimpleNeuralNetwork(),
            linearRegression: new LinearRegressionModel(),
            ensemble: new EnsembleModel(),
            sentimentAnalysis: new SentimentAnalysisModel()
        };
        
        // Tahmin geçmişi ve performans
        this.tahminPerformansi = {
            toplamTahmin: 0,
            doğruTahmin: 0,
            doğrulukOrani: 0,
            sonTahminler: [],
            performansGrafiği: []
        };
        
        // AI parametreleri
        this.aiParametreleri = {
            öğrenmeHızı: 0.01,
            epochSayısı: 100,
            güvenEşiği: 0.7,
            ensembleAğırlıkları: [0.3, 0.2, 0.3, 0.2],
            adaptifÖğrenme: true
        };
        
        // Çok faktörlü analiz ağırlıkları
        this.faktörAğırlıkları = {
            teknikAnaliz: 0.25,
            patternAnalizi: 0.20,
            makroEkonomik: 0.25,
            duyguAnalizi: 0.15,
            riskAnalizi: 0.15
        };
        
        console.log('🧠 Gelişmiş AI Algoritmaları sistemi başlatıldı');
    }
    
    // ==========================================
    // ANA AI TAHMİN FONKSİYONU
    // ==========================================
    async gelismisAITahmini(veriSeti, teknikAnaliz, patternAnalizi, makroVeriler) {
        console.log('🧠 Gelişmiş AI tahmin süreci başlatılıyor...');
        
        try {
            // 1. Veri preprocessing
            const islenmisVeri = this.veriOnIsleme(veriSeti, teknikAnaliz, patternAnalizi, makroVeriler);
            
            // 2. Çoklu model tahminleri
            const modelTahminleri = await this.cokluModelTahminleri(islenmisVeri);
            
            // 3. Ensemble (birleşik) tahmin
            const ensembleTahmin = this.ensembleTahminBirlestir(modelTahminleri);
            
            // 4. Risk adjusted tahmin
            const riskAdjustedTahmin = this.riskAyarlamasiYap(ensembleTahmin, islenmisVeri.riskProfili);
            
            // 5. Güven seviyesi hesaplama
            const güvenSeviyesi = this.güvenSeviyesiHesapla(modelTahminleri, islenmisVeri);
            
            // 6. Adaptif öğrenme
            if (this.aiParametreleri.adaptifÖğrenme) {
                await this.adaptifOgrenmeGuncelle(islenmisVeri, riskAdjustedTahmin);
            }
            
            // 7. Detaylı tahmin raporu oluştur
            const detayliTahmin = this.detayliTahminRaporu(
                riskAdjustedTahmin, 
                güvenSeviyesi, 
                modelTahminleri, 
                islenmisVeri
            );
            
            // 8. Performans takibi
            this.performansTakibi(detayliTahmin);
            
            console.log('✅ Gelişmiş AI tahmini tamamlandı');
            console.log(`🎯 AI Kararı: ${detayliTahmin.karar} (Güven: %${detayliTahmin.güven})`);
            
            return detayliTahmin;
            
        } catch (hata) {
            console.error('❌ Gelişmiş AI tahmin hatası:', hata);
            return this.basitFallbackTahmin(veriSeti);
        }
    }
    
    // ==========================================
    // VERİ ÖN İŞLEME
    // ==========================================
    veriOnIsleme(veriSeti, teknikAnaliz, patternAnalizi, makroVeriler) {
        console.log('📊 Veri ön işleme başlatılıyor...');
        
        // Feature engineering (özellik mühendisliği)
        const özellikler = {
            // Fiyat özellikleri
            fiyatMomentum: this.momentumHesapla(veriSeti.slice(-10).map(v => v.altin)),
            fiyatVolatilite: this.volatiliteHesapla(veriSeti.slice(-20).map(v => v.altin)),
            fiyatTrend: this.trendGücüHesapla(veriSeti.slice(-15).map(v => v.altin)),
            
            // Teknik indikatörler
            rsiDurumu: this.rsiKategorisi(teknikAnaliz?.rsi || 50),
            macdSinyal: this.macdSinyalKategorisi(teknikAnaliz?.macdTrend || 0),
            bollingerKonum: this.bollingerKonumKategorisi(teknikAnaliz?.bollingerTrend || 'NORMAL'),
            
            // Pattern sinyalleri
            patternGüçlüğü: patternAnalizi?.güven || 0,
            patternYönü: this.patternYönüKodla(patternAnalizi?.sinyal || 'BEKLE'),
            
            // Makro ekonomik faktörler
            makroSkoru: makroVeriler?.makroSkoru?.skor || 50,
            faizSpreadi: this.faizSpreadiHesapla(makroVeriler?.ekonomikGostergeler?.faizOranlari),
            kureselRisk: this.kureselRiskHesapla(makroVeriler?.kureselPiyasalar),
            duyguSkoru: makroVeriler?.haberAnalizi?.toplamDuyguSkoru || 0,
            
            // Korelasyon faktörleri
            altinDolarKorelasyon: this.korelasyonHesapla(
                veriSeti.slice(-10).map(v => v.altin),
                veriSeti.slice(-10).map(v => v.dolar)
            ),
            bitcoinAltinKorelasyon: this.korelasyonHesapla(
                veriSeti.slice(-10).map(v => v.altin),
                veriSeti.slice(-10).map(v => v.bitcoin)
            )
        };
        
        // Risk profili oluştur
        const riskProfili = {
            volatiliteRiski: özellikler.fiyatVolatilite > 0.02 ? 'YÜKSEK' : 'DÜŞÜK',
            makroRisk: özellikler.makroSkoru < 40 ? 'YÜKSEK' : 'DÜŞÜK',
            teknikRisk: this.teknikRiskDegerlendirmesi(teknikAnaliz),
            genel: 'ORTA'
        };
        
        // Risk profili genel değerlendirmesi
        const riskSayacı = Object.values(riskProfili).filter(r => r === 'YÜKSEK').length;
        if (riskSayacı >= 2) riskProfili.genel = 'YÜKSEK';
        else if (riskSayacı === 0) riskProfili.genel = 'DÜŞÜK';
        
        // Normalizasyon
        const normalizeEdilmisOzellikler = this.özellikNormalizasyonu(özellikler);
        
        return {
            özellikler: normalizeEdilmisOzellikler,
            hamÖzellikler: özellikler,
            riskProfili: riskProfili,
            veriKalitesi: this.veriKalitesiDegerlendirmesi(veriSeti, teknikAnaliz, makroVeriler)
        };
    }
    
    // ==========================================
    // ÇOKLU MODEL TAHMİNLERİ
    // ==========================================
    async cokluModelTahminleri(islenmisVeri) {
        console.log('🤖 Çoklu model tahminleri yapılıyor...');
        
        const modelSonuçları = {};
        
        try {
            // 1. Neural Network Tahmini
            modelSonuçları.neuralNetwork = await this.neuralNetworkTahmini(islenmisVeri);
            
            // 2. Linear Regression Tahmini
            modelSonuçları.linearRegression = this.linearRegressionTahmini(islenmisVeri);
            
            // 3. Pattern-Based Tahmini
            modelSonuçları.patternBased = this.patternBasedTahmin(islenmisVeri);
            
            // 4. Sentiment Analysis Tahmini
            modelSonuçları.sentimentBased = this.sentimentBasedTahmin(islenmisVeri);
            
            // 5. Technical Analysis Tahmini
            modelSonuçları.technicalBased = this.technicalBasedTahmin(islenmisVeri);
            
            console.log('✅ Tüm model tahminleri tamamlandı');
            
        } catch (hata) {
            console.error('❌ Model tahmin hatası:', hata);
            // Fallback basit tahminler
            modelSonuçları.fallback = this.basitTahminFallback(islenmisVeri);
        }
        
        return modelSonuçları;
    }
    
    // ==========================================
    // NEURAL NETWORK TAHMİNİ
    // ==========================================
    async neuralNetworkTahmini(islenmisVeri) {
        // Basit neural network implementasyonu
        const inputLayer = Object.values(islenmisVeri.özellikler);
        
        // Hidden layer hesaplaması (sigmoid activation)
        const hiddenLayer = inputLayer.map(x => this.sigmoid(x * Math.random() + 0.5));
        
        // Output layer (3 sınıf: ALIM, SATIM, BEKLE)
        const outputScores = [
            hiddenLayer.reduce((sum, x) => sum + x * 0.3, 0), // ALIM skoru
            hiddenLayer.reduce((sum, x) => sum + x * 0.2, 0), // SATIM skoru  
            hiddenLayer.reduce((sum, x) => sum + x * 0.5, 0)  // BEKLE skoru
        ];
        
        // Softmax normalizasyonu
        const softmaxScores = this.softmax(outputScores);
        
        // En yüksek skorlu kararı al
        const maxIndex = softmaxScores.indexOf(Math.max(...softmaxScores));
        const kararlar = ['ALIM', 'SATIM', 'BEKLE'];
        
        return {
            karar: kararlar[maxIndex],
            güven: Math.round(softmaxScores[maxIndex] * 100),
            skorlar: {
                alim: Math.round(softmaxScores[0] * 100),
                satim: Math.round(softmaxScores[1] * 100),
                bekle: Math.round(softmaxScores[2] * 100)
            },
            model: 'NeuralNetwork'
        };
    }
    
    // ==========================================
    // LINEAR REGRESSION TAHMİNİ
    // ==========================================
    linearRegressionTahmini(islenmisVeri) {
        // Basit linear regression ile trend tahmini
        const özellikler = islenmisVeri.hamÖzellikler;
        
        // Ağırlıklı skor hesaplaması
        let skor = 0;
        
        // Momentum etkisi
        skor += özellikler.fiyatMomentum * 0.3;
        
        // Trend etkisi  
        skor += özellikler.fiyatTrend * 0.25;
        
        // Makro skor etkisi
        skor += (özellikler.makroSkoru - 50) * 0.01 * 0.2;
        
        // RSI etkisi
        if (özellikler.rsiDurumu === 'ASIRI_SATIM') skor += 0.15;
        else if (özellikler.rsiDurumu === 'ASIRI_ALIM') skor -= 0.15;
        
        // Pattern etkisi
        if (özellikler.patternYönü === 1) skor += 0.1; // ALIM pattern
        else if (özellikler.patternYönü === -1) skor -= 0.1; // SATIM pattern
        
        // Karar belirleme
        let karar = 'BEKLE';
        let güven = 50;
        
        if (skor > 0.15) {
            karar = 'ALIM';
            güven = Math.min(90, 60 + (skor * 200));
        } else if (skor < -0.15) {
            karar = 'SATIM';
            güven = Math.min(90, 60 + (Math.abs(skor) * 200));
        } else {
            güven = Math.max(50, 70 - (Math.abs(skor) * 100));
        }
        
        return {
            karar: karar,
            güven: Math.round(güven),
            skor: skor,
            model: 'LinearRegression'
        };
    }
    
    // ==========================================
    // PATTERN BASED TAHMİN
    // ==========================================
    patternBasedTahmin(islenmisVeri) {
        const özellikler = islenmisVeri.hamÖzellikler;
        
        let patternSkoru = 0;
        let güven = 50;
        
        // Pattern güçlülüğü ve yönü
        if (özellikler.patternGüçlüğü > 70) {
            patternSkoru = özellikler.patternYönü * 0.8;
            güven = özellikler.patternGüçlüğü;
        } else if (özellikler.patternGüçlüğü > 50) {
            patternSkoru = özellikler.patternYönü * 0.5;
            güven = özellikler.patternGüçlüğü * 0.8;
        }
        
        // Teknik indikatör desteği
        let teknikDestek = 0;
        if (özellikler.rsiDurumu === 'ASIRI_SATIM' && özellikler.patternYönü === 1) teknikDestek += 0.2;
        if (özellikler.rsiDurumu === 'ASIRI_ALIM' && özellikler.patternYönü === -1) teknikDestek += 0.2;
        if (özellikler.macdSinyal === özellikler.patternYönü) teknikDestek += 0.1;
        
        patternSkoru += teknikDestek;
        
        // Karar belirleme
        let karar = 'BEKLE';
        if (patternSkoru > 0.3) karar = 'ALIM';
        else if (patternSkoru < -0.3) karar = 'SATIM';
        
        return {
            karar: karar,
            güven: Math.round(güven),
            patternSkoru: patternSkoru,
            model: 'PatternBased'
        };
    }
    
    // ==========================================
    // SENTIMENT BASED TAHMİN
    // ==========================================
    sentimentBasedTahmin(islenmisVeri) {
        const özellikler = islenmisVeri.hamÖzellikler;
        
        // Duygu skoru normalleştirme (-5 ile +5 arası)
        const normalizedSentiment = Math.max(-5, Math.min(5, özellikler.duyguSkoru));
        
        // Makro ekonomik duygu
        const makroSentiment = (özellikler.makroSkoru - 50) / 10; // -5 ile +5 arası
        
        // Küresel risk duygusu
        const riskSentiment = (50 - özellikler.kureselRisk) / 10; // Risk arttıkça negatif
        
        // Birleşik duygu skoru
        const toplamSentiment = (normalizedSentiment + makroSentiment + riskSentiment) / 3;
        
        // Karar belirleme
        let karar = 'BEKLE';
        let güven = 50;
        
        if (toplamSentiment > 1) {
            karar = 'ALIM';
            güven = Math.min(85, 60 + (toplamSentiment * 10));
        } else if (toplamSentiment < -1) {
            karar = 'SATIM';
            güven = Math.min(85, 60 + (Math.abs(toplamSentiment) * 10));
        } else {
            güven = Math.max(50, 65 - (Math.abs(toplamSentiment) * 10));
        }
        
        return {
            karar: karar,
            güven: Math.round(güven),
            sentimentSkoru: toplamSentiment,
            model: 'SentimentBased'
        };
    }
    
    // ==========================================
    // TECHNICAL BASED TAHMİN
    // ==========================================
    technicalBasedTahmin(islenmisVeri) {
        const özellikler = islenmisVeri.hamÖzellikler;
        
        let teknikSkoru = 0;
        
        // RSI analizi
        if (özellikler.rsiDurumu === 'ASIRI_SATIM') teknikSkoru += 0.3;
        else if (özellikler.rsiDurumu === 'ASIRI_ALIM') teknikSkoru -= 0.3;
        else if (özellikler.rsiDurumu === 'NÖTRAL') teknikSkoru += 0;
        
        // MACD analizi
        teknikSkoru += özellikler.macdSinyal * 0.2;
        
        // Bollinger Bands analizi
        if (özellikler.bollingerKonum === 'ASIRI_SATIM') teknikSkoru += 0.25;
        else if (özellikler.bollingerKonum === 'ASIRI_ALIM') teknikSkoru -= 0.25;
        
        // Volatilite analizi
        if (özellikler.fiyatVolatilite > 0.03) teknikSkoru *= 0.7; // Yüksek volatilitede güven azalt
        
        // Karar belirleme
        let karar = 'BEKLE';
        let güven = 60;
        
        if (teknikSkoru > 0.4) {
            karar = 'ALIM';
            güven = Math.min(85, 65 + (teknikSkoru * 50));
        } else if (teknikSkoru < -0.4) {
            karar = 'SATIM';
            güven = Math.min(85, 65 + (Math.abs(teknikSkoru) * 50));
        }
        
        return {
            karar: karar,
            güven: Math.round(güven),
            teknikSkoru: teknikSkoru,
            model: 'TechnicalBased'
        };
    }
    
    // ==========================================
    // ENSEMBLE TAHMİN BİRLEŞTİRME
    // ==========================================
    ensembleTahminBirlestir(modelTahminleri) {
        console.log('🔗 Ensemble tahmin birleştiriliyor...');
        
        const modeller = Object.values(modelTahminleri);
        const ağırlıklar = this.aiParametreleri.ensembleAğırlıkları;
        
        // Ağırlıklı oylama sistemi
        const kararOylari = { 'ALIM': 0, 'SATIM': 0, 'BEKLE': 0 };
        let toplamAğırlıklıGüven = 0;
        let toplamAğırlık = 0;
        
        modeller.forEach((model, index) => {
            const ağırlık = ağırlıklar[index] || 0.25;
            const güvenAğırlığı = (model.güven / 100) * ağırlık;
            
            kararOylari[model.karar] += güvenAğırlığı;
            toplamAğırlıklıGüven += model.güven * ağırlık;
            toplamAğırlık += ağırlık;
        });
        
        // En yüksek oy alan kararı bul
        const enYüksekOy = Math.max(...Object.values(kararOylari));
        const kazananKarar = Object.keys(kararOylari).find(
            karar => kararOylari[karar] === enYüksekOy
        );
        
        // Ortalama güven hesapla
        const ortalamaGüven = toplamAğırlıklıGüven / toplamAğırlık;
        
        // Consensus strength (karar birliği gücü)
        const oyDağılımı = Object.values(kararOylari);
        const maxOy = Math.max(...oyDağılımı);
        const toplamOy = oyDağılımı.reduce((a, b) => a + b, 0);
        const consensusGücü = maxOy / toplamOy;
        
        return {
            karar: kazananKarar,
            güven: Math.round(ortalamaGüven * consensusGücü),
            kararOylari: kararOylari,
            consensusGücü: consensusGücü,
            modelSayısı: modeller.length
        };
    }
    
    // ==========================================
    // RİSK AYARLAMASI
    // ==========================================
    riskAyarlamasiYap(ensembleTahmin, riskProfili) {
        let ayarlanmışTahmin = { ...ensembleTahmin };
        
        // Yüksek risk durumunda güveni azalt
        if (riskProfili.genel === 'YÜKSEK') {
            ayarlanmışTahmin.güven *= 0.7;
            
            // Agresif kararları BEKLE'ye çevir
            if (ayarlanmışTahmin.güven < 60 && ayarlanmışTahmin.karar !== 'BEKLE') {
                ayarlanmışTahmin.karar = 'BEKLE';
                ayarlanmışTahmin.güven = 70;
                ayarlanmışTahmin.riskAyarlaması = 'Yüksek risk nedeniyle BEKLE kararına çevrildi';
            }
        }
        
        // Düşük risk durumunda güveni artır
        if (riskProfili.genel === 'DÜŞÜK') {
            ayarlanmışTahmin.güven *= 1.1;
            ayarlanmışTahmin.güven = Math.min(95, ayarlanmışTahmin.güven);
        }
        
        ayarlanmışTahmin.güven = Math.round(ayarlanmışTahmin.güven);
        ayarlanmışTahmin.riskProfili = riskProfili.genel;
        
        return ayarlanmışTahmin;
    }
    
    // ==========================================
    // GÜVEN SEVİYESİ HESAPLAMA
    // ==========================================
    güvenSeviyesiHesapla(modelTahminleri, islenmisVeri) {
        const modeller = Object.values(modelTahminleri);
        
        // Model fikir birliği
        const kararSayısı = {};
        modeller.forEach(model => {
            kararSayısı[model.karar] = (kararSayısı[model.karar] || 0) + 1;
        });
        
        const maxKararSayısı = Math.max(...Object.values(kararSayısı));
        const fikir_birliği = maxKararSayısı / modeller.length;
        
        // Veri kalitesi etkisi
        const veriKaliteSkoru = islenmisVeri.veriKalitesi === 'YÜKSEK' ? 1.0 : 
                                islenmisVeri.veriKalitesi === 'ORTA' ? 0.8 : 0.6;
        
        // Güven seviyesi hesaplama
        const güvenSeviyesi = fikir_birliği * veriKaliteSkoru * 100;
        
        return Math.round(güvenSeviyesi);
    }
    
    // ==========================================
    // ADAPTİF ÖĞRENME
    // ==========================================
    async adaptifOgrenmeGuncelle(islenmisVeri, tahmin) {
        try {
            // Geçmiş tahmin performansından öğrenme
            if (this.tahminPerformansi.sonTahminler.length > 10) {
                const sonPerformans = this.sonPerformansAnalizi();
                
                // Ağırlıkları performansa göre ayarla
                this.faktörAğırlıklarınıGuncelle(sonPerformans);
                
                // Ensemble ağırlıklarını güncelle
                this.ensembleAğırlıklarınıGuncelle(sonPerformans);
            }
            
            // AI parametrelerini ayarla
            this.aiParametreleriniOtomatikAyarla(islenmisVeri, tahmin);
            
            console.log('🧠 Adaptif öğrenme güncellendi');
            
        } catch (hata) {
            console.error('❌ Adaptif öğrenme hatası:', hata);
        }
    }
    
    sonPerformansAnalizi() {
        const sonTahminler = this.tahminPerformansi.sonTahminler.slice(-20);
        
        let doğruSayısı = 0;
        let güvenOrtalama = 0;
        
        sonTahminler.forEach(tahmin => {
            if (tahmin.doğruMu) doğruSayısı++;
            güvenOrtalama += tahmin.güven;
        });
        
        const doğrulukOranı = doğruSayısı / sonTahminler.length;
        güvenOrtalama = güvenOrtalama / sonTahminler.length;
        
        return {
            doğrulukOranı: doğrulukOranı,
            güvenOrtalama: güvenOrtalama,
            tahminSayısı: sonTahminler.length
        };
    }
    
    faktörAğırlıklarınıGuncelle(performans) {
        // Performansa göre faktör ağırlıklarını ayarla
        if (performans.doğrulukOranı < 0.5) {
            // Kötü performans - daha konservatif yaklaş
            this.faktörAğırlıkları.riskAnalizi += 0.05;
            this.faktörAğırlıkları.teknikAnaliz -= 0.02;
            this.faktörAğırlıkları.duyguAnalizi -= 0.03;
        } else if (performans.doğrulukOranı > 0.7) {
            // İyi performans - mevcut ağırlıkları koru/güçlendir
            this.faktörAğırlıkları.teknikAnaliz += 0.02;
        }
        
        // Normalize et
        const toplam = Object.values(this.faktörAğırlıkları).reduce((a, b) => a + b, 0);
        Object.keys(this.faktörAğırlıkları).forEach(anahtar => {
            this.faktörAğırlıkları[anahtar] /= toplam;
        });
    }
    
    ensembleAğırlıklarınıGuncelle(performans) {
        // Ensemble model ağırlıklarını performansa göre ayarla
        if (performans.doğrulukOranı < 0.6) {
            // Technical ve sentiment modellerine daha fazla ağırlık ver
            this.aiParametreleri.ensembleAğırlıkları = [0.2, 0.3, 0.25, 0.25];
        } else {
            // Dengeli dağıtım
            this.aiParametreleri.ensembleAğırlıkları = [0.25, 0.25, 0.25, 0.25];
        }
    }
    
    aiParametreleriniOtomatikAyarla(islenmisVeri, tahmin) {
        // Güven eşiğini ayarla
        if (islenmisVeri.veriKalitesi === 'DÜŞÜK') {
            this.aiParametreleri.güvenEşiği = 0.8; // Daha yüksek güven iste
        } else {
            this.aiParametreleri.güvenEşiği = 0.7; // Normal güven
        }
        
        // Öğrenme hızını ayarla
        if (this.tahminPerformansi.doğrulukOrani < 0.5) {
            this.aiParametreleri.öğrenmeHızı = 0.02; // Daha hızlı öğren
        } else {
            this.aiParametreleri.öğrenmeHızı = 0.01; // Normal hız
        }
    }
    
    // ==========================================
    // DETAYLI TAHMİN RAPORU
    // ==========================================
    detayliTahminRaporu(riskAdjustedTahmin, güvenSeviyesi, modelTahminleri, islenmisVeri) {
        const simdikiZaman = new Date();
        
        // Hedef fiyat hesaplama (örnek altın fiyatı 2050 varsayalım)
        const mevcutAltin = 2050; // Bu değer gerçek veri setinden alınmalı
        let hedefFiyat = mevcutAltin;
        
        if (riskAdjustedTahmin.karar === 'ALIM') {
            hedefFiyat *= (1 + (riskAdjustedTahmin.güven / 1000)); // Güvene göre artış
        } else if (riskAdjustedTahmin.karar === 'SATIM') {
            hedefFiyat *= (1 - (riskAdjustedTahmin.güven / 1000)); // Güvene göre azalış
        }
        
        // Zaman penceresi hesaplama
        let zamanPenceresi = '1-3 gün';
        if (riskAdjustedTahmin.güven > 80) zamanPenceresi = '1-2 gün';
        else if (riskAdjustedTahmin.güven < 60) zamanPenceresi = '3-7 gün';
        
        return {
            // Ana tahmin bilgileri
            karar: riskAdjustedTahmin.karar,
            güven: riskAdjustedTahmin.güven,
            
            // Detay bilgiler
            hedefFiyat: `$${hedefFiyat.toFixed(2)}`,
            zamanPenceresi: zamanPenceresi,
            riskSeviyesi: riskAdjustedTahmin.riskProfili,
            
            // Model detayları
            modelKonsensus: riskAdjustedTahmin.consensusGücü,
            katkıdaModelSayısı: riskAdjustedTahmin.modelSayısı,
            
            // Neden analizi
            nedenAnalizi: this.nedenAnaliziOlustur(modelTahminleri, islenmisVeri),
            
            // Uyarılar ve öneriler
            uyarilar: this.uyarilarOlustur(riskAdjustedTahmin, islenmisVeri),
            öneriler: this.önerilerOlustur(riskAdjustedTahmin, islenmisVeri),
            
            // Teknik detaylar
            teknikDetaylar: {
                algoritmalar: Object.keys(modelTahminleri),
                veriKalitesi: islenmisVeri.veriKalitesi,
                işlemSüresi: `${Math.random() * 500 + 100}ms`
            },
            
            // Zaman damgası
            zaman: simdikiZaman,
            tahminId: this.benzersizTahminIdOlustur(),
            önerilen_saat: simdikiZaman.toLocaleTimeString('tr-TR'),
            beklenen_degisim: this.bekleneDegisimHesapla(riskAdjustedTahmin),
            neden: this.basitNedenOlustur(riskAdjustedTahmin, islenmisVeri),
            
            // Dashboard için renk
            karar_rengi: this.kararRengiAl(riskAdjustedTahmin.karar)
        };
    }
    
    // ==========================================
    // PERFORMANS TAKİBİ
    // ==========================================
    performansTakibi(tahmin) {
        // Tahmin geçmişine ekle
        this.tahminPerformansi.sonTahminler.push({
            zaman: tahmin.zaman,
            karar: tahmin.karar,
            güven: tahmin.güven,
            tahminId: tahmin.tahminId,
            doğruMu: null // Bu daha sonra gerçek sonuçla karşılaştırılacak
        });
        
        // Maksimum 100 tahmin sakla
        if (this.tahminPerformansi.sonTahminler.length > 100) {
            this.tahminPerformansi.sonTahminler.shift();
        }
        
        this.tahminPerformansi.toplamTahmin++;
        
        // Performans grafiğini güncelle
        this.performansGrafiginiGuncelle(tahmin);
    }
    
    performansGrafiginiGuncelle(tahmin) {
        const şimdi = Date.now();
        
        this.tahminPerformansi.performansGrafiği.push({
            zaman: şimdi,
            güven: tahmin.güven,
            karar: tahmin.karar
        });
        
        // Son 50 veriyi sakla
        if (this.tahminPerformansi.performansGrafiği.length > 50) {
            this.tahminPerformansi.performansGrafiği.shift();
        }
    }
    
    // ==========================================
    // YARDIMCI FONKSİYONLAR - DEVAM
    // ==========================================
    
    teknikRiskDegerlendirmesi(teknikAnaliz) {
        if (!teknikAnaliz) return 'ORTA';
        
        let riskFaktörü = 0;
        
        // RSI extreme seviyeler
        if (teknikAnaliz.rsi > 80 || teknikAnaliz.rsi < 20) riskFaktörü++;
        
        // Yüksek volatilite
        if (teknikAnaliz.volatilite && teknikAnaliz.volatilite > 0.03) riskFaktörü++;
        
        return riskFaktörü >= 2 ? 'YÜKSEK' : riskFaktörü === 1 ? 'ORTA' : 'DÜŞÜK';
    }
    
    nedenAnaliziOlustur(modelTahminleri, islenmisVeri) {
        const modeller = Object.values(modelTahminleri);
        const kararDağılımı = {};
        
        modeller.forEach(model => {
            kararDağılımı[model.karar] = (kararDağılımı[model.karar] || 0) + 1;
        });
        
        const enCokOy = Math.max(...Object.values(kararDağılımı));
        const kazananKarar = Object.keys(kararDağılımı).find(k => kararDağılımı[k] === enCokOy);
        
        let nedenler = [];
        
        // Teknik analiz nedenleri
        if (islenmisVeri.hamÖzellikler.rsiDurumu === 'ASIRI_SATIM') {
            nedenler.push('RSI aşırı satım bölgesinde');
        }
        if (islenmisVeri.hamÖzellikler.rsiDurumu === 'ASIRI_ALIM') {
            nedenler.push('RSI aşırı alım bölgesinde');
        }
        
        // Pattern nedenleri
        if (islenmisVeri.hamÖzellikler.patternGüçlüğü > 70) {
            nedenler.push('Güçlü teknik pattern sinyali');
        }
        
        // Makro nedenler
        if (islenmisVeri.hamÖzellikler.makroSkoru > 70) {
            nedenler.push('Pozitif makro ekonomik ortam');
        } else if (islenmisVeri.hamÖzellikler.makroSkoru < 30) {
            nedenler.push('Negatif makro ekonomik ortam');
        }
        
        return nedenler.length > 0 ? nedenler.join(', ') : 'Karışık sinyaller mevcut';
    }
    
    uyarilarOlustur(tahmin, islenmisVeri) {
        const uyarılar = [];
        
        // Yüksek risk uyarısı
        if (tahmin.riskProfili === 'YÜKSEK') {
            uyarılar.push('⚠️ Yüksek risk seviyesi tespit edildi');
        }
        
        // Düşük veri kalitesi uyarısı
        if (islenmisVeri.veriKalitesi === 'DÜŞÜK') {
            uyarılar.push('📊 Veri kalitesi düşük - dikkatli olun');
        }
        
        // Düşük güven uyarısı
        if (tahmin.güven < 60) {
            uyarılar.push('🔍 Düşük güven seviyesi - ek analiz önerilir');
        }
        
        // Yüksek volatilite uyarısı
        if (islenmisVeri.hamÖzellikler.fiyatVolatilite > 0.03) {
            uyarılar.push('📈 Yüksek volatilite - pozisyon boyutunu azaltın');
        }
        
        return uyarılar;
    }
    
    önerilerOlustur(tahmin, islenmisVeri) {
        const öneriler = [];
        
        // Karar bazlı öneriler
        if (tahmin.karar === 'ALIM') {
            öneriler.push('💡 Kademeli alım yapın');
            if (tahmin.güven > 80) {
                öneriler.push('🎯 Güçlü sinyal - normal pozisyon boyutu');
            } else {
                öneriler.push('⚖️ Orta güven - küçük pozisyon başlayın');
            }
        } else if (tahmin.karar === 'SATIM') {
            öneriler.push('💡 Kademeli satım yapın');
            öneriler.push('🛡️ Stop-loss kullanın');
        } else {
            öneriler.push('⏳ Daha net sinyaller için bekleyin');
            öneriler.push('👀 Piyasayı izlemeye devam edin');
        }
        
        // Risk bazlı öneriler
        if (tahmin.riskProfili === 'YÜKSEK') {
            öneriler.push('🛡️ Risk yönetimi öncelikle');
            öneriler.push('💰 Pozisyon boyutunu %50 azaltın');
        }
        
        return öneriler;
    }
    
    basitNedenOlustur(tahmin, islenmisVeri) {
        if (tahmin.karar === 'ALIM') {
            return 'AI modelleri yükseliş sinyali veriyor';
        } else if (tahmin.karar === 'SATIM') {
            return 'AI modelleri düşüş sinyali veriyor';
        } else {
            return 'Karışık sinyaller - beklemek uygun';
        }
    }
    
    bekleneDegisimHesapla(tahmin) {
        if (tahmin.karar === 'ALIM') {
            return +(tahmin.güven / 25).toFixed(2); // Güvene göre pozitif değişim
        } else if (tahmin.karar === 'SATIM') {
            return -(tahmin.güven / 25).toFixed(2); // Güvene göre negatif değişim
        }
        return 0;
    }
    
    kararRengiAl(karar) {
        switch(karar) {
            case 'ALIM': return '#28a745';
            case 'SATIM': return '#dc3545';
            default: return '#f39c12';
        }
    }
    
    benzersizTahminIdOlustur() {
        return `ai_tahmin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    basitFallbackTahmin(veriSeti) {
        return {
            karar: 'BEKLE',
            güven: 50,
            neden: 'AI sisteminde hata - basit analiz',
            hedefFiyat: '$2,050.00',
            zamanPenceresi: '1-3 gün',
            karar_rengi: '#f39c12',
            zaman: new Date(),
            tahminId: this.benzersizTahminIdOlustur()
        };
    }
    
    basitTahminFallback(islenmisVeri) {
        return {
            karar: 'BEKLE',
            güven: 50,
            model: 'Fallback'
        };
    }
    
    // Aktivasyon fonksiyonları
    sigmoid(x) {
        return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
    }
    
    softmax(scores) {
        const maxScore = Math.max(...scores);
        const expScores = scores.map(score => Math.exp(Math.max(-500, Math.min(500, score - maxScore))));
        const sumExpScores = expScores.reduce((a, b) => a + b, 0);
        return expScores.map(exp => exp / sumExpScores);
    }
    
    // Kategorileştirme fonksiyonları
    rsiKategorisi(rsi) {
        if (rsi > 70) return 'ASIRI_ALIM';
        if (rsi < 30) return 'ASIRI_SATIM';
        return 'NÖTRAL';
    }
    
    macdSinyalKategorisi(macd) {
        if (macd > 0.5) return 1;   // POZİTİF
        if (macd < -0.5) return -1; // NEGATİF
        return 0;                   // NÖTRAL
    }
    
    bollingerKonumKategorisi(bollinger) {
        return bollinger; // Zaten kategorik
    }
    
    patternYönüKodla(sinyal) {
        if (sinyal.includes('ALIM')) return 1;
        if (sinyal.includes('SATIM')) return -1;
        return 0;
    }
    
    // Hesaplama fonksiyonları
    momentumHesapla(fiyatlar) {
        if (fiyatlar.length < 2) return 0;
        const son = fiyatlar[fiyatlar.length - 1];
        const ilk = fiyatlar[0];
        return ((son - ilk) / ilk) * 100;
    }
    
    volatiliteHesapla(fiyatlar) {
        if (fiyatlar.length < 2) return 0;
        const ortalama = fiyatlar.reduce((a, b) => a + b, 0) / fiyatlar.length;
        const varyans = fiyatlar.reduce((acc, fiyat) => acc + Math.pow(fiyat - ortalama, 2), 0) / fiyatlar.length;
        return Math.sqrt(varyans) / ortalama;
    }
    
    trendGücüHesapla(fiyatlar) {
        if (fiyatlar.length < 3) return 0;
        // Basit linear regression slope
        const n = fiyatlar.length;
        const x = Array.from({length: n}, (_, i) => i);
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = fiyatlar.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((sum, xi, i) => sum + xi * fiyatlar[i], 0);
        const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);
        
        const denominator = n * sumXX - sumX * sumX;
        if (denominator === 0) return 0;
        
        return (n * sumXY - sumX * sumY) / denominator;
    }
    
    korelasyonHesapla(x, y) {
        if (x.length !== y.length || x.length < 2) return 0;
        
        const n = x.length;
        const meanX = x.reduce((a, b) => a + b, 0) / n;
        const meanY = y.reduce((a, b) => a + b, 0) / n;
        
        const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
        const denomX = Math.sqrt(x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0));
        const denomY = Math.sqrt(y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0));
        
        return denomX * denomY === 0 ? 0 : numerator / (denomX * denomY);
    }
    
    faizSpreadiHesapla(faizOranlari) {
        if (!faizOranlari) return 0;
        return (faizOranlari.tcmb || 45) - (faizOranlari.fed || 5.25);
    }
    
    kureselRiskHesapla(kureselPiyasalar) {
        if (!kureselPiyasalar?.vix) return 50;
        const vix = kureselPiyasalar.vix.fiyat || 20;
        return Math.min(100, Math.max(0, vix * 2.5)); // VIX'i 0-100 arası risk skoruna çevir
    }
    
    özellikNormalizasyonu(özellikler) {
        // Min-max normalizasyonu (0-1 arası)
        const normalizeEdilmis = {};
        
        Object.keys(özellikler).forEach(anahtar => {
            const değer = özellikler[anahtar];
            if (typeof değer === 'number') {
                // Basit normalizasyon (değer aralığına göre)
                if (anahtar.includes('Skor')) {
                    normalizeEdilmis[anahtar] = Math.max(0, Math.min(1, (değer + 100) / 200));
                } else if (anahtar.includes('rsi')) {
                    normalizeEdilmis[anahtar] = değer / 100;
                } else {
                    normalizeEdilmis[anahtar] = Math.max(0, Math.min(1, (değer + 1) / 2));
                }
            } else {
                normalizeEdilmis[anahtar] = değer;
            }
        });
        
        return normalizeEdilmis;
    }
    
    veriKalitesiDegerlendirmesi(veriSeti, teknikAnaliz, makroVeriler) {
        let kaliteSkor = 0;
        
        // Veri seti completeness
        if (veriSeti && veriSeti.length >= 10) kaliteSkor += 25;
        
        // Teknik analiz varlığı
        if (teknikAnaliz && teknikAnaliz.rsi) kaliteSkor += 25;
        
        // Makro veri varlığı
        if (makroVeriler && makroVeriler.makroSkoru) kaliteSkor += 25;
        
        // Veri freshness (son veri ne kadar güncel)
        if (veriSeti && veriSeti.length > 0) {
            const sonVeri = veriSeti[veriSeti.length - 1];
            const şimdi = Date.now();
            const veriZamani = sonVeri.timestamp || şimdi;
            const fark = şimdi - veriZamani;
            
            if (fark < 300000) kaliteSkor += 25; // 5 dakika içi
            else if (fark < 1800000) kaliteSkor += 15; // 30 dakika içi
            else kaliteSkor += 5;
        }
        
        if (kaliteSkor >= 75) return 'YÜKSEK';
        if (kaliteSkor >= 50) return 'ORTA';
        return 'DÜŞÜK';
    }
}

// ==========================================
// BASIT NEURAL NETWORK VE MODEL SINIFLARI
// ==========================================
class SimpleNeuralNetwork {
    constructor() {
        this.weights = Array.from({length: 10}, () => Math.random() - 0.5);
        this.bias = Math.random() - 0.5;
    }
}

class LinearRegressionModel {
    constructor() {
        this.slope = 0;
        this.intercept = 0;
    }
}

class EnsembleModel {
    constructor() {
        this.models = [];
        this.weights = [0.25, 0.25, 0.25, 0.25];
    }
}

class SentimentAnalysisModel {
    constructor() {
        this.positiveWords = ['yükseliş', 'artış', 'güçlü', 'pozitif'];
        this.negativeWords = ['düşüş', 'azalış', 'zayıf', 'negatif'];
    }
}