// ==========================================
// ENTEGRE FİNANSAL SİSTEM - FINAL VERSİYON
// ==========================================

// Ana sistem sınıfımızı güncelliyoruz
class NakitFinansalSistem {
    constructor() {
        // ... mevcut constructor kodları ...
        
        // ✅ YENİ: Gelişmiş AI bileşenlerini ekle
        this.gelismisVeriAnalizi = new GelismisVeriAnalizi();
        this.patternTanima = new PatternTanima();
        this.makroEkonomikVeriler = new MakroEkonomikVeriler();
        this.gelismisAI = new GelismisAIAlgoritmalari();
        
        console.log('🧠 Gelişmiş AI sistemi entegre edildi');
    }
    
    // ==========================================
    // YENİ: GELİŞMİŞ VERİ KAYDETME
    // ==========================================
    async veriKaydet(veriSeti) {
        try {
            // 1. Eski veri kaydetme mantığı
            await this.eskiVeriKaydetmeMetodu(veriSeti);
            
            // 2. ✅ YENİ: Gelişmiş çok seviyeli veri kaydetme
            this.gelismisVeriAnalizi.veriKaydetCokSeviyeli(veriSeti);
            
            console.log('✅ Veri hem basit hem gelişmiş sistemde kaydedildi');
            
        } catch (hata) {
            console.error('❌ Gelişmiş veri kaydetme hatası:', hata);
            throw hata;
        }
    }
    
    // ==========================================
    // YENİ: GELİŞMİŞ AI TAHMİN SİSTEMİ
    // ==========================================
    async aiTahminBaslat() {
        console.log('🤖 Gelişmiş AI tahmin sistemi başlatılıyor...');
        
        this.timers.tahminMotoru = setInterval(async () => {
            try {
                if (this.sistemDurumu.aktif && this.veriGecmisi.length > 10) {
                    // 1. Teknik analizi al
                    const teknikAnaliz = this.gelismisVeriAnalizi.gelismisTrendAnalizi('altin', 'orta');
                    
                    // 2. Pattern analizini yap
                    const patternAnalizi = this.patternTanima.patternAnalizi(
                        this.veriGecmisi.slice(-20), 
                        this.gelismisVeriAnalizi.historikVeriler.altin.orta
                    );
                    
                    // 3. Makro ekonomik verileri güncelle
                    const makroVeriler = await this.makroEkonomikVeriler.makroVerileriGuncelle();
                    
                    // 4. ✅ GELİŞMİŞ AI TAHMİNİ YAP
                    const gelismisTahmin = await this.gelismisAI.gelismisAITahmini(
                        this.veriGecmisi,
                        teknikAnaliz,
                        patternAnalizi,
                        makroVeriler
                    );
                    
                    // 5. Dashboard'u güncelle
                    this.tahminDashboardGuncelle(gelismisTahmin);
                    
                    // 6. İstatistikleri güncelle
                    this.istatistikler.toplamTahminSayisi++;
                    
                    console.log(`🎯 Gelişmiş AI Tahmini: ${gelismisTahmin.karar} (Güven: %${gelismisTahmin.güven})`);
                }
            } catch (hata) {
                console.error('❌ Gelişmiş AI tahmin hatası:', hata);
                
                // Fallback: Basit tahmin sistemi kullan
                const basitTahmin = await this.basitAiTahminYap();
                this.tahminDashboardGuncelle(basitTahmin);
            }
        }, this.intervals.tahminMotoru);
    }
    
       // ==========================================
    // YENİ: MANUEL GELİŞMİŞ ANALİZ (DEVAM)
    // ==========================================
    async manuelGelismisAnaliz() {
        console.log('🔍 Manuel gelişmiş analiz başlatılıyor...');
        
        try {
            const baslangicZamani = performance.now();
            
            // 1. Gelişmiş teknik analiz
            const teknikAnaliz = this.gelismisVeriAnalizi.gelismisTrendAnalizi('altin', 'kisa');
            console.log('📊 Teknik Analiz:', teknikAnaliz);
            
            // 2. Pattern tanıma
            const patternSonucu = this.patternTanima.patternAnalizi(
                this.veriGecmisi.slice(-15),
                this.gelismisVeriAnalizi.historikVeriler.altin.kisa
            );
            console.log('🔍 Pattern Analizi:', patternSonucu);
            
            // 3. Makro ekonomik analiz
            const makroAnaliz = await this.makroEkonomikVeriler.makroVerileriGuncelle();
            console.log('🌐 Makro Analiz:', makroAnaliz.makroSkoru);
            
            // 4. Kapsamlı AI tahmini
            const aiTahmin = await this.gelismisAI.gelismisAITahmini(
                this.veriGecmisi,
                teknikAnaliz,
                patternSonucu,
                makroAnaliz
            );
            
            const islemSuresi = performance.now() - baslangicZamani;
            
            // Sonuçları konsola yazdır
            console.log('\n🎯 GELİŞMİŞ ANALİZ SONUÇLARI:');
            console.log('================================');
            console.log(`🤖 AI Kararı: ${aiTahmin.karar}`);
            console.log(`📈 Güven Seviyesi: %${aiTahmin.güven}`);
            console.log(`🎯 Hedef Fiyat: ${aiTahmin.hedefFiyat}`);
            console.log(`⏰ Zaman Penceresi: ${aiTahmin.zamanPenceresi}`);
            console.log(`🛡️ Risk Seviyesi: ${aiTahmin.riskSeviyesi}`);
            console.log(`🔍 Neden: ${aiTahmin.neden}`);
            console.log(`⚡ İşlem Süresi: ${islemSuresi.toFixed(2)}ms`);
            
            if (aiTahmin.uyarilar && aiTahmin.uyarilar.length > 0) {
                console.log(`⚠️ Uyarılar: ${aiTahmin.uyarilar.join(', ')}`);
            }
            
            if (aiTahmin.öneriler && aiTahmin.öneriler.length > 0) {
                console.log(`💡 Öneriler: ${aiTahmin.öneriler.join(', ')}`);
            }
            
            console.log('================================\n');
            
            // Dashboard güncelle
            this.tahminDashboardGuncelle(aiTahmin);
            
            // Bildirim gönder
            this.bildirimGonder(`Gelişmiş analiz tamamlandı: ${aiTahmin.karar} (%${aiTahmin.güven})`, 'info');
            
            return {
                teknikAnaliz,
                patternSonucu,
                makroAnaliz,
                aiTahmin,
                islemSuresi: islemSuresi.toFixed(2)
            };
            
        } catch (hata) {
            console.error('❌ Manuel gelişmiş analiz hatası:', hata);
            this.bildirimGonder(`Gelişmiş analiz hatası: ${hata.message}`, 'error');
            throw hata;
        }
    }
    
    // ==========================================
    // YENİ: GELİŞMİŞ RİSK ANALİZİ
    // ==========================================
    async riskAnaliziYap() {
        try {
            // 1. Eski basit risk analizi
            const basitRisk = await this.basitRiskAnalizi();
            
            // 2. ✅ YENİ: Gelişmiş çok faktörlü risk analizi
            const gelismisRisk = await this.gelismisRiskAnalizi();
            
            // 3. Risk skorlarını birleştir
            const birlesikRisk = this.riskSkorlarınıBirlestir(basitRisk, gelismisRisk);
            
            // 4. Risk dashboard'unu güncelle
            this.riskDashboardGuncelle(birlesikRisk);
            
            return birlesikRisk;
            
        } catch (hata) {
            console.error('❌ Gelişmiş risk analizi hatası:', hata);
        }
    }
    
