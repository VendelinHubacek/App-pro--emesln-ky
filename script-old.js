// Funkce pro zaškrtnutí všech klauzulí
document.getElementById('zaskrtnoutVse')?.addEventListener('change', function () {
    const klauzule = document.querySelectorAll('.klauzule');
    klauzule.forEach(k => k.checked = this.checked);
  });
  
  // Funkce tlačítka zpět na hlavní stránku
  function zpetNaHlavni() {
    window.location.href = 'index.html';
  }
  
  // Funkce tlačítka další krok
  function dalsiKrok(url) {
    window.location.href = url;
  }
  
  // Uložení dat ze smlouvy
  document.getElementById('smlouvaForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const data = {
      zhotovitel: document.getElementById('zhotovitel').value.trim(),
      objednatel: document.getElementById('objednatel').value.trim(),
      prace: document.getElementById('prace').value.trim(),
      cena: document.getElementById('cena').value.trim(),
      datumOd: document.getElementById('datumOd').value,
      datumDo: document.getElementById('datumDo').value,
      poznamky: document.getElementById('poznamky').value.trim(),
      klauzule: []
    };
  
    if (!data.zhotovitel || !data.objednatel || !data.prace || !data.cena || !data.datumOd || !data.datumDo) {
      alert('Vyplňte všechna pole!');
      return;
    }
  
    document.querySelectorAll('.klauzule:checked').forEach(k => {
      data.klauzule.push(k.value);
    });
  
    localStorage.setItem('smlouvaData', JSON.stringify(data));
    window.location.href = 'vytvorenakarta.html';
  });
  
  // Generování smlouvy na vytvorenakarta.html
  if (window.location.pathname.includes('vytvorenakarta.html')) {
    const data = JSON.parse(localStorage.getItem('smlouvaData'));
  
    if (data) {
      let volitelnePodminky = '';
  
      if (data.klauzule.includes('elektrina')) {
        volitelnePodminky += `<li>Objednatel zajistí elektrickou energii na staveništi.</li>`;
      }
      if (data.klauzule.includes('voda')) {
        volitelnePodminky += `<li>Objednatel zajistí přístup k vodě na stavbě.</li>`;
      }
      if (data.klauzule.includes('hygiena')) {
        volitelnePodminky += `<li>Objednatel zajistí hygienické zázemí pro pracovníky.</li>`;
      }
      if (data.klauzule.includes('pristup')) {
        volitelnePodminky += `<li>Objednatel umožní bezpečný přístup ke stavbě.</li>`;
      }
      if (data.klauzule.includes('pokuta')) {
        volitelnePodminky += `<li>Objednatel uhradí smluvní pokutu za prodlení s platbou ve výši 0,05 % z ceny díla za každý den.</li>`;
      }
      if (data.klauzule.includes('odstoupeni')) {
        volitelnePodminky += `<li>V případě neoprávněného odstoupení od smlouvy uhradí objednatel pokutu 15 % z ceny díla.</li>`;
      }
      if (data.klauzule.includes('skoda')) {
        volitelnePodminky += `<li>Objednatel nahradí vzniklou škodu a ušlý zisk zhotovitele.</li>`;
      }
      if (data.klauzule.includes('uklid')) {
        volitelnePodminky += `<li>Objednatel uhradí poplatek za úklid staveniště.</li>`;
      }
      if (data.klauzule.includes('zaruka')) {
        volitelnePodminky += `<li>Zhotovitel poskytuje záruku na dílo v délce 24 měsíců.</li>`;
      }
      if (data.klauzule.includes('mlcenlivost')) {
        volitelnePodminky += `<li>Obě strany se zavazují k mlčenlivosti o skutečnostech souvisejících s touto smlouvou.</li>`;
      }
  
      let smlouvaText = `
      <p><strong>Smluvní strany:</strong></p>
      <p>Zhotovitel: ${data.zhotovitel}</p>
      <p>Objednatel: ${data.objednatel}</p>
  
      <h3>Článek I. – Předmět smlouvy</h3>
      <p>Zhotovitel se zavazuje na vlastní odpovědnost a nebezpečí provést pro objednatele stavební práce: <strong>${data.prace}</strong>.</p>
  
      <h3>Článek II. – Rozsah díla</h3>
      <p>Rozsah díla zahrnuje přípravné práce, provedení stavebních prací dle dokumentace, dodávku materiálu a úklid staveniště.</p>
  
      <h3>Článek III. – Cena a platební podmínky</h3>
      <p>Cena díla činí: <strong>${data.cena} Kč</strong>.</p>
      <p>Platba: 50 % záloha, zbytek po předání díla.</p>
  
      <h3>Článek IV. – Termín plnění</h3>
      <p>Od: <strong>${data.datumOd}</strong> do: <strong>${data.datumDo}</strong>.</p>
  
      <h3>Článek V. – Povinnosti objednatele</h3>
      <ul>${volitelnePodminky}</ul>
  
      <h3>Článek VI. – Předání díla</h3>
      <p>Po dokončení bude vyhotoven předávací protokol.</p>
  
      <h3>Článek VII. – Odpovědnost za vady a záruka</h3>
      <p>Zhotovitel poskytuje záruku v délce 24 měsíců.</p>
  
      <h3>Článek VIII. – Odstoupení od smlouvy</h3>
      <p>Objednatel může odstoupit pouze z důvodů uvedených zákonem. Neoprávněné odstoupení: smluvní pokuta 15 % z ceny díla.</p>
  
      <h3>Článek IX. – Mlčenlivost</h3>
      ${data.klauzule.includes('mlcenlivost') ? `<p>Obě strany se zavazují zachovat mlčenlivost o informacích ze smlouvy.</p>` : ''}
  
      <h3>Článek X. – Vyšší moc</h3>
      <p>Strany nejsou odpovědné za prodlení způsobené vyšší mocí (např. živelní pohroma, epidemie, válka).</p>
  
      <h3>Článek XI. – Závěrečná ustanovení</h3>
      ${data.poznamky ? `<p><strong>Poznámky:</strong> ${data.poznamky}</p>` : ''}
      <p>Smlouva je vyhotovena ve dvou stejnopisech, každá strana obdrží jedno vyhotovení.</p>
      <p>V ......................................., dne .......................................</p>
      <p>Podpis zhotovitele: __________________________</p>
      <p>Podpis objednatele: __________________________</p>
      `;
  
      document.getElementById('vysledek').innerHTML = smlouvaText;
    }
  }
  
  // PDF a e-mail
  function stahnoutPDF() {
    const element = document.getElementById('vysledek');
    if (element.innerHTML.trim() === "") {
      alert("Smlouva není k dispozici.");
      return;
    }
    setTimeout(() => {
      html2pdf().from(element).save('pracovni_smlouva.pdf');
    }, 300);
  }
  
  function odeslatEmail() {
    const obsah = document.getElementById('vysledek').innerText;
    const subject = encodeURIComponent('Pracovní smlouva');
    const body = encodeURIComponent(obsah);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
  // ==== Funkce pro práci se zákazníky ====
function nacistZakazniky() {
    return JSON.parse(localStorage.getItem('zakaznici')) || [];
  }
  
  function zobrazitVyberZakazniku() {
    const select = document.getElementById('vyberZakaznika');
    if (!select) return;
    select.innerHTML = '<option value="">-- Vyberte --</option>';
    const zakaznici = nacistZakazniky();
    zakaznici.forEach((z, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = z.jmeno + " (" + z.adresa + ")";
      select.appendChild(option);
    });
  }
  
  function naplnitFormularZakaznikem(index) {
    const zakaznici = nacistZakazniky();
    if (zakaznici[index]) {
      const z = zakaznici[index];
      document.getElementById('jmeno').value = z.jmeno;
      document.getElementById('adresa').value = z.adresa;
      document.getElementById('ico').value = z.ico;
      document.getElementById('telefon').value = z.telefon;
      document.getElementById('email').value = z.email;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    zobrazitVyberZakazniku();
    const select = document.getElementById('vyberZakaznika');
    if (select) {
      select.addEventListener('change', () => {
        if (select.value !== '') {
          naplnitFormularZakaznikem(select.value);
        }
      });
    }
  });
  