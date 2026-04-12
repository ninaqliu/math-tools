/* nav.js — single nav loader for all Ms. Liu Math Tools pages
   Each page only needs:
     <div id="sidebar-mount"></div>   inside <aside class="sidebar">
     <div id="sheet-mount"></div>     inside the sheet div
   nav.js does the rest automatically. */

(function () {

  /* ── detect current page filename ── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  /* ── fetch nav.html and boot everything ── */
  fetch('nav.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      /* parse the fetched HTML */
      var parser = new DOMParser();
      var doc    = parser.parseFromString(html, 'text/html');

      /* inject sidebar */
      var sidebarMount = document.getElementById('sidebar-mount');
      var sidebarTpl   = doc.getElementById('nav-sidebar-template');
      if (sidebarMount && sidebarTpl) {
        sidebarMount.innerHTML = sidebarTpl.innerHTML;
      }

      /* inject mobile sheet */
      var sheetMount = document.getElementById('sheet-mount');
      var sheetTpl   = doc.getElementById('nav-sheet-template');
      if (sheetMount && sheetTpl) {
        sheetMount.innerHTML = sheetTpl.innerHTML;
      }

      /* mark active links — match href filename to current page */
      document.querySelectorAll('.nav-item, .sheet-item').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var page = href.split('/').pop();
        if (page === currentPage) {
          a.classList.add('active');
          a.classList.remove('soon');  /* live pages are never greyed out */
        }
      });

      /* run accordion and sheet behaviour now that DOM is ready */
      initSidebar();
      initSheet();
    })
    .catch(function (err) {
      /* graceful fallback — nav just won't appear, page still works */
      console.warn('nav.html could not be loaded:', err);
    });

  /* ── SIDEBAR accordion ── */
  function initSidebar() {
    var groups = document.querySelectorAll('.sidebar .nav-group');

    /* close all first */
    groups.forEach(function (g) { g.classList.remove('open'); });

    /* open whichever group contains the active link */
    var active = document.querySelector('.sidebar .nav-item.active');
    if (active) {
      var pg = active.closest('.nav-group');
      if (pg) pg.classList.add('open');
    }

    /* click = toggle this, close siblings */
    groups.forEach(function (group) {
      var hdr = group.querySelector('.nav-group-header');
      if (!hdr) return;
      hdr.addEventListener('click', function () {
        var isOpen = group.classList.contains('open');
        groups.forEach(function (g) { g.classList.remove('open'); });
        if (!isOpen) group.classList.add('open');
      });
    });
  }

  /* ── MOBILE SHEET ── */
  function initSheet() {
    var overlay = document.getElementById('sheet-overlay');
    var sheet   = document.getElementById('nav-sheet');
    var menuBtn = document.getElementById('menu-btn');

    function openSheet() {
      if (!overlay || !sheet) return;
      overlay.style.display = 'block';
      sheet.style.display   = 'block';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('open');
          sheet.classList.add('open');
        });
      });
      document.body.style.overflow = 'hidden';
    }

    function closeSheet() {
      if (!overlay || !sheet) return;
      overlay.classList.remove('open');
      sheet.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(function () {
        overlay.style.display = 'none';
        sheet.style.display   = 'none';
      }, 300);
    }

    if (menuBtn) menuBtn.addEventListener('click', openSheet);
    if (overlay) overlay.addEventListener('click', closeSheet);

    /* auto-open sheet group containing active item */
    var sheetActive = document.querySelector('.sheet-item.active');
    if (sheetActive) {
      var sg = sheetActive.closest('.sheet-group');
      if (sg) sg.classList.add('open');
    }

    /* sheet group toggles */
    document.querySelectorAll('.sheet-group-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.sheet-group').classList.toggle('open');
      });
    });
  }

}());