    async gelismisRiskAnalizi() {
        // Makro ekonomik risk faktörleri
        const makroVeriler = await this.makroEkonomikVeriler.makroVerileriGuncelle();
        
        // Teknik risk faktörleri
        const teknikRisk = this.gelismisVeriAnalizi.gelismisTrendAnalizi('altin', 'kisa');
        
        // Pattern bazlı risk
        const patternRisk = this.patternTanima.patternAnalizi(
            this.veriGecmisi.slice(-10),
            this.gelismisVeriAnalizi.historikVeriler.altin.kisa
        );
        
        // Genel risk skoru hesaplama
        let riskSkoru = 0;
        
        // Makro ekonomik risk etkisi (40%)
        const makroRiskEtkisi = this.makroRiskHesapla(makroVeriler);
        riskSkoru += makroRiskEtkisi * 0.4;
        
        // Teknik risk etkisi (30%)
        const teknikRiskEtkisi = this.teknikRiskHesapla(teknikRisk);
        riskSkoru += teknikRiskEtkisi * 0.3;
        
        // Pattern risk etkisi (20%)
        const patternRiskEtkisi = this.patternRiskHesapla(patternRisk);
        riskSkoru += patternRiskEtkisi * 0.2;
        
        // Volatilite risk etkisi (10%)
        const volatiliteRisk = this.volatiliteRiskHesapla();
        riskSkoru += volatiliteRisk * 0.1;
        
        // Risk seviyesi belirleme
        let riskSeviyesi = 'DÜŞÜK';
        if (riskSkoru > 70) riskSeviyesi = 'YÜKSEK';
        else if (riskSkoru > 40) riskSeviyesi = 'ORTA';
        
        return {
            riskSkoru: Math.round(riskSkoru),
            seviye: riskSeviyesi,
            detaylar: {
                makroRisk: makroRiskEtkisi,
                teknikRisk: teknikRiskEtkisi,
                patternRisk: patternRiskEtkisi,
                volatiliteRisk: volatiliteRisk
            },
            onerileriEylem: this.riskOnerileriOlustur(riskSkoru)
        };
    }
    
    makroRiskHesapla(makroVeriler) {
        let risk = 0;
        
        if (makroVeriler.ekonomikGostergeler?.jeopolitikRisk) {
            risk += makroVeriler.ekonomikGostergeler.jeopolitikRisk * 0.5;
        }
        
        if (makroVeriler.kureselPiyasalar?.vix) {
            const vixRisk = Math.min(100, makroVeriler.kureselPiyasalar.vix.fiyat * 2.5);
            risk += vixRisk * 0.3;
        }
        
        if (makroVeriler.haberAnalizi?.toplamDuyguSkoru < -3) {
            risk += 20; // Negatif haberler risk artırır
        }
        
        return Math.min(100, risk);
    }
    
    teknikRiskHesapla(teknikAnaliz) {
        if (!teknikAnaliz) return 50;
        
        let risk = 0;
        
        // RSI extreme seviyeleri
        if (teknikAnaliz.rsi > 80 || teknikAnaliz.rsi < 20) {
            risk += 30;
        }
        
        // Volatilite riski
        if (teknikAnaliz.volatilite && teknikAnaliz.volatilite > 0.03) {
            risk += 25;
        }
        
        // Trend güçsüzlüğü riski
        if (teknikAnaliz.güçlüTrend === 'ZAYIF' || teknikAnaliz.güçlüTrend === 'YOK') {
            risk += 20;
        }
        
        return Math.min(100, risk);
    }
    
    patternRiskHesapla(patternAnalizi) {
        if (!patternAnalizi || patternAnalizi.genel === 'PATTERN_YOK') {
            return 40; // Pattern yoksa orta risk
        }
        
        // Güçlü pattern düşük risk
        if (patternAnalizi.güven > 80) {
            return 20;
        }
        
        // Zayıf pattern yüksek risk
        if (patternAnalizi.güven < 50) {
            return 70;
        }
        
        return 50; // Orta seviye pattern
    }
    
    volatiliteRiskHesapla() {
        const sonVeriler = this.veriGecmisi.slice(-20);
        if (sonVeriler.length < 10) return 50;
        
        const fiyatlar = sonVeriler.map(v => v.altin);
        const volatilite = this.gelismisAI.volatiliteHesapla(fiyatlar);
        
        // Volatiliteyi risk skoruna çevir
        return Math.min(100, volatilite * 2000); // Ölçeklendirme
    }
    
