// 💡 曲の仮データ
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

const youtubeMap = {
    "Automatic": "RnkV01Fx5bY", "First Love": "o1sUaVJUeB0", "Movin' on without you": "266zI_bMUEg",
    "One Last Kiss": "0Uhh62MUEic", "君に夢中": "5YnvOyAtVZs", "BADモード": "a_S_bA5aX6M",
    "Cry Baby": "O1bhZgkC4Gw", "Universe": "EOZfU_1pIDY", "Anarchy": "H6G6z836gG0",
    "Pretender": "TQ8WlA2GXbk", "宿命": "-kgOFJG5E94", "I LOVE...": "bt8wNQJaKAk"
};

// 📑 タブ切り替え
function switchTab(tabId, buttonElement) {
    document.querySelectorAll('.content-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    buttonElement.classList.add('active');
    if (tabId === 'eraTab') { renderEraList(); }
}

// 🔍 歌手検索
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

// 🗓️ 年代別表示
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

function toggleAlbum(id) {
    const trackList = document.getElementById(id);
    const isVisible = trackList.style.display === "block";
    trackList.style.display = isVisible ? "none" : "block";
}

// 🎵 再生処理
function playMusic(trackName, artistName) {
    const playerContainer = document.getElementById("globalPlayer");
    const playerTitle = document.getElementById("playerTitle");
    const iframe = document.getElementById("youtubeIframe");

    playerTitle.innerText = `再生中 ♫ : ${trackName} / ${artistName}`;

    const videoId = youtubeMap[trackName];
    if (videoId) {
        iframe.src = `https://youtube.com{videoId}?autoplay=1`;
        playerContainer.style.display = "block";
    } else {
        alert("動画データが見つかりませんでした。");
    }
}
