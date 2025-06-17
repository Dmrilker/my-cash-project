// ==========================================
// GELİŞMİŞ PATTERN TANIMA SİSTEMİ
// ==========================================
class PatternTanima {
    constructor() {
        // Bilinen candlestick pattern'ları
        this.candlestickPatterns = {
            doji: { güvenirlik: 0.7, sinyal: 'KARARSIZLIK' },
            hammer: { güvenirlik: 0.8, sinyal: 'ALIM' },
            shootingStar: { güvenirlik: 0.8, sinyal: 'SATIM' },
            engulfing: { güvenirlik: 0.9, sinyal: 'GÜÇLÜ_TREND' },
            harami: { güvenirlik: 0.6, sinyal: 'TREND_DEĞİŞİM' }
        };
        
        // Chart pattern'ları
        this.chartPatterns = {
            headAndShoulders: { güvenirlik: 0.85, sinyal: 'SATIM' },
            triangle: { güvenirlik: 0.7, sinyal: 'BREAKOUT' },
            doubleTop: { güvenirlik: 0.8, sinyal: 'SATIM' },
            doubleBottom: { güvenirlik: 0.8, sinyal: 'ALIM' },
            flag: { güvenirlik: 0.75, sinyal: 'TREND_DEVAM' }
        };
    }
    
    // ==========================================
    // ANA PATTERN TANIMA FONKSİYONU
    // ==========================================
    patternAnalizi(veriSeti, historikVeriler) {
        const bulunanPatternlar = [];
        
        // 1. Candlestick Pattern Analizi
        const candlestickPattern = this.candlestickPatternTara(veriSeti);
        if (candlestickPattern) {
            bulunanPatternlar.push(candlestickPattern);
        }
        
        // 2. Chart Pattern Analizi
        const chartPattern = this.chartPatternTara(historikVeriler);
        if (chartPattern) {
            bulunanPatternlar.push(chartPattern);
        }
        
        // 3. Volume Pattern Analizi
        const volumePattern = this.volumePatternAnalizi(veriSeti);
        if (volumePattern) {
            bulunanPatternlar.push(volumePattern);
        }
        
        // 4. Fibonacci Retracement Analizi
        const fibonacciPattern = this.fibonacciAnalizi(historikVeriler);
        if (fibonacciPattern) {
            bulunanPatternlar.push(fibonacciPattern);
        }
        
        // 5. Harmonic Pattern Analizi
        const harmonicPattern = this.harmonicPatternAnalizi(historikVeriler);
        if (harmonicPattern) {
            bulunanPatternlar.push(harmonicPattern);
        }
        
        return this.patternSonucuBirleştir(bulunanPatternlar);
    }
    
    // ==========================================
    // CANDLESTICK PATTERN TANIMA
    // ==========================================
    candlestickPatternTara(veriSeti) {
        const fiyatlar = veriSeti.slice(-4); // Son 4 mum
        if (fiyatlar.length < 4) return null;
        
        // Basit DOJI pattern kontrolü
        const sonMum = fiyatlar[fiyatlar.length - 1];
        const vücutBoyutu = Math.abs(sonMum.close - sonMum.open);
        const fitilBoyutu = sonMum.high - sonMum.low;
        
        if (vücutBoyutu < (fitilBoyutu * 0.1)) {
            return {
                tip: 'DOJI',
                güvenirlik: 0.7,
                sinyal: 'KARARSIZLIK',
                açıklama: 'Alıcı ve satıcılar arasında denge'
            };
        }
        
        // HAMMER pattern kontrolü
        if (this.hammerPatternKontrol(sonMum)) {
            return {
                tip: 'HAMMER',
                güvenirlik: 0.8,
                sinyal: 'ALIM',
                açıklama: 'Güçlü alım sinyali - düşüş trendi sonlanıyor'
            };
        }
        
        // ENGULFING pattern kontrolü
        if (fiyatlar.length >= 2) {
            const engulfing = this.engulfingPatternKontrol(fiyatlar.slice(-2));
            if (engulfing) {
                return {
                    tip: 'ENGULFING',
                    güvenirlik: 0.9,
                    sinyal: engulfing.sinyal,
                    açıklama: engulfing.açıklama
                };
            }
        }
        
        return null;
    }
    