    riskSkorlarınıBirlestir(basitRisk, gelismisRisk) {
        // Ağırlıklı ortalama (60% gelişmiş, 40% basit)
        const birlesikSkor = (gelismisRisk.riskSkoru * 0.6) + (basitRisk.riskSkoru * 0.4);
        
        return {
            ...this.riskFaktorleri,
            riskSkoru: Math.round(birlesikSkor),
            seviye: gelismisRisk.seviye,
            detaylar: gelismisRisk.detaylar,
            önerileriEylem: gelismisRisk.onerileriEylem,
            analizTipi: 'GELISMIS_HIBRIT'
        };
    }
    
    riskOnerileriOlustur(riskSkoru) {
        const öneriler = [];
        
        if (riskSkoru > 70) {
            öneriler.push('🛡️ Pozisyonları %50 azaltın');
            öneriler.push('💰 Nakit ağırlığını artırın');
            öneriler.push('⏰ Daha sık monitoring yapın');
        } else if (riskSkoru > 40) {
            öneriler.push('⚖️ Dengeli pozisyon alın');
            öneriler.push('🎯 Stop-loss kullanın');
        } else {
            öneriler.push('📈 Normal pozisyon alabilirsiniz');
            öneriler.push('🎯 Fırsatları değerlendirin');
        }
        
        return öneriler;
    }
    
    // ==========================================
    // YENİ: KAPSAMLI DASHBOARD GÜNCELLEMELERİ
    // ==========================================
    tahminDashboardGuncelle(tahmin) {
        try {
            if (!tahmin) return;
            
            // 1. Eski basit dashboard güncelleme
            this.basitTahminDashboardGuncelle(tahmin);
            
            // 2. ✅ YENİ: Gelişmiş dashboard güncellemeleri
            this.gelismisTahminDashboardGuncelle(tahmin);
            
        } catch (hata) {
            console.error('❌ Dashboard güncelleme hatası:', hata);
        }
    }
    
