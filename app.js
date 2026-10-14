// 💡 曲のデータ
const artistData = {
    "宇多田ヒカル": [
        { album: "First Love", tracks: ["Automatic", "First Love", "Movin' on without you"] },
        { album: "BADモード", tracks: ["One Last Kiss", "君に夢中", "BADモード"] }
    ],
    "Official髭男dism": [
        { album: "Editorial", tracks: ["Cry Baby", "Universe", "Anarchy"] },
        { album: "Traveler", tracks: ["Pretender", "宿命", "I LOVE..."] }
    ]
};

// 💡 年代別の楽曲データ
const eraData = {
    "1990年代": [
        { title: "First Love", artist: "宇多田ヒカル" },
        { title: "Automatic", artist: "宇多田ヒカル" }
    ],
    "2020年代": [
        { title: "Pretender", artist: "Official髭男dism" },
        { title: "Cry Baby", artist: "Official髭男dism" },
        { title: "君に夢中", artist: "宇多田ヒカル" }
    ]
};

// 📑 画面切り替えタブの制御
function switchTab(tabId, buttonElement) {
    document.querySelectorAll('.content-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    buttonElement.classList.add('active');
    if (tabId === 'eraTab') { renderEraList(); }
}

// 🔍 歌手名検索の関数
function searchArtist() {
    const input = document.getElementById("artistInput").value.trim();
    const resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";

    if (!input) { alert("歌手名を入力してください"); return; }

    const albums = artistData[input];
    if (!albums) {
        resultsDiv.innerHTML = `<p style="text-align:center; color:#aaa;">「${input}」のデータが見つかりませんでした。</p>`;
        return;
    }

    albums.forEach((item, index) => {
        const albumCard = document.createElement("div");
        albumCard.className = "album-card";

        const header = document.createElement("div");
        header.className = "album-header";
        header.innerHTML = `<span>💿 ${item.album}</span><span>▼</span>`;
        header.onclick = () => toggleAlbum(`search-tracks-${index}`);

        const trackList = document.createElement("div");
        trackList.className = "track-list";
        trackList.id = `search-tracks-${index}`;

        item.tracks.forEach(track => {
            const trackItem = document.createElement("div");
            trackItem.className = "track-item";
            trackItem.innerHTML = `<span>▶ ${track}</span>`;
            trackItem.onclick = () => playMusic(track, input);
            trackList.appendChild(trackItem);
        });

        albumCard.appendChild(header);
        albumCard.appendChild(trackList);
        resultsDiv.appendChild(albumCard);
    });
}

// 🗓️ 年代別一覧を表示する関数
function renderEraList() {
    const eraDiv = document.getElementById("eraResults");
    eraDiv.innerHTML = "";

    for (const era in eraData) {
        const section = document.createElement("div");
        section.className = "era-section";

        const title = document.createElement("div");
        title.className = "era-title";
        title.innerText = era;
        section.appendChild(title);

        eraData[era].forEach(song => {
            const trackItem = document.createElement("div");
            trackItem.className = "track-item";
            trackItem.innerHTML = `<span>▶ ${song.title}</span><span class="artist-badge">${song.artist}</span>`;
            trackItem.onclick = () => playMusic(song.title, song.artist);
            section.appendChild(trackItem);
        });
        eraDiv.appendChild(section);
    }
}

// アルバムの開閉制御
function toggleAlbum(id) {
    const trackList = document.getElementById(id);
    if (trackList) {
        const isVisible = trackList.style.display === "block";
        trackList.style.display = isVisible ? "none" : "block";
    }
}

// 🎵 曲をクリックしたときにYouTubeを開く関数
function playMusic(trackName, artistName) {
    const searchKeyword = encodeURIComponent(`${artistName} ${trackName}`);
    const targetUrl = "https://youtube.com" + searchKeyword;
    window.open(targetUrl, '_blank');
}