    hammerPatternKontrol(mum) {
        const vücut = Math.abs(mum.close - mum.open);
        const altFitil = Math.min(mum.open, mum.close) - mum.low;
        const üstFitil = mum.high - Math.max(mum.open, mum.close);
        
        // Hammer kriterleri:
        // 1. Alt fitil en az vücudün 2 katı
        // 2. Üst fitil minimal
        // 3. Vücut küçük
        return (altFitil >= vücut * 2) && (üstFitil <= vücut * 0.1) && (vücut > 0);
    }
    
    engulfingPatternKontrol(ikiMum) {
        const [önceki, şimdiki] = ikiMum;
        
        const öncekiVücut = Math.abs(önceki.close - önceki.open);
        const şimdikiVücut = Math.abs(şimdiki.close - şimdiki.open);
        
        // Bullish Engulfing
        if (önceki.close < önceki.open && şimdiki.close > şimdiki.open) {
            if (şimdiki.open < önceki.close && şimdiki.close > önceki.open) {
                return {
                    sinyal: 'GÜÇLÜ_ALIM',
                    açıklama: 'Bullish Engulfing - güçlü yükseliş sinyali'
                };
            }
        }
        
        // Bearish Engulfing
        if (önceki.close > önceki.open && şimdiki.close < şimdiki.open) {
            if (şimdiki.open > önceki.close && şimdiki.close < önceki.open) {
                return {
                    sinyal: 'GÜÇLÜ_SATIM',
                    açıklama: 'Bearish Engulfing - güçlü düşüş sinyali'
                };
            }
        }
        
        return null;
    }
    
    // ==========================================
    // CHART PATTERN TANIMA
    // ==========================================
    chartPatternTara(historikVeriler) {
        if (historikVeriler.length < 20) return null;
        
        const fiyatlar = historikVeriler.map(v => v.fiyat);
        
        // Head and Shoulders pattern
        const headShoulders = this.headAndShouldersKontrol(fiyatlar);
        if (headShoulders) return headShoulders;
        
        // Double Top/Bottom pattern
        const doublePattern = this.doublePatternKontrol(fiyatlar);
        if (doublePattern) return doublePattern;
        
        // Triangle pattern
        const trianglePattern = this.trianglePatternKontrol(fiyatlar);
        if (trianglePattern) return trianglePattern;
        
        return null;
    }
    
    headAndShouldersKontrol(fiyatlar) {
        if (fiyatlar.length < 20) return null;
        
        // Son 20 veriyi analiz et
        const sonVeriler = fiyatlar.slice(-20);
        const maxIndex = sonVeriler.indexOf(Math.max(...sonVeriler));
        
        // Head pozisyonu merkeze yakın olmalı
        if (maxIndex < 7 || maxIndex > 13) return null;
        
        // Sol omuz
        const solOmuz = Math.max(...sonVeriler.slice(0, maxIndex - 3));
        // Sağ omuz
        const sağOmuz = Math.max(...sonVeriler.slice(maxIndex + 3));
        const head = sonVeriler[maxIndex];
        
        // Head and Shoulders kriterleri
        if (head > solOmuz * 1.05 && head > sağOmuz * 1.05 && 
            Math.abs(solOmuz - sağOmuz) / solOmuz < 0.05) {
            
            return {
                tip: 'HEAD_AND_SHOULDERS',
                güvenirlik: 0.85,
                sinyal: 'SATIM',
                açıklama: 'Head and Shoulders pattern - güçlü düşüş sinyali'
            };
        }
        
        return null;
    }
    
    doublePatternKontrol(fiyatlar) {
        if (fiyatlar.length < 15) return null;
        
        const sonVeriler = fiyatlar.slice(-15);
        const max1Index = sonVeriler.indexOf(Math.max(...sonVeriler.slice(0, 7)));
        const max2Index = sonVeriler.indexOf(Math.max(...sonVeriler.slice(8))) + 8;
        
        const max1 = sonVeriler[max1Index];
        const max2 = sonVeriler[max2Index];
        
        // Double Top kontrolü
        if (Math.abs(max1 - max2) / max1 < 0.02 && max1Index < max2Index) {
            return {
                tip: 'DOUBLE_TOP',
                güvenirlik: 0.8,
                sinyal: 'SATIM',
                açıklama: 'Double Top pattern - satım sinyali'
            };
        }
        
        // Double Bottom kontrolü  
        const min1 = Math.min(...sonVeriler.slice(0, 7));
        const min2 = Math.min(...sonVeriler.slice(8));
        
        if (Math.abs(min1 - min2) / min1 < 0.02) {
            return {
                tip: 'DOUBLE_BOTTOM',
                güvenirlik: 0.8,
                sinyal: 'ALIM',
                açıklama: 'Double Bottom pattern - alım sinyali'
            };
        }
        
        return null;
    }
    
