// Off canvas menu 
let sidebar = document.querySelector('.js-sidebar')
let toggleButton = document.querySelector('.js-toggle')

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	sidebar.classList.toggle('is-sidebar');
	document.documentElement.classList.toggle("no-scroll");
	toggleButton.classList.toggle('is-active');
});


// Share buttons pop-up
(function () {
	// share popup
	const shareButton = document.querySelector('.js-content__share-button');
	const sharePopup = document.querySelector('.js-content__share-popup');

	if (shareButton && sharePopup) {
		 sharePopup.addEventListener('click', function (e) {
			  e.stopPropagation();
		 });

		 shareButton.addEventListener('click', function (e) {
			  e.preventDefault();
			  e.stopPropagation();
			  sharePopup.classList.toggle('is-visible');
		 });

		 document.body.addEventListener('click', function () {
			  sharePopup.classList.remove('is-visible');
		 });
	}

	// link selector and pop-up window size
	const Config = {
		 Link: ".js-share",
		 Width: 500,
		 Height: 500
	};

	// add handler to links
	const shareLinks = document.querySelectorAll(Config.Link);
	shareLinks.forEach(link => {
		 link.addEventListener('click', PopupHandler);
	});

	// create popup
	function PopupHandler(e) {
		 e.preventDefault();

		 const target = e.target.closest(Config.Link);
		 if (!target) return;

		 // hide share popup
		 if (sharePopup) {
			  sharePopup.classList.remove('is-visible');
		 }

		 // popup position
		 const px = Math.floor((window.innerWidth - Config.Width) / 2);
		 const py = Math.floor((window.innerHeight - Config.Height) / 2);

		 // open popup
		 const linkHref = target.href;
		 const popup = window.open(linkHref, "social", `
			  width=${Config.Width},
			  height=${Config.Height},
			  left=${px},
			  top=${py},
			  location=0,
			  menubar=0,
			  toolbar=0,
			  status=0,
			  scrollbars=1,
			  resizable=1
		 `);

		 if (popup) {
			  popup.focus();
		 }
	}
})();


// Responsive embeds script
(function () {
	let wrappers = document.querySelectorAll('.post__video, .post__iframe');

	for (let i = 0; i < wrappers.length; i++) {
		let embed = wrappers[i].querySelector('iframe, embed, video, object');

		if (!embed) {
			continue;
		}

        if (embed.getAttribute('data-responsive') === 'false') {
            continue;
        }

		let w = embed.getAttribute('width');
		let h = embed.getAttribute('height');
		let ratio = false;

		if (!w || !h) {
			continue;
		}
		
		if (w.indexOf('%') > -1 && h.indexOf('%') > -1) { // percentage mode
			w = parseFloat(w.replace('%', ''));
			h = parseFloat(h.replace('%', ''));
			ratio = h / w;
		} else if (w.indexOf('%') === -1 && h.indexOf('%') === -1) { // pixels mode
			w = parseInt(w, 10);
			h = parseInt(h, 10);
			ratio = h / w;
		}

		if (ratio !== false) {
			let ratioValue = (ratio * 100) + '%';
			wrappers[i].setAttribute('style', '--embed-aspect-ratio:' + ratioValue);
		}
	}
})();

// Search UI
(function () {

    let search = document.querySelector('.search');
    let searchBtn = document.querySelector('.js-search-btn');
    let searchForm = search.querySelector('.search__form');
    let searchInput = search.querySelector('.search__input');

    if (!search || !searchBtn || !searchForm || !searchInput) return;
    if (!searchForm.id) searchForm.id = 'search-form';

    searchBtn.setAttribute('aria-expanded', 'false');
    searchBtn.setAttribute('aria-controls', searchForm.id);

    function openSearch() {
        search.classList.add('is-active');
        searchBtn.setAttribute('aria-expanded', 'true');
        setTimeout(() => searchInput.focus(), 180);
    }

    function closeSearch() {
        search.classList.remove('is-active');
        searchBtn.setAttribute('aria-expanded', 'false');
        searchInput.blur();
        searchInput.value = '';
    }

    function toggleOrSubmitSearch() {
        if (!search.classList.contains('is-active')) {
            openSearch();
        } else {
            const value = searchInput.value.trim();
            if (value.length > 0) {
                searchForm.requestSubmit();
                closeSearch();
            } else {
                closeSearch();
            }
        }
    }

    searchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleOrSubmitSearch();
    });

    document.addEventListener('click', function (e) {
        if (!search.contains(e.target)) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSearch();
    });

    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = searchInput.value.trim();
            if (value.length > 0) {
                searchForm.requestSubmit();
                closeSearch();
            }
        }
    });

})();