    gelismisTahminDashboardGuncelle(tahmin) {
        // Ana AI karar kartı
        const tahminKarar = document.getElementById('tahminKarar');
        if (tahminKarar) {
            tahminKarar.innerHTML = `
                <div class="ai-karar-kart">
                    <i class="fas fa-brain"></i>
                    <div class="karar-detay">
                        <div class="karar-baslik">Gelişmiş AI Önerisi</div>
                        <div class="karar-icerik" style="color: ${tahmin.karar_rengi}">
                            ${tahmin.karar}
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Güven göstergesi
        this.güvenGostergesiniGuncelle(tahmin.güven);
        
        // Hedef fiyat
        this.elementGuncelle('hedefFiyat', tahmin.hedefFiyat);
        
        // Zaman penceresi
        this.elementGuncelle('zamanPenceresi', tahmin.zamanPenceresi);
        
        // Risk seviyesi
        this.riskSeviyesiGuncelle(tahmin.riskSeviyesi);
        
        // Detaylı bilgiler
        if (tahmin.nedenAnalizi) {
            this.elementGuncelle('nedenAnalizi', tahmin.nedenAnalizi);
        }
        
        // Uyarılar
        if (tahmin.uyarilar && tahmin.uyarilar.length > 0) {
            this.uyarilarıGoster(tahmin.uyarilar);
        }
        
        // Öneriler
        if (tahmin.öneriler && tahmin.öneriler.length > 0) {
            this.onerileriGoster(tahmin.öneriler);
        }
        
        // Model konsensus bilgisi
        if (tahmin.modelKonsensus) {
            this.modelKonsensusGuncelle(tahmin.modelKonsensus, tahmin.katkıdaModelSayısı);
        }
        
        // Son güncelleme zamanı
        this.elementGuncelle('sonTahminZamani', new Date().toLocaleTimeString('tr-TR'));
    }
    
    güvenGostergesiniGuncelle(güven) {
        const güvenProgress = document.getElementById('güvenProgress');
        const güvenValue = document.getElementById('güvenValue');
        const güvenSeviye = document.getElementById('güvenSeviye');
        
        if (güvenProgress) {
            güvenProgress.style.width = `${güven}%`;
            
            // Renk belirleme
            let renk = '#dc3545'; // Kırmızı (düşük güven)
            if (güven > 70) renk = '#28a745'; // Yeşil (yüksek güven)
            else if (güven > 50) renk = '#ffc107'; // Sarı (orta güven)
            
            güvenProgress.style.backgroundColor = renk;
        }
        
        if (güvenValue) {
            güvenValue.textContent = `${güven}%`;
        }
        
        if (güvenSeviye) {
            let seviye = 'DÜŞÜK';
            if (güven > 80) seviye = 'ÇOK YÜKSEK';
            else if (güven > 70) seviye = 'YÜKSEK';
            else if (güven > 50) seviye = 'ORTA';
            
            güvenSeviye.textContent = `${seviye} Güven`;
            güvenSeviye.className = `güven-seviye ${seviye.toLowerCase().replace(' ', '-')}`;
        }
    }
    
    riskSeviyesiGuncelle(riskSeviyesi) {
        const riskElement = document.getElementById('riskSeviyesi');
        if (riskElement) {
            riskElement.textContent = riskSeviyesi;
            riskElement.className = `risk-seviye ${riskSeviyesi.toLowerCase()}`;
            
            // Renk belirleme
            const renkler = {
                'DÜŞÜK': '#28a745',
                'ORTA': '#ffc107',
                'YÜKSEK': '#dc3545'
            };
            
            riskElement.style.color = renkler[riskSeviyesi] || '#6c757d';
        }
    }
    
    uyarilarıGoster(uyarilar) {
        const uyariContainer = document.getElementById('uyariContainer');
        if (uyariContainer && uyarilar.length > 0) {
            const uyariHTML = uyarilar.map(uyari => 
                `<div class="uyari-item">${uyari}</div>`
            ).join('');
            
            uyariContainer.innerHTML = `
                <div class="uyari-baslik">⚠️ Önemli Uyarılar</div>
                ${uyariHTML}
            `;
            uyariContainer.style.display = 'block';
        }
    }
    
    onerileriGoster(öneriler) {
        const öneriContainer = document.getElementById('öneriContainer');
        if (öneriContainer && öneriler.length > 0) {
            const öneriHTML = öneriler.map(öneri => 
                `<div class="öneri-item">${öneri}</div>`
            ).join('');
            
            öneriContainer.innerHTML = `
                <div class="öneri-baslik">💡 Akıllı Öneriler</div>
                ${öneriHTML}
            `;
            öneriContainer.style.display = 'block';
        }
    }
    
    modelKonsensusGuncelle(konsensus, modelSayısı) {
        const konsensusElement = document.getElementById('modelKonsensus');
        if (konsensusElement) {
            const konsensusYüzde = Math.round(konsensus * 100);
            konsensusElement.innerHTML = `
                <div class="konsensus-bilgi">
                    <span class="konsensus-değer">${konsensusYüzde}%</span>
                    <span class="konsensus-açıklama">Model Birliği (${modelSayısı} model)</span>
                </div>
            `;
            
            // Konsensus çubuğu
            const konsensusBar = document.getElementById('konsensusBar');
            if (konsensusBar) {
                konsensusBar.style.width = `${konsensusYüzde}%`;
                
                // Renk belirleme
                let renk = '#dc3545'; // Düşük konsensus
                if (konsensusYüzde > 80) renk = '#28a745'; // Yüksek konsensus
                else if (konsensusYüzde > 60) renk = '#ffc107'; // Orta konsensus
                
                konsensusBar.style.backgroundColor = renk;
            }
        }
    }
    
    // ==========================================
    // YENİ: PERFORMANS İZLEME VE RAPORLAMA
    // ==========================================
    async performansRaporuOlustur() {
        console.log('📊 Gelişmiş performans raporu oluşturuluyor...');
        
        try {
            // AI performans metrikleri
            const aiPerformans = this.gelismisAI.tahminPerformansi;
            
            // Sistem performans metrikleri
            const sistemPerformans = this.performans;
            
            // Makro ekonomik etki analizi
            const makroEtki = await this.makroEtkiAnalizi();
            
            const rapor = {
                genel: {
                    toplamÇalışmaSüresi: this.istatistikler.toplamCalismaSuresi,
                    toplamVeriSayısı: this.istatistikler.toplamVeriSayisi,
                    toplamTahminSayısı: this.istatistikler.toplamTahminSayisi,
                    sistemSağlığı: this.sistemDurumu.sistemSagligi
                },
                aiPerformans: {
                    doğrulukOranı: aiPerformans.doğrulukOrani,
                    sonTahminler: aiPerformans.sonTahminler.slice(-10),
                    ortalamaGüvenSeviyesi: this.ortalamaGüvenHesapla()
                },
                makroEtki: makroEtki,
                sistem: {
                    apiBasarım: this.networkMonitor.basariliIstekler / this.networkMonitor.toplamIstekler,
                    ortalamaYanıtSüresi: this.networkMonitor.ortalamaSure,
                    cacheVerimlilik: this.cacheVerimlilikHesapla()
                },
                öneriler: this.performansOnerileriOlustur()
            };
            
            console.log('📈 Performans Raporu:', rapor);
            return rapor;
            
        } catch (hata) {
            console.error('❌ Performans raporu hatası:', hata);
            return null;
        }
    }
    
    async makroEtkiAnalizi() {
        // Son makro verilerle tahmin performansı karşılaştırması
        const makroVeriler = await this.makroEkonomikVeriler.makroVerileriGuncelle();
        
        return {
            makroSkoru: makroVeriler.makroSkoru,
            jeopolitikRisk: makroVeriler.ekonomikGostergeler?.jeopolitikRisk || 0,
            küreselPiyasaDurumu: makroVeriler.kureselPiyasalar?.spx500?.değişim || 0,
            duyguAnalizi: makroVeriler.haberAnalizi?.toplamDuyguSkoru || 0
        };
    }
    
    ortalamaGüvenHesapla() {
        const sonTahminler = this.gelismisAI.tahminPerformansi.sonTahminler.slice(-20);
        if (sonTahminler.length === 0) return 0;
        
        const toplamGüven = sonTahminler.reduce((toplam, tahmin) => toplam + tahmin.güven, 0);
        return Math.round(toplamGüven / sonTahminler.length);
    }
    
    cacheVerimlilikHesapla() {
        const cacheHitRatio = this.cache.size > 0 ? 
            (this.networkMonitor.basariliIstekler / (this.networkMonitor.basariliIstekler + this.cache.size)) : 0;
        return Math.round(cacheHitRatio * 100);
    }
    
    performansOnerileriOlustur() {
        const öneriler = [];
        
        // AI performans önerileri
        if (this.gelismisAI.tahminPerformansi.doğrulukOrani < 0.6) {
            öneriler.push('🤖 AI model ağırlıklarını yeniden kalibre edin');
        }
        
        // Sistem performans önerileri
        if (this.networkMonitor.ortalamaSure > 1000) {
            öneriler.push('⚡ API yanıt sürelerini optimize edin');
        }
        
        // Cache önerileri
        if (this.cacheVerimlilikHesapla() < 70) {
            öneriler.push('💾 Cache stratejisini gözden geçirin');
        }
        
        return öneriler;
    }
}

// ==========================================
// YENİ GLOBAL FONKSİYONLAR
// ==========================================

// Gelişmiş analiz fonksiyonu
window.gelismisAnaliz = async function() {
    console.log('🔍 Gelişmiş analiz başlatılıyor...');
    return await window.nakitSistem.manuelGelismisAnaliz();
};

// Performans raporu fonksiyonu
window.performansRaporu = async function() {
    console.log('📊 Performans raporu oluşturuluyor...');
    return await window.nakitSistem.performansRaporuOlustur();
};

// Makro ekonomik veri güncelleme
window.makroGuncelle = async function() {
    console.log('🌐 Makro ekonomik veriler güncelleniyor...');
    return await window.nakitSistem.makroEkonomikVeriler.makroVerileriGuncelle();
};

// Pattern analizi fonksiyonu
window.patternAnalizi = function() {
    console.log('🔍 Pattern analizi yapılıyor...');
    const sonVeriler = window.nakitSistem.veriGecmisi.slice(-15);
    const historikVeriler = window.nakitSistem.gelismisVeriAnalizi.historikVeriler.altin.kisa;
    return window.nakitSistem.patternTanima.patternAnalizi(sonVeriler, historikVeriler);
};

// AI model performans kontrolü
window.aiPerformansKontrol = function() {
    console.log('🤖 AI performans kontrolü...');
    const performans = window.nakitSistem.gelismisAI.tahminPerformansi;
    
    console.log('📊 AI Performans Metrikleri:');
    console.log(`📈 Toplam Tahmin: ${performans.toplamTahmin}`);
    console.log(`✅ Doğru Tahmin: ${performans.doğruTahmin}`);
    console.log(`📊 Doğruluk Oranı: %${performans.doğrulukOrani}`);
    console.log(`🎯 Son Tahminler: ${performans.sonTahminler.length} adet`);
    
    return performans;
};

// Cache durumu kontrolü
window.cacheDurumu = function() {
    const sistem = window.nakitSistem;
    console.log('💾 Cache Durumu:');
    console.log(`📦 Cache Boyutu: ${sistem.cache.size}`);
    console.log(`⚡ Cache Verimi: %${sistem.cacheVerimlilikHesapla()}`);
    console.log(`🔄 Cache Maksimum: ${sistem.cacheConfig.maksimumBoyut}`);
    
    return {
        boyut: sistem.cache.size,
        maksimum: sistem.cacheConfig.maksimumBoyut,
        verimlilik: sistem.cacheVerimlilikHesapla()
    };
};

// Sistem sağlık kontrolü
window.sistemSaglik = function() {
    const sistem = window.nakitSistem;
    
    const sağlık = {
        sistem: sistem.sistemDurumu.sistemSagligi,
        network: sistem.networkMonitor.baglantiDurumu,
        veriToplamaAktif: sistem.sistemDurumu.veriToplamaAktif,
        aiAktif: sistem.gelismisAI ? true : false,
        toplamVeri: sistem.istatistikler.toplamVeriSayisi,
        toplamTahmin: sistem.istatistikler.toplamTahminSayisi,
        çalışmaSüresi: sistem.istatistikler.toplamCalismaSuresi
    };
    
    console.log('🔍 Sistem Sağlık Durumu:');
    console.table(sağlık);
    
    return sağlık;
};

// Console helper mesajları
console.log('\n🎉 GELİŞMİŞ NAKİT FİNANSAL SİSTEM HAZIR!');
console.log('================================================');
console.log('🔧 Kullanılabilir Gelişmiş Komutlar:');
console.log('• gelismisAnaliz() - Kapsamlı AI analizi');
console.log('• performansRaporu() - Detaylı performans raporu');
console.log('• makroGuncelle() - Makro ekonomik veri güncelleme');
console.log('• patternAnalizi() - Teknik pattern tanıma');
console.log('• aiPerformansKontrol() - AI model performansı');
console.log('• cacheDurumu() - Cache sistem durumu');
console.log('• sistemSaglik() - Genel sistem sağlığı');
console.log('================================================');
console.log('🚀 Sistem başlatmak için: sistemiBaslat()');
console.log('⏹️ Sistemi durdurmak için: sistemiDurdur()');
console.log('🧪 API test için: manuelApiTesti()');
console.log('📊 Manuel veri için: manuelVeriGuncelle()');
console.log('================================================\n');