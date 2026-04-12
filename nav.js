/* nav.js — shared navigation behaviour */

(function () {
  /* ── sidebar group toggles ── */
  document.querySelectorAll('.nav-group-header').forEach(function (hdr) {
    hdr.addEventListener('click', function () {
      var group = hdr.closest('.nav-group');
      group.classList.toggle('open');
    });
  });

  /* auto-open the group that contains the active link */
  var active = document.querySelector('.nav-item.active, .sheet-item.active');
  if (active) {
    var sg = active.closest('.nav-group, .sheet-group');
    if (sg) sg.classList.add('open');
  }

  /* ── mobile bottom sheet ── */
  var overlay  = document.getElementById('sheet-overlay');
  var sheet    = document.getElementById('nav-sheet');
  var menuBtn  = document.getElementById('menu-btn');

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

  if (menuBtn)  menuBtn.addEventListener('click', openSheet);
  if (overlay)  overlay.addEventListener('click', closeSheet);

  /* sheet group toggles */
  document.querySelectorAll('.sheet-group-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.sheet-group');
      group.classList.toggle('open');
    });
  });
}());
