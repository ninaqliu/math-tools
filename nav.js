/* nav.js — shared navigation behaviour */

(function () {

  /* ── SIDEBAR: accordion — one open at a time ── */
  function initSidebar() {
    var groups = document.querySelectorAll('.sidebar .nav-group');

    /* start all closed */
    groups.forEach(function (g) { g.classList.remove('open'); });

    /* auto-open whichever group contains the active link */
    var active = document.querySelector('.sidebar .nav-item.active');
    if (active) {
      var parentGroup = active.closest('.nav-group');
      if (parentGroup) parentGroup.classList.add('open');
    }

    /* click header = toggle this group, close siblings */
    groups.forEach(function (group) {
      var hdr = group.querySelector('.nav-group-header');
      if (!hdr) return;
      hdr.addEventListener('click', function () {
        var isOpen = group.classList.contains('open');
        /* close all */
        groups.forEach(function (g) { g.classList.remove('open'); });
        /* open this one only if it was closed */
        if (!isOpen) group.classList.add('open');
      });
    });
  }

  /* ── MOBILE BOTTOM SHEET ── */
  function initSheet() {
    var overlay = document.getElementById('sheet-overlay');
    var sheet   = document.getElementById('nav-sheet');
    var menuBtn = document.getElementById('menu-btn');

    function openSheet() {
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

    /* sheet group toggles — independent, not accordion */
    document.querySelectorAll('.sheet-group-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.sheet-group').classList.toggle('open');
      });
    });

    /* auto-open sheet group containing active item */
    var sheetActive = document.querySelector('.sheet-item.active');
    if (sheetActive) {
      var sg = sheetActive.closest('.sheet-group');
      if (sg) sg.classList.add('open');
    }
  }

  initSidebar();
  initSheet();

}());
