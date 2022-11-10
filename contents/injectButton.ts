
// @ts-ignore
async function main()
{
  const infoSection = document.body.querySelector<HTMLDivElement>('#animes_show .c-info-right');
  let Button = document.body.querySelector<HTMLAnchorElement>(`#play-shiki-online #watch-online-button`);

  if (!infoSection || Button) {
    return;
  }

  const URL = location.href.toString();

  Button = createButton(infoSection);

  const response = await fetch(URL.replace("https://shikimori.one/animes/", "https://shikimori.one/api/animes/"));
  const data = await response.json();

  if (data.status != "anons") {
    Button.textContent = "Открыть в приложении";
    Button.href = URL.replace("https", "anime-lib");
    Button.classList.remove('b-ajax');
    Button.style.cursor = 'pointer';
  }
  else {
    Button.textContent = 'Пока нет серий';
    Button.style.cursor = 'not-allowed';
    Button.classList.remove('b-ajax');
  }

}

function createButton(infoSection: HTMLElement): HTMLAnchorElement
{
  const WatchButtonSection = document.createElement('section');

  WatchButtonSection.classList.add('block');
  WatchButtonSection.classList.add('watch-online-block');
  WatchButtonSection.id = 'play-shiki-online';
  WatchButtonSection.innerHTML = `
        <div class="subheadline m10">Онлайн просмотр</div>
        
        <a id="watch-online-button" class="b-link_button dark b-ajax" style="cursor: wait;user-select: none;">
            <!-- Неразрывный пробел--> <!-- /Неразрывный пробел-->
        </a>
        
        <p style="color:#7b8084;text-align:center">
            <strong><a href="https://github.com/cawa-93/anime-library">anime-library</a></strong>
        </p>
    `;

  const target = infoSection.querySelector('.block[itemprop="aggregateRating"] + .block') || infoSection.querySelector('.block[itemprop="aggregateRating"]');

  if (target) {
    target.after(WatchButtonSection);
  } else {
    infoSection.prepend(WatchButtonSection);
  }

  return WatchButtonSection.querySelector<HTMLAnchorElement>('a#watch-online-button') as HTMLAnchorElement;
}

main();

