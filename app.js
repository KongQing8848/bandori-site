/* ============================================================
   邦多利 FAN SITE — app.js
   ============================================================ */
(() => {
  "use strict";

  /* ───────────── DATA ───────────── */

  const BANDS = [
    {
      id: "popipa",
      name: "Poppin'Party",
      jp: "ポッピン・パーティ",
      mark: "PP",
      color: "#ff4f9a",
      color2: "#ffb3d1",
      year: 2015,
      tag: "从星之鼓动开始的故事",
      desc: "「キラキラ、ドキドキ」是她们的关键词。香澄在当铺里找到一把星形吉他，五个女孩由此在 Live House「SPACE」的舞台上，把心动变成了声音。",
      quote: "キラキラ、ドキドキ——今天也要一起心动！",
    },
    {
      id: "afterglow",
      name: "Afterglow",
      jp: "アフターグロウ",
      mark: "AG",
      color: "#ff5b4a",
      color2: "#ffb199",
      year: 2016,
      tag: "永远的放学后，五个人的归处",
      desc: "从儿时就在一起的五人，把放学后的日常写进歌里。兰的歌声像晚霞一样直率，那是「只属于我们的归处」。",
      quote: "放学后的归处，永远不会散场。",
    },
    {
      id: "pasupare",
      name: "Pastel*Palettes",
      jp: "パステル＊パレット",
      mark: "P*P",
      color: "#35d0c0",
      color2: "#a8f5ea",
      year: 2016,
      tag: "甜美笑容的偶像乐队",
      desc: "事务所打造的偶像乐队，却在一次次笨拙的努力里长出了真心。彩的「丸山彩式微笑」背后，是不肯认输的练习量。",
      quote: "丸山彩式微笑，练习量是秘密。",
    },
    {
      id: "roselia",
      name: "Roselia",
      jp: "ロゼリア",
      mark: "R",
      color: "#9b7bff",
      color2: "#d3c4ff",
      year: 2017,
      tag: "苍蓝蔷薇的骄傲",
      desc: "以「苍蓝蔷薇」为名的实力派乐队。友希那追求完美的歌声，与纱夜的吉他、燐子的钢琴交织成凛冽而华丽的世界。",
      quote: "苍蓝的蔷薇，只为完美绽放。",
    },
    {
      id: "hhw",
      name: "Hello, Happy World!",
      jp: "ハロー、ハッピーワールド！",
      mark: "HHW",
      color: "#ffcf5c",
      color2: "#fff0b8",
      year: 2017,
      tag: "让全世界都笑起来！",
      desc: "只要有人难过，她们就带着笑声出现。心把「Happy! Lucky! Smile! Yay!」当成咒语，用最吵闹的快乐把世界染成黄色。",
      quote: "Happy! Lucky! Smile! Yay!",
    },
    {
      id: "morfonica",
      name: "Morfonica",
      jp: "モルフォニカ",
      mark: "M",
      color: "#7fb6f2",
      color2: "#cfe6ff",
      year: 2020,
      tag: "在月下奏响的古典摇滚",
      desc: "月下的古典与摇滚相遇。真白纤细的歌声、瑠唯的小提琴，加上成员们各自的光，织出像月光一样柔和的音色。",
      quote: "月光下的古典摇滚，请安静地听。",
    },
    {
      id: "ras",
      name: "RAISE A SUILEN",
      jp: "レイズアスイレン",
      mark: "RAS",
      color: "#b6ff3b",
      color2: "#e4ffa8",
      year: 2018,
      tag: "把舞台掀翻的电子摇滚",
      desc: "由 CHU² 制作、以「掀翻舞台」为目标的电子摇滚军团。强烈的节拍与 LAYER 的歌声，把现场变成高热量的战场。",
      quote: "把舞台掀翻——音量就是礼貌。",
    },
    {
      id: "mygo",
      name: "MyGO!!!!!",
      jp: "マイゴ",
      mark: "MyGO",
      color: "#4a7dff",
      color2: "#b7ccff",
      year: 2022,
      tag: "迷路也没关系，继续前进",
      desc: "迷路的孩子也能组乐队。灯把说不出口的话写进歌词，五个不完美的人在一次次冲突里，找到了继续演奏的理由。",
      quote: "迷路也没关系，反正我们还在走。",
    },
    {
      id: "avemujica",
      name: "Ave Mujica",
      jp: "アヴェ・ムジカ",
      mark: "AM",
      color: "#d94a6a",
      color2: "#ffb3c4",
      year: 2023,
      tag: "假面舞会上的沉重旋律",
      desc: "戴着假面的五人，在舞台上讲述失落与重生的故事。厚重的音墙与戏剧性的演出，让人分不清是演出还是告白。",
      quote: "假面之下，才是最真实的告白。",
    },
  ];

  const MEMBERS = [
    { band: "popipa", name: "户山香澄", kana: "とやま かすみ", role: "主唱 / 吉他" },
    { band: "popipa", name: "花园多惠", kana: "はなぞの たえ", role: "吉他" },
    { band: "popipa", name: "牛込里美", kana: "うしごめ りみ", role: "贝斯" },
    { band: "popipa", name: "山吹沙绫", kana: "やまぶき さあや", role: "鼓" },
    { band: "popipa", name: "市谷有咲", kana: "いちがや ありさ", role: "键盘" },

    { band: "afterglow", name: "美竹兰", kana: "みたけ らん", role: "主唱 / 吉他" },
    { band: "afterglow", name: "青叶摩卡", kana: "あおば もか", role: "吉他" },
    { band: "afterglow", name: "上原绯玛丽", kana: "うえはら ひまり", role: "贝斯" },
    { band: "afterglow", name: "宇田川巴", kana: "うだがわ ともえ", role: "鼓" },
    { band: "afterglow", name: "羽泽鸫", kana: "はざわ つぐみ", role: "键盘" },

    { band: "pasupare", name: "丸山彩", kana: "まるやま あや", role: "主唱" },
    { band: "pasupare", name: "白鹭千圣", kana: "しらさぎ ちさと", role: "贝斯" },
    { band: "pasupare", name: "大和麻弥", kana: "やまと まや", role: "鼓" },
    { band: "pasupare", name: "若宫伊芙", kana: "わかみや いぶ", role: "键盘" },
    { band: "pasupare", name: "冰川日菜", kana: "ひかわ ひな", role: "吉他" },

    { band: "roselia", name: "凑友希那", kana: "みなと ゆきな", role: "主唱" },
    { band: "roselia", name: "冰川纱夜", kana: "ひかわ さよ", role: "吉他" },
    { band: "roselia", name: "今井莉莎", kana: "いまい りさ", role: "贝斯" },
    { band: "roselia", name: "宇田川亚子", kana: "うだがわ あこ", role: "鼓" },
    { band: "roselia", name: "白金燐子", kana: "しろかね りんこ", role: "键盘" },

    { band: "hhw", name: "弦卷心", kana: "つるまき こころ", role: "主唱" },
    { band: "hhw", name: "濑田薰", kana: "せた かおる", role: "吉他" },
    { band: "hhw", name: "北泽育美", kana: "きたざわ はぐみ", role: "贝斯" },
    { band: "hhw", name: "松原花音", kana: "まつばら かのん", role: "鼓" },
    { band: "hhw", name: "奥泽美咲", kana: "おくざわ みさき", role: "DJ / 米歇尔" },

    { band: "morfonica", name: "仓田真白", kana: "くらた ましろ", role: "主唱" },
    { band: "morfonica", name: "桐谷透子", kana: "きりたに とうこ", role: "吉他" },
    { band: "morfonica", name: "广町七深", kana: "ひろまち ななみ", role: "贝斯" },
    { band: "morfonica", name: "二叶筑紫", kana: "ふたば つくし", role: "鼓" },
    { band: "morfonica", name: "八潮瑠唯", kana: "やしお るい", role: "小提琴" },

    { band: "ras", name: "和奏蕾", kana: "わかな れい", role: "主唱", alias: "LAYER" },
    { band: "ras", name: "朝日六花", kana: "あさひ ろっか", role: "吉他", alias: "LOCK" },
    { band: "ras", name: "鳰原令王那", kana: "におはら れおな", role: "贝斯", alias: "PAREO" },
    { band: "ras", name: "佐藤益木", kana: "さとう ますき", role: "鼓", alias: "MASKING" },
    { band: "ras", name: "珠手知由", kana: "しゅて ちゆ", role: "DJ / 制作", alias: "CHU²" },

    { band: "mygo", name: "高松灯", kana: "たかまつ ともり", role: "主唱" },
    { band: "mygo", name: "千早爱音", kana: "ちはや あのん", role: "吉他" },
    { band: "mygo", name: "要乐奈", kana: "かなめ らあな", role: "吉他" },
    { band: "mygo", name: "长崎爽世", kana: "ながさき そよ", role: "贝斯" },
    { band: "mygo", name: "椎名立希", kana: "しいな たき", role: "鼓" },

    { band: "avemujica", name: "丰川祥子", kana: "とがわ さき", role: "键盘 / 主唱", alias: "Oblivionis" },
    { band: "avemujica", name: "若叶睦", kana: "わかば むつみ", role: "吉他", alias: "Mortis" },
    { band: "avemujica", name: "八幡海铃", kana: "やはた うみり", role: "贝斯", alias: "Timoris" },
    { band: "avemujica", name: "祐天寺喵梦", kana: "ゆうてんじ にゃむ", role: "鼓", alias: "Amoris" },
    { band: "avemujica", name: "三角初华", kana: "みすみ ういか", role: "吉他 / 主唱", alias: "Doloris" },
  ];

  const SONGS = [
    { t: "STAR BEAT!〜ホシの奏で〜", b: "popipa", tag: "代表曲" },
    { t: "キラキラだとか夢だとか 〜Sing Girls〜", b: "popipa", tag: "代表曲" },
    { t: "ときめきエクスペリエンス", b: "popipa", tag: "动画" },
    { t: "前へススメ！", b: "popipa", tag: "单曲" },

    { t: "熱色スターマイン", b: "afterglow", tag: "代表曲" },
    { t: "Hey-day狂騒曲", b: "afterglow", tag: "单曲" },
    { t: "That Is How I Roll!", b: "afterglow", tag: "单曲" },

    { t: "しゅわりん☆どり〜みん", b: "pasupare", tag: "代表曲" },
    { t: "パスパレは止まらない！", b: "pasupare", tag: "单曲" },
    { t: "ゆら・ゆらRing-Dong-Dance", b: "pasupare", tag: "单曲" },

    { t: "BLACK SHOUT", b: "roselia", tag: "代表曲" },
    { t: "LOUDER", b: "roselia", tag: "代表曲" },
    { t: "Re:birth day", b: "roselia", tag: "单曲" },
    { t: "ROZEN HORIZON", b: "roselia", tag: "单曲" },

    { t: "えがおのオーケストラっ！", b: "hhw", tag: "代表曲" },
    { t: "キラキラスター", b: "hhw", tag: "单曲" },
    { t: "ゴーカ！ごーかい！？ファントムシーフ！", b: "hhw", tag: "单曲" },

    { t: "Daylight", b: "morfonica", tag: "代表曲" },
    { t: "flame of hope", b: "morfonica", tag: "单曲" },
    { t: "ブルームブルーム", b: "morfonica", tag: "单曲" },

    { t: "R・I・O・T", b: "ras", tag: "代表曲" },
    { t: "EXPOSE 'Burn out!!!'", b: "ras", tag: "代表曲" },
    { t: "Beautiful Birthday", b: "ras", tag: "单曲" },

    { t: "迷星叫", b: "mygo", tag: "代表曲" },
    { t: "壱雫空", b: "mygo", tag: "动画" },
    { t: "詩超絆", b: "mygo", tag: "单曲" },
    { t: "春日影", b: "mygo", tag: "剧中曲" },

    { t: "Mas?uerade Rhapsody Re?quest", b: "avemujica", tag: "代表曲" },
    { t: "ふたつの月 〜Deep Into The Night〜", b: "avemujica", tag: "单曲" },
    { t: "素晴らしき世界 でも どこにもない場所", b: "avemujica", tag: "单曲" },
  ];

  const TIMELINE = [
    { year: "2015", title: "一枚星形吉他，把企划点亮", text: "《BanG Dream!》企划启动。Poppin'Party 从户山香澄找到的那把星形吉他开始，把「キラキラ、ドキドキ」变成了一支乐队。" },
    { year: "2017", title: "TV 动画第一季开播", text: "Poppin'Party 的故事被搬上屏幕；同年 Roselia 登场，用压倒性的演奏把「实力派」三个字写进企划。" },
    { year: "2018", title: "RAISE A SUILEN 登上舞台", text: "以 CHU² 为核心的电子摇滚军团加入，现场的音压和演出规格再上一个台阶。" },
    { year: "2020", title: "Morfonica 出道，舞台扩成九色", text: "月下的古典摇滚带来全新的音色；剧场版与手游剧情把九支乐队的世界连成一片。" },
    { year: "2022", title: "MyGO!!!!! 悄然启动", text: "没有预告的谜之乐队出现。她们的故事关于迷路、争执，以及「还是想继续弹下去」。" },
    { year: "2023", title: "《It's MyGO!!!!!》播出", text: "一部把青春期的不体面拍得极其诚实的动画，让「迷子でもいい」成为很多人的年度台词。" },
    { year: "2025", title: "Ave Mujica 揭开假面", text: "承接 MyGO 的故事，五个人戴着假面登台。舞台上是戏剧，舞台下是没有台词的心事。" },
  ];

  const bandById = new Map(BANDS.map((b) => [b.id, b]));
  const favKey = "bandori-favs-v1";

  /* ───────────── HELPERS ───────────── */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initial = (name) => Array.from(name)[0];
  const bandOf = (id) => bandById.get(id) || BANDS[0];

  function loadFavs() {
    try {
      const raw = JSON.parse(localStorage.getItem(favKey) || "[]");
      return new Set(Array.isArray(raw) ? raw : []);
    } catch {
      return new Set();
    }
  }
  function saveFavs(set) {
    try {
      localStorage.setItem(favKey, JSON.stringify([...set]));
    } catch {
      /* 隐私模式下忽略 */
    }
  }
  const favs = loadFavs();

  /* ───────────── NAV + PROGRESS ───────────── */

  const nav = $("#nav");
  const progressBar = $("#progressBar");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-stuck", y > 8);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = h > 0 ? `${Math.min(100, (y / h) * 100)}%` : "0%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ───────────── EQUALIZER ───────────── */

  const eq = $("#eq");
  const bars = 44;
  for (let i = 0; i < bars; i++) {
    const bar = document.createElement("i");
    bar.style.animationDuration = `${0.7 + Math.random() * 1.4}s`;
    bar.style.animationDelay = `${-Math.random() * 2}s`;
    bar.style.height = `${18 + Math.random() * 82}%`;
    eq.appendChild(bar);
  }

  /* ───────────── TICKER ───────────── */

  const tickerTrack = $("#tickerTrack");
  const tickerItems = BANDS.map((b) => `<span>${esc(b.name)}<b>✦</b></span>`).join("");
  tickerTrack.innerHTML = tickerItems + tickerItems;

  /* ───────────── BANDS ───────────── */

  const bandGrid = $("#bandGrid");
  bandGrid.innerHTML = BANDS.map((b, i) => {
    const members = MEMBERS.filter((m) => m.band === b.id);
    const dots = members.map(() => "<i></i>").join("");
    return `
      <article class="band-card reveal" data-mark="${esc(b.mark)}" data-band="${b.id}"
        style="--c:${b.color};--c2:${b.color2};transition-delay:${i * 40}ms"
        tabindex="0" role="button" aria-label="查看 ${esc(b.name)} 的详情">
        <div class="band-card__top">
          <span class="band-card__jp">${esc(b.jp)}</span>
          <span class="band-card__year">${b.year}</span>
        </div>
        <h3 class="band-card__name">${esc(b.name)}</h3>
        <p class="band-card__tag">${esc(b.tag)}</p>
        <div class="band-card__foot">
          <span class="band-card__dots" aria-hidden="true">${dots}</span>
          <span class="band-card__more">查看详情 <span aria-hidden="true">→</span></span>
        </div>
      </article>`;
  }).join("");

  bandGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".band-card");
    if (card) openBand(card.dataset.band);
  });
  bandGrid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".band-card");
    if (card) {
      e.preventDefault();
      openBand(card.dataset.band);
    }
  });

  /* ───────────── MEMBERS ───────────── */

  const memberGrid = $("#memberGrid");
  const memberChips = $("#memberChips");
  const favNote = $("#favNote");
  let memberFilter = "all";

  memberChips.innerHTML =
    `<button class="chip is-active" type="button" data-band="all" role="tab" aria-selected="true">全部 <span>45</span></button>` +
    BANDS.map(
      (b) =>
        `<button class="chip" type="button" data-band="${b.id}" role="tab" aria-selected="false"
          style="--c:${b.color}">${esc(b.name)}</button>`
    ).join("");

  function renderMembers() {
    const list = memberFilter === "all" ? MEMBERS : MEMBERS.filter((m) => m.band === memberFilter);
    memberGrid.innerHTML = list
      .map((m, i) => {
        const b = bandOf(m.band);
        const key = `${m.band}|${m.name}`;
        const on = favs.has(key);
        return `
          <div class="member${on ? " is-fav" : ""}" style="--c:${b.color};animation-delay:${Math.min(i, 10) * 28}ms"
            data-key="${esc(key)}" data-band="${m.band}">
            <button class="member__fav" type="button" aria-pressed="${on}"
              aria-label="${on ? "取消收藏" : "收藏"} ${esc(m.name)}">✦</button>
            <div class="member__avatar" aria-hidden="true">${esc(initial(m.name))}</div>
            <p class="member__name">${esc(m.name)}</p>
            <p class="member__role">${esc(m.role)}</p>
            <p class="member__band">${esc(b.name)}</p>
          </div>`;
      })
      .join("");
    updateFavNote();
  }

  function updateFavNote() {
    const n = favs.size;
    favNote.textContent = n
      ? `已收藏 ${n} 位推し · 点右上角的 ✦ 可以取消`
      : "还没有收藏的推し，点名字旁边的 ✦ 试试。";
  }

  function toggleFav(key) {
    if (favs.has(key)) favs.delete(key);
    else favs.add(key);
    saveFavs(favs);
    $$(".member", memberGrid).forEach((card) => {
      if (card.dataset.key !== key) return;
      card.classList.toggle("is-fav", favs.has(key));
      card.querySelector(".member__fav").setAttribute("aria-pressed", String(favs.has(key)));
    });
    updateFavNote();
  }

  memberChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    memberFilter = chip.dataset.band;
    $$(".chip", memberChips).forEach((c) => {
      const on = c === chip;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", String(on));
    });
    renderMembers();
  });

  memberGrid.addEventListener("click", (e) => {
    const favBtn = e.target.closest(".member__fav");
    const card = e.target.closest(".member");
    if (!card) return;
    if (favBtn) {
      e.stopPropagation();
      toggleFav(card.dataset.key);
      return;
    }
    const [bandId, name] = card.dataset.key.split("|");
    const m = MEMBERS.find((x) => x.band === bandId && x.name === name);
    if (m) openMember(m);
  });

  renderMembers();

  /* ───────────── SONGS ───────────── */

  const songList = $("#songList");
  const songChips = $("#songChips");
  const songSearch = $("#songSearch");
  const songEmpty = $("#songEmpty");
  let songFilter = "all";
  let playingKey = null;

  songChips.innerHTML =
    `<button class="chip is-active" type="button" data-band="all" role="tab" aria-selected="true">全部</button>` +
    BANDS.map(
      (b) =>
        `<button class="chip" type="button" data-band="${b.id}" role="tab" aria-selected="false"
          style="--c:${b.color}">${esc(b.name)}</button>`
    ).join("");

  function renderSongs() {
    const q = songSearch.value.trim().toLowerCase();
    const list = SONGS.filter((s) => {
      const b = bandOf(s.b);
      const matchBand = songFilter === "all" || s.b === songFilter;
      const hay = `${s.t} ${b.name} ${b.jp}`.toLowerCase();
      return matchBand && (!q || hay.includes(q));
    });
    songList.innerHTML = list
      .map((s, i) => {
        const b = bandOf(s.b);
        const key = `${s.b}|${s.t}`;
        return `
          <li class="song" style="--c:${b.color};animation-delay:${Math.min(i, 12) * 25}ms" data-song="${esc(key)}">
            <button class="song__play" type="button" aria-pressed="false"
              aria-label="试听 ${esc(s.t)}（原创合成片段）">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2 19 12 8 18.8z"/></svg>
              <span class="song__bars" aria-hidden="true"><i></i><i></i><i></i></span>
            </button>
            <span class="song__idx">${String(i + 1).padStart(2, "0")}</span>
            <div>
              <p class="song__title">${esc(s.t)}</p>
              <p class="song__band"><span class="song__dot"></span>${esc(b.name)}</p>
            </div>
            <span class="song__tag">${esc(s.tag)}</span>
          </li>`;
      })
      .join("");
    songEmpty.hidden = list.length > 0;
    markPlaying();
  }

  function markPlaying() {
    $$(".song", songList).forEach((el) => {
      const on = el.dataset.song === playingKey;
      el.classList.toggle("is-playing", on);
      const btn = el.querySelector(".song__play");
      if (btn) btn.setAttribute("aria-pressed", String(on));
    });
  }

  songChips.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    songFilter = chip.dataset.band;
    $$(".chip", songChips).forEach((c) => {
      const on = c === chip;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-selected", String(on));
    });
    renderSongs();
  });
  songSearch.addEventListener("input", renderSongs);
  renderSongs();

  /* ───────────── TIMELINE ───────────── */

  const timeline = $("#timeline");
  timeline.innerHTML = TIMELINE.map(
    (t, i) => `
      <li class="reveal" style="transition-delay:${i * 60}ms">
        <span class="timeline__year">${esc(t.year)}</span>
        <p class="timeline__title">${esc(t.title)}</p>
        <p class="timeline__text">${esc(t.text)}</p>
      </li>`
  ).join("");

  /* ───────────── OMIKUJI ───────────── */

  const omikujiCard = $("#omikujiCard");
  const omikujiAvatar = $("#omikujiAvatar");
  const omikujiBand = $("#omikujiBand");
  const omikujiName = $("#omikujiName");
  const omikujiQuote = $("#omikujiQuote");
  let lastPick = -1;
  let drawing = false;

  function drawOmikuji() {
    if (drawing) return;
    drawing = true;
    omikujiCard.classList.add("is-drawing");

    let idx = Math.floor(Math.random() * MEMBERS.length);
    if (idx === lastPick) idx = (idx + 1 + Math.floor(Math.random() * (MEMBERS.length - 1))) % MEMBERS.length;
    lastPick = idx;
    const m = MEMBERS[idx];
    const b = bandOf(m.band);

    if (navigator.vibrate) navigator.vibrate(10);

    setTimeout(() => {
      omikujiCard.classList.remove("is-drawing");
      omikujiCard.style.setProperty("--c", b.color);
      omikujiCard.classList.add("is-hot");
      omikujiAvatar.textContent = initial(m.name);
      omikujiAvatar.style.setProperty("--c", b.color);
      omikujiBand.textContent = b.name;
      omikujiName.textContent = m.name + (m.alias ? ` · ${m.alias}` : "");
      omikujiQuote.textContent = `「${b.quote}」— ${b.tag}`;
      drawing = false;
    }, 380);
  }

  $("#omikujiBtn").addEventListener("click", drawOmikuji);
  $("#heroOmikuji").addEventListener("click", () => {
    document.getElementById("omikuji").scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(drawOmikuji, 450);
  });

  /* ───────────── 音乐 ───────────── */

  const audio = window.BandoriAudio;
  const audioOK = !!(audio && audio.supported);
  const bgmBtn = $("#bgmToggle");
  const bgmLabel = $(".bgm__label", bgmBtn);
  const toastEl = $("#toast");
  let toastTimer = null;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  function syncAudio(state) {
    const on = !!(state && state.bgm);
    playingKey = (state && state.preview) || null;
    bgmBtn.classList.toggle("is-playing", on);
    bgmBtn.setAttribute("aria-pressed", String(on));
    bgmLabel.textContent = on ? "音乐中" : "BGM";
    markPlaying();
  }

  function hideBgmHint() {
    bgmBtn.classList.add("no-hint");
  }

  if (audioOK) {
    audio.onChange(syncAudio);
    document.addEventListener("pointerdown", hideBgmHint, { once: true, passive: true });
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 40) hideBgmHint();
      },
      { passive: true }
    );
    bgmBtn.addEventListener("click", () => {
      try {
        audio.toggleBgm();
      } catch {
        toast("这台浏览器暂时放不了声音");
        return;
      }
      toast(audio.isBgmOn() ? "BGM 播放中 · 原创合成曲" : "BGM 已暂停");
    });
    songList.addEventListener("click", (e) => {
      const songEl = e.target.closest(".song");
      if (!songEl) return;
      const key = songEl.dataset.song;
      const wasOn = key === playingKey;
      try {
        audio.togglePreview(key, key.split("|")[0]);
      } catch {
        toast("这台浏览器暂时放不了声音");
        return;
      }
      if (wasOn) toast("已停止试听");
      else toast(`试听中 · ${key.split("|")[1]}（原创合成片段）`);
    });
    syncAudio({ bgm: audio.isBgmOn(), preview: null });
  } else {
    bgmBtn.style.display = "none";
  }

  /* ───────────── MODAL ───────────── */

  const modal = $("#modal");
  const modalPanel = $(".modal__panel", modal);
  const modalBody = $("#modalBody");
  let lastFocused = null;

  function openModal(html, color) {
    lastFocused = document.activeElement;
    modalBody.innerHTML = html;
    modalPanel.style.setProperty("--c", color);
    modal.hidden = false;
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => $(".modal__close", modal).focus({ preventScroll: true }));
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("is-locked");
    modalBody.innerHTML = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
  }

  function openBand(id) {
    const b = bandOf(id);
    const members = MEMBERS.filter((m) => m.band === id);
    const songs = SONGS.filter((s) => s.b === id);
    openModal(
      `
      <p class="mb__jp">${esc(b.jp)}</p>
      <h3 class="mb__title" id="modalTitle">${esc(b.name)}</h3>
      <p class="mb__tag">${esc(b.tag)} · ${b.year}</p>
      <hr class="mb__rule" />
      <p class="mb__desc">${esc(b.desc)}</p>
      <p class="mb__sub">MEMBERS</p>
      <div class="mb__members">
        ${members
          .map(
            (m) => `
          <div class="mb__member">
            <i>${esc(initial(m.name))}</i>
            <div><b>${esc(m.name)}${m.alias ? ` <span style="color:var(--muted-2);font-weight:400">/ ${esc(m.alias)}</span>` : ""}</b>
            <small>${esc(m.role)}</small></div>
          </div>`
          )
          .join("")}
      </div>
      <p class="mb__sub">代表曲</p>
      <div class="mb__songs">${songs.map((s) => `<span class="mb__song">${esc(s.t)}</span>`).join("")}</div>
      `,
      b.color
    );
  }

  function openMember(m) {
    const b = bandOf(m.band);
    const key = `${m.band}|${m.name}`;
    const on = favs.has(key);
    openModal(
      `
      <div class="mb--member">
        <div class="mb__bigAvatar" style="--c:${b.color}">${esc(initial(m.name))}</div>
        <p class="mb__jp" style="margin:0">${esc(b.name)}</p>
        <h3 class="mb__title" id="modalTitle">${esc(m.name)}</h3>
        ${m.alias ? `<p class="mb__kana">${esc(m.alias)}</p>` : ""}
        <p class="mb__kana">${esc(m.kana)}</p>
        <p class="mb__meta">担当 · <b>${esc(m.role)}</b></p>
        <p class="mb__quoteBox">「${esc(b.quote)}」<br /><span style="font-size:11.5px;color:var(--muted-2)">— ${esc(b.name)}</span></p>
        <button class="mb__fav${on ? " is-on" : ""}" type="button" data-fav-key="${esc(key)}">
          ${on ? "✦ 已加入推し列表" : "✦ 加入推し列表"}
        </button>
      </div>
      `,
      b.color
    );
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) {
      closeModal();
      return;
    }
    const favBtn = e.target.closest("[data-fav-key]");
    if (favBtn) {
      const key = favBtn.dataset.favKey;
      toggleFav(key);
      const on = favs.has(key);
      favBtn.classList.toggle("is-on", on);
      favBtn.textContent = on ? "✦ 已加入推し列表" : "✦ 加入推し列表";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ───────────── REVEAL + ACTIVE NAV ───────────── */

  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));

    const sections = $$("main section[id]");
    const navLinks = $$(".nav__links a");
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => navIO.observe(s));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* 首屏元素立即显示 */
  requestAnimationFrame(() => {
    $$(".hero, .section__head.reveal").forEach((el) => el.classList.add("is-in"));
  });
})();