    trianglePatternKontrol(fiyatlar) {
        if (fiyatlar.length < 12) return null;
        
        const sonVeriler = fiyatlar.slice(-12);
        
        // Yüksek ve düşük noktaları bul
        const yüksekler = [];
        const düşükler = [];
        
        for (let i = 1; i < sonVeriler.length - 1; i++) {
            if (sonVeriler[i] > sonVeriler[i-1] && sonVeriler[i] > sonVeriler[i+1]) {
                yüksekler.push({index: i, değer: sonVeriler[i]});
            }
            if (sonVeriler[i] < sonVeriler[i-1] && sonVeriler[i] < sonVeriler[i+1]) {
                düşükler.push({index: i, değer: sonVeriler[i]});
            }
        }
        
        if (yüksekler.length >= 2 && düşükler.length >= 2) {
            // Üst trend çizgisi eğimi
            const üstEğim = (yüksekler[yüksekler.length-1].değer - yüksekler[0].değer) / 
                           (yüksekler[yüksekler.length-1].index - yüksekler[0].index);
            
            // Alt trend çizgisi eğimi  
            const altEğim = (düşükler[düşükler.length-1].değer - düşükler[0].değer) / 
                           (düşükler[düşükler.length-1].index - düşükler[0].index);
            
            // Ascending Triangle (yükselen üçgen)
            if (Math.abs(üstEğim) < 0.1 && altEğim > 0.1) {
                return {
                    tip: 'ASCENDING_TRIANGLE',
                    güvenirlik: 0.75,
                    sinyal: 'ALIM',
                    açıklama: 'Ascending Triangle - yükseliş breakout beklentisi'
                };
            }
            
            // Descending Triangle (alçalan üçgen)
            if (Math.abs(altEğim) < 0.1 && üstEğim < -0.1) {
                return {
                    tip: 'DESCENDING_TRIANGLE',
                    güvenirlik: 0.75,
                    sinyal: 'SATIM',
                    açıklama: 'Descending Triangle - düşüş breakout beklentisi'
                };
            }
        }
        
        return null;
    }
    
    // ==========================================
    // PATTERN SONUÇLARINI BİRLEŞTİRME
    // ==========================================
    patternSonucuBirleştir(patternlar) {
        if (patternlar.length === 0) {
            return {
                genel: 'PATTERN_YOK',
                güven: 0,
                sinyal: 'BEKLE',
                detaylar: []
            };
        }
        
        // Ağırlıklı ortalama hesaplama
        let toplamAğırlık = 0;
        let ağırlıklıSkor = 0;
        let alımSinyalleri = 0;
        let satımSinyalleri = 0;
        
        patternlar.forEach(pattern => {
            toplamAğırlık += pattern.güvenirlik;
            
            if (pattern.sinyal.includes('ALIM')) {
                ağırlıklıSkor += pattern.güvenirlik;
                alımSinyalleri++;
            } else if (pattern.sinyal.includes('SATIM')) {
                ağırlıklıSkor -= pattern.güvenirlik;
                satımSinyalleri++;
            }
        });
        
        const genelGüven = toplamAğırlık / patternlar.length;
        const genelSkor = ağırlıklıSkor / toplamAğırlık;
        
        let genelSinyal = 'BEKLE';
        if (genelSkor > 0.3) genelSinyal = 'ALIM';
        else if (genelSkor < -0.3) genelSinyal = 'SATIM';
        
        return {
            genel: 'PATTERN_BULUNDU',
            güven: Math.round(genelGüven * 100),
            sinyal: genelSinyal,
            skor: genelSkor,
            alımSinyali: alımSinyalleri,
            satımSinyali: satımSinyalleri,
            detaylar: patternlar
        };
    }
}