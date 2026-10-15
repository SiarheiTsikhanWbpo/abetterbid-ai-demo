import { industries, conversations, channels, metrics, followups } from './data.js?v=20261015-client';

const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  messages: '<path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-3 3V9.5A7.5 7.5 0 0 1 9.5 2h4A7.5 7.5 0 0 1 21 9.5z"/><path d="M7 8h9M7 12h6"/>',
  sparkles: '<path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7zM20 2v4M18 4h4"/>',
  chart: '<path d="M4 3v17h17M8 15l4-5 4 3 5-8"/>',
  book: '<path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1v15"/>',
  chevrons: '<path d="m9 8 3-3 3 3m-6 8 3 3 3-3"/>',
  arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>',
  'arrow-up': '<path d="M6 18 18 6M6 6h12v12"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 1-2 3m0 3h.01"/>',
  play: '<path d="m9 5 11 7-11 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  next: '<path d="m5 5 10 7-10 7zM19 5v14"/>',
  settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="3" fill="currentColor" stroke="none"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  phone: '<path d="M8 3H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-4l-5-2-2 3a14 14 0 0 1-7-7l3-2z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18M7 15h2m4 0h2"/>',
  shield: '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m1-17a4 4 0 0 1 0 8m3 9v-3a5 5 0 0 0-3-5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/>',
  search: '<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',
  sound: '<path d="m11 4-6 5H2v6h3l6 5zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  mute: '<path d="m11 4-6 5H2v6h3l6 5zM16 9l6 6m-6 0 6-6"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
  headset: '<path d="M3 14v-3a9 9 0 0 1 18 0v7c0 3-3 4-6 4"/><rect x="2" y="10" width="5" height="9" rx="2"/><rect x="17" y="10" width="5" height="9" rx="2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  reset: '<path d="M3 10a9 9 0 1 1 1 7M3 3v7h7"/>',
};
const icon = (name, extra = '') => `<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] ?? paths.messages}</svg>`;
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const main = document.querySelector('#main');
const titles = { overview: 'Демо', conversations: 'Диалоги', agent: 'AI-ассистент', analytics: 'Аналитика', knowledge: 'База знаний' };
let saved = {};
try { saved = JSON.parse(localStorage.getItem('abb-ai-demo-v1') ?? '{}') ?? {}; } catch { /* Storage can be unavailable. */ }
const state = {
  company: typeof saved.company === 'string' && saved.company.trim() ? saved.company.trim().slice(0, 40) : 'A Better Bid',
  industry: Object.hasOwn(industries, saved.industry) ? saved.industry : 'onboarding',
  view: 'overview', period: 'today', channel: 'voice', count: 2, started: false, running: false, handoff: false, sound: false,
  search: '', filter: 'all', status: 'all', knowledgeSearch: '',
};
let timer;
let toastTimer;
let runVersion = 0;
let settingsOpener;
const fmt = (n) => new Intl.NumberFormat('ru-RU').format(n);
const fixture = () => industries[state.industry];
const text = (value) => value.replaceAll('{company}', state.company);
const channelIcon = (channel) => channel === 'voice' ? 'phone' : 'messages';

function hydrate(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
  root.querySelectorAll('[data-company]').forEach((el) => { el.textContent = state.company; });
}

function toast(message) {
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('visible'), 4200);
}

function periodControl() {
  return `<div class="period-select"><label for="period" aria-label="Период показателей">${icon('calendar')}</label><select id="period" aria-label="Период показателей">${[['today', 'Сегодня'], ['week', '7 дней'], ['month', '30 дней']].map(([key, label]) => `<option value="${key}" ${state.period === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div>`;
}

function pageHeading(title, subtitle, action = '') {
  return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}

function metricCards() {
  const m = metrics[state.period];
  const cards = [
    ['messages', 'Всего обращений', m.total, '', '3 канала', 'единый контекст', '3,24 14,18 24,21 34,10 45,14 55,7 66,12 77,3'],
    ['messages', 'Каналы для клиента', '3', '', 'Звонок · SMS · WhatsApp', 'выбор клиента', '3,25 14,22 24,23 34,16 45,18 55,9 66,11 77,3'],
    ['clock', 'Средний диалог', m.duration, '', 'Пример', 'длительность сценария', '3,5 14,11 24,8 34,18 45,15 55,24 66,20 77,27'],
    ['star', 'Оценка сервиса', m.rating, '/ 5', 'Обратная связь', 'пример оценки', '3,25 14,18 24,20 34,10 45,13 55,8 66,9 77,4'],
  ];
  return `<section class="metric-grid" aria-label="Демонстрационные показатели">${cards.map(([i, label, value, unit, badge, note, points]) => `<article class="metric-card"><div class="metric-label">${icon(i)}${label}</div><div class="metric-number">${value}<span>${unit}</span></div><svg class="sparkline" viewBox="0 0 80 32" aria-hidden="true"><polyline points="${points}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><div class="metric-note"><b>${badge}</b><span>${note}</span></div></article>`).join('')}</section>`;
}

function voiceArt() {
  return '<div class="voice-art" aria-hidden="true"><img src="./assets/auction-car.svg" width="440" height="310" alt=""></div>';
}

function studio() {
  return `<section class="studio-grid ${state.view === 'agent' ? 'full-studio' : ''}" aria-label="Интерактивная демонстрация">
    <article class="studio-card ${state.running ? 'is-running' : ''}">
      <div class="studio-top"><span class="eyebrow">ПОПРОБУЙТЕ В ДЕЙСТВИИ</span><label class="sr-only" for="scenario">Сценарий поддержки</label><select id="scenario" class="scenario-select">${Object.entries(industries).map(([key, v]) => `<option value="${key}" ${key === state.industry ? 'selected' : ''}>${v.name}</option>`).join('')}</select></div>
      <h2>Один вопрос.<br><span>Понятный ответ.</span></h2>
      <p>Отвечает на вопросы в звонке.<br>Присылает детали в SMS или WhatsApp.<br>Живая поддержка — по вашему запросу.</p>
      ${voiceArt()}
      <div class="orbit-tag">${icon('database')}Ответы и детали под рукой</div>
      <div class="studio-actions"><button class="button primary" data-action="start">${icon(state.running ? 'pause' : 'play')}<span id="start-label">${state.running ? 'Приостановить' : 'Запустить сценарий'}</span></button><span class="studio-hint">${esc(fixture().topic)} · ~40 секунд</span></div>
      <div class="studio-bottom"><span>${icon('check-circle')}3 готовых сценария</span><span>${icon('shield')}Вымышленные данные</span></div>
    </article>
    <article class="conversation-card" aria-label="Демо-студия">
      <div class="card-heading"><div><span class="eyebrow">ДЕМО-СТУДИЯ</span><h2>${icon('headset')}Смотрите, как это работает</h2></div><span class="studio-mode">Готовый сценарий</span></div>
      <div class="channel-tabs" role="group" aria-label="Канал сценария">${Object.entries(channels).map(([key, label]) => `<button data-channel="${key}" aria-pressed="${state.channel === key}" class="${state.channel === key ? 'active' : ''}">${icon(channelIcon(key))}${label}</button>`).join('')}</div>
      <div class="conversation-header"><span class="client-avatar">${fixture().initials}</span><span class="client-identity"><strong>${fixture().client}</strong><small>${esc(fixture().topic)}</small><small id="session-description">${channelDescription()}</small></span><span class="session-state" id="session-state" role="status" aria-live="polite" aria-atomic="true"><span class="dot"></span>Предпросмотр</span></div>
      <div class="playback"><button class="play-button" data-action="start" aria-label="Запустить или приостановить сценарий">${icon('play')}</button><div class="waveform" aria-hidden="true">${Array.from({ length: 50 }, (_, i) => `<i style="height:${5 + Math.round((Math.sin(i * 2.7) + 1) * 7 + (Math.sin(i * .3) + 1) * 3)}px"></i>`).join('')}</div><span class="playback-time" id="playback-progress">2 / 7</span><button class="icon-button" data-action="next" aria-label="Следующая реплика">${icon('next')}</button></div>
      <div class="transcript" id="transcript" role="log" tabindex="0" aria-label="Демонстрационный диалог" aria-live="polite" aria-relevant="additions"></div>
      <div class="conversation-controls"><button class="message-preview-button" data-action="message-preview">${icon('messages')}Информация в SMS / WhatsApp ${icon('arrow')}</button><div class="control-row"><button class="text-button" data-action="handoff">${icon('users')}Связаться с поддержкой</button><button class="sound-button" data-action="sound" aria-pressed="false">${icon('mute')}Озвучка</button><button class="text-button" data-action="finish">Весь диалог ${icon('arrow')}</button></div><a class="policy-source" href="${esc(fixture().sourceUrl)}" target="_blank" rel="noopener noreferrer">${icon('book')}${esc(fixture().sourceLabel)} ${icon('arrow-up')}</a></div>
    </article>
  </section>`;
}

function channelDescription() {
  return state.channel === 'voice' ? 'Звонок · текстовый предпросмотр' : `${channels[state.channel]} · отправка отключена`;
}

function bubble(role, content, index, scenario = fixture()) {
  const policy = scenario.policyMessages.includes(index);
  const source = role === 'agent' && (index === 2 || policy);
  return `<div class="bubble ${role}"><div class="bubble-label">${role === 'agent' ? icon('sparkles') + 'ABB · AI-ассистент' : 'Клиент'}</div><div class="bubble-text">${esc(text(content))}</div>${source ? `<div class="source-line">${icon('check-circle')}${policy ? `<a href="${esc(scenario.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(scenario.sourceLabel)} ↗</a>` : esc(scenario.source)}</div>` : ''}</div>`;
}

function handoffNote(scenario = fixture()) {
  return `<div class="handoff-note"><span>${icon('users')}Предпросмотр связи с поддержкой</span><strong>${esc(scenario.context)} · ${esc(scenario.ref)}</strong>Причина: клиент попросил сотрудника. Контекст и история диалога подготовлены. Реальный оператор не вызывается.</div>`;
}

function updateStudio({ reset = false } = {}) {
  const transcript = document.querySelector('#transcript');
  if (!transcript) return;
  const nearBottom = transcript.scrollHeight - transcript.scrollTop - transcript.clientHeight < 48;
  if (reset) transcript.replaceChildren();
  const existing = transcript.querySelectorAll('.bubble').length;
  fixture().messages.slice(existing, state.count).forEach(([role, content], offset) => transcript.insertAdjacentHTML('beforeend', bubble(role, content, existing + offset)));
  transcript.querySelector('.handoff-note')?.remove();
  if (state.handoff) transcript.insertAdjacentHTML('beforeend', handoffNote());
  if (reset || nearBottom) transcript.scrollTop = transcript.scrollHeight;
  const status = document.querySelector('#session-state');
  const done = state.count === fixture().messages.length;
  status.className = `session-state ${state.running ? 'running' : ''}`;
  status.innerHTML = `<span class="dot"></span>${state.handoff ? 'Поддержка' : state.running ? 'Сценарий идёт' : done ? 'Завершено' : !state.started ? 'Предпросмотр' : 'Пауза'}`;
  document.querySelector('#start-label').textContent = state.running ? 'Приостановить' : done || state.handoff ? 'Повторить сценарий' : state.started ? 'Продолжить сценарий' : 'Запустить сценарий';
  document.querySelector('[data-action="start"] .icon').outerHTML = icon(state.running ? 'pause' : done ? 'reset' : 'play');
  const play = document.querySelector('.play-button');
  play.innerHTML = icon(state.running ? 'pause' : done ? 'reset' : 'play');
  play.setAttribute('aria-label', state.running ? 'Приостановить сценарий' : done || state.handoff ? 'Повторить сценарий' : state.started ? 'Продолжить сценарий' : 'Запустить сценарий');
  document.querySelector('.studio-card').classList.toggle('is-running', state.running);
  document.querySelector('#playback-progress').textContent = `${state.count} / ${fixture().messages.length}`;
  document.querySelectorAll('.waveform i').forEach((bar, i) => bar.classList.toggle('played', i / 50 < state.count / fixture().messages.length));
  document.querySelector('[data-action="next"]').disabled = done || state.handoff;
  document.querySelector('[data-action="handoff"]').disabled = state.handoff;
  document.querySelector('[data-action="finish"]').disabled = state.handoff || done;
  const sound = document.querySelector('[data-action="sound"]');
  sound.innerHTML = `${icon(state.sound ? 'sound' : 'mute')}Озвучка`;
  sound.setAttribute('aria-pressed', String(state.sound));
}

function stop() {
  clearTimeout(timer);
  runVersion += 1;
  state.running = false;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function speak(content) {
  if (!state.sound || !('speechSynthesis' in window)) return;
  const voice = window.speechSynthesis.getVoices().find((v) => /^ru/i.test(v.lang) && v.localService);
  if (!voice) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text(content));
  utterance.lang = 'ru-RU'; utterance.voice = voice; utterance.rate = 1.05;
  window.speechSynthesis.speak(utterance);
}

function tick(version) {
  if (version !== runVersion || !state.running) return;
  const message = fixture().messages[state.count];
  if (!message) { stop(); updateStudio(); return; }
  state.count += 1;
  speak(message[1]);
  updateStudio();
  timer = setTimeout(() => {
    if (version !== runVersion) return;
    if (state.count >= fixture().messages.length) { stop(); updateStudio(); }
    else tick(version);
  }, Math.max(2500, Math.min(12000, text(message[1]).length * (state.sound ? 85 : 38))));
}

function start() {
  if (state.running) { stop(); updateStudio(); return; }
  const restart = !state.started || state.count >= fixture().messages.length || state.handoff;
  if (restart) { state.count = 0; state.handoff = false; }
  state.started = true;
  state.running = true;
  runVersion += 1;
  updateStudio({ reset: restart });
  tick(runVersion);
  if (window.matchMedia('(max-width: 980px)').matches) {
    document.querySelector('.conversation-card').scrollIntoView({ block: 'start', behavior: 'instant' });
    document.querySelector('.play-button').focus({ preventScroll: true });
  }
}

function chart() {
  const m = metrics[state.period];
  const peak = Math.max(...m.ai, ...m.human);
  const magnitude = 10 ** Math.floor(Math.log10(peak / 4));
  const step = Math.ceil(peak / 4 / magnitude) * magnitude;
  const coords = (arr) => arr.map((v, i) => [40 + i * 75, 154 - v / (step * 4) * 128]);
  const line = (arr) => coords(arr).map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const points = coords(m.ai);
  return `<article class="panel"><div class="card-heading"><div><h2>Динамика обращений</h2><p>${m.chartLabel}</p></div><div class="chart-legend"><span><i class="legend-line"></i>AI-ассистент</span><span><i class="legend-line dashed"></i>Оператор</span></div></div><div class="line-chart"><svg viewBox="0 0 510 170" role="img" aria-label="${esc(m.chartLabel)}: нагрузка AI и оператора. Точные значения доступны в таблице под графиком."><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#70baff" stop-opacity=".35"/><stop offset="1" stop-color="#70baff" stop-opacity="0"/></linearGradient></defs>${[26, 58, 90, 122, 154].map((y, i) => `<line x1="40" x2="500" y1="${y}" y2="${y}" stroke="#e9ede5" stroke-dasharray="3 5"/><text x="0" y="${y + 3}" fill="#6b7569" font-size="9" font-family="Manrope, sans-serif">${fmt(step * (4 - i))}</text>`).join('')}<path d="${line(m.ai)} L490,154 L40,154Z" fill="url(#chart-fill)"/><path d="${line(m.human)}" fill="none" stroke="#99aec4" stroke-width="1.8" stroke-dasharray="4 5" stroke-linejoin="round"/><path d="${line(m.ai)}" fill="none" stroke="#0875dc" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>${points.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="#0875dc" stroke-width="1.5"><title>${m.labels[i]}: AI ${m.ai[i]}, оператор ${m.human[i]}</title></circle>`).join('')}</svg><div class="chart-labels">${m.labels.map((label) => `<span>${label}</span>`).join('')}</div></div><div class="chart-summary"><span>Удобный способ получить ответ</span><b>Голос, сообщения и поддержка рядом ${icon('arrow-up').replace('class="icon ', 'class="icon inline-icon ')}</b></div><details class="chart-data"><summary>Посмотреть данные графика</summary><table><caption class="sr-only">Пример нагрузки, условные значения</caption><thead><tr><th scope="col">Интервал</th><th scope="col">AI-ассистент</th><th scope="col">Оператор</th></tr></thead><tbody>${m.labels.map((label, i) => `<tr><th scope="row">${label}</th><td>${m.ai[i]}</td><td>${m.human[i]}</td></tr>`).join('')}</tbody></table></details></article>`;
}

function channelPanel() {
  const m = metrics[state.period];
  return `<article class="panel"><div class="card-heading"><div><h2>В удобном клиенту канале</h2><p>Спросить голосом. Сохранить детали в сообщении.</p></div>${icon('messages')}</div><div class="channel-content"><div class="donut"><svg viewBox="0 0 120 120" role="img" aria-label="Пример распределения: звонки 55 процентов, WhatsApp 33 процента, SMS 12 процентов"><circle cx="60" cy="60" r="48" fill="none" stroke="#f0f3ea" stroke-width="13"/><circle cx="60" cy="60" r="48" fill="none" stroke="#1477cc" stroke-width="13" stroke-dasharray="161 302"/><circle cx="60" cy="60" r="48" fill="none" stroke="#6ab1f0" stroke-width="13" stroke-dasharray="94 302" stroke-dashoffset="-166"/><circle cx="60" cy="60" r="48" fill="none" stroke="#c5e1fa" stroke-width="13" stroke-dasharray="32 302" stroke-dashoffset="-265"/></svg><div class="donut-label"><strong>${m.total}</strong><small>обращений</small></div></div><div class="channel-list">${[['voice', '55', m.split[0]], ['whatsapp', '33', m.split[1]], ['sms', '12', m.split[2]]].map(([key, percentage, count]) => `<div class="channel-item"><span>${icon(channelIcon(key))}${channels[key]}</span><strong>${percentage}%</strong><small>${fmt(count)} обращений · пример</small></div>`).join('')}</div></div><div class="channels-foot">${icon('check-circle')}История сохраняется при смене канала</div></article>`;
}

function statusBadge(status) {
  return `<span class="status ${status}">${icon(status === 'resolved' ? 'check' : 'users')}${status === 'resolved' ? 'Ответ дан' : 'Поддержка'}</span>`;
}

function table(rows, full = false) {
  return `<div class="table-wrapper"><table class="conversation-table"><caption class="sr-only">Вымышленные примеры клиентских обращений</caption><thead><tr><th scope="col">Клиент</th><th scope="col">Канал</th><th scope="col" class="optional-column">Тема обращения</th><th scope="col">Результат</th><th scope="col" class="optional-column">Длительность</th><th scope="col" class="optional-column">Время</th><th scope="col"><span class="sr-only">Открыть диалог</span></th></tr></thead><tbody>${rows.map((row) => `<tr><td><div class="table-client"><span class="client-avatar">${row.initials}</span><div><button class="row-details-link" data-open="${row.id}" aria-label="Открыть диалог ${row.id}, ${row.name}">${row.name}</button><small>${row.id}</small></div></div></td><td><span class="channel-cell">${icon(channelIcon(row.channel))}${channels[row.channel]}</span></td><td class="optional-column">${row.topic}</td><td>${statusBadge(row.status)}</td><td class="optional-column">${row.duration}</td><td class="optional-column muted">${row.time}</td><td><button class="row-open" data-open="${row.id}" aria-label="Подробнее о диалоге ${row.id}">${icon('arrow-up')}</button></td></tr>`).join('') || '<tr><td colspan="7"><div class="empty-state">Нет диалогов по этому запросу. Попробуйте изменить фильтры.</div></td></tr>'}</tbody></table></div>${full ? `<div class="table-count">Найдено ${rows.length} из ${conversations.length} · вымышленные примеры</div>` : ''}`;
}

function buyerContext() {
  const visual = fixture().visual;
  return `<section class="buyer-context" aria-label="Вымышленный контекст покупателя"><div class="buyer-context-title"><span class="context-icon">${icon(state.industry === 'onboarding' ? 'user' : 'database')}</span><span><strong>${esc(visual.title)}</strong><small>${esc(visual.subtitle)}</small></span></div><ol class="buyer-steps">${visual.items.map(([label, status], i) => `<li class="${status}"><span class="step-marker">${status === 'done' ? icon('check') : i + 1}</span><span>${esc(label)}<small>${status === 'done' ? 'Завершено в демо' : status === 'active' ? 'Текущий этап' : 'Следующий этап'}</small></span></li>`).join('')}</ol></section>`;
}

function publicationNotice() {
  return '<p class="publication-notice">Неофициальный демонстрационный проект. Не является сервисом A Better Bid. Все профили, лоты и показатели вымышлены.</p>';
}

function overview() {
  return `<div class="overview-intro"><span class="intro-kicker">A BETTER BID / AI-АССИСТЕНТ</span>${pageHeading('Помощь — рядом.<br><span>Детали — под рукой.</span>', 'Ответы в звонке, детали — в SMS или WhatsApp. Можно обратиться к живой поддержке.')}</div>${studio()}${followupCard()}${publicationNotice()}${buyerContext()}<div class="section-heading"><div><span class="eyebrow">УДОБСТВО ОБЩЕНИЯ</span><h2>Как клиентам удобнее общаться.</h2><p>Иллюстративные показатели — пример будущего кабинета.</p></div>${periodControl()}</div>${metricCards()}<section class="insight-grid" aria-label="Обзор каналов и нагрузки">${chart()}${channelPanel()}</section><section class="panel recent-panel"><div class="card-heading"><div><h2>За каждым диалогом — человек</h2><p>Последние обращения · пример рабочего дня</p></div><a class="text-button" href="#conversations">Все диалоги ${icon('arrow')}</a></div>${table(conversations.slice(0, 4))}</section>`;
}

function filteredConversations() {
  return conversations.filter((row) => (state.filter === 'all' || row.channel === state.filter) && (state.status === 'all' || row.status === state.status) && `${row.name} ${row.topic} ${row.id}`.toLocaleLowerCase('ru').includes(state.search.toLocaleLowerCase('ru')));
}

function conversationView() {
  return `${pageHeading('Каждый разговор — на виду.', 'Контекст, результат и история клиента в одном пространстве.', `<button class="button secondary" data-action="export">${icon('download')}Экспорт примеров</button>`)}<div class="filter-bar"><div class="search-field"><label class="sr-only" for="conversation-search">Поиск диалогов</label>${icon('search')}<input id="conversation-search" type="search" placeholder="Имя, тема или номер диалога" value="${esc(state.search)}"></div><label class="sr-only" for="channel-filter">Фильтр по каналу</label><select id="channel-filter" class="filter-select">${[['all', 'Все каналы'], ...Object.entries(channels)].map(([key, label]) => `<option value="${key}" ${key === state.filter ? 'selected' : ''}>${label}</option>`).join('')}</select><label class="sr-only" for="status-filter">Фильтр по результату</label><select id="status-filter" class="filter-select">${[['all', 'Все результаты'], ['resolved', 'Ответ дан'], ['handoff', 'С поддержкой']].map(([key, label]) => `<option value="${key}" ${key === state.status ? 'selected' : ''}>${label}</option>`).join('')}</select></div><section class="panel recent-panel" id="conversation-results" aria-label="Результаты поиска диалогов" aria-live="polite">${table(filteredConversations(), true)}</section>`;
}

function agentView() {
  return `${pageHeading('AI-ассистент для удобства клиента.', 'Ответит на вопросы в звонке, подготовит детали в сообщении и поможет связаться с поддержкой.', `<button class="button secondary" data-action="settings">${icon('settings')}Настроить компанию</button>`)}${studio()}${followupCard()}${buyerContext()}<section class="feature-grid" aria-label="Как ассистент помогает клиенту">${[
    ['phone', 'Ответить в звонке', 'Клиент задаёт вопрос обычными словами. Ассистент объясняет порядок действий и отвечает по доступным данным.'],
    ['messages', 'Прислать детали', 'Ссылка, инструкция или краткий итог разговора — в SMS или WhatsApp, чтобы не записывать информацию на слух.'],
    ['users', 'Поддержка рядом', 'Клиент может обратиться к сотруднику. Ассистент помогает передать вопрос и контекст разговора.'],
  ].map(([i, title, description]) => `<article class="feature-card"><span class="feature-icon">${icon(i)}</span><h2>${title}</h2><p>${description}</p></article>`).join('')}</section><section class="panel agent-policies"><div class="card-heading"><h2>Ассистент и поддержка — рядом с клиентом</h2></div><ul><li>${icon('check-circle')}Представляется AI-ассистентом в начале разговора</li><li>${icon('shield')}Отвечает по данным и объясняет, если их недостаточно</li><li>${icon('messages')}Помогает сохранить нужную информацию в удобном канале</li><li>${icon('users')}Сотрудник поддержки доступен как следующий шаг по желанию клиента</li></ul></section>`;
}

function analyticsView() {
  return `${pageHeading('Общение глазами клиента.', 'Какие каналы удобны покупателям и как проходит обращение.', periodControl())}<div class="analytics-note">${icon('info')}Иллюстративные показатели. Они показывают возможности интерфейса и не являются результатами действующего сервиса.</div>${metricCards()}<section class="insight-grid" aria-label="Аналитика обращений">${chart()}${channelPanel()}</section><section class="feature-grid">${[
    ['phone', 'Вопросы в звонке', 'Объяснить голосом, уточнить детали и понять следующий шаг без поиска по разделам сайта.'],
    ['messages', 'Информация под рукой', 'Получить ссылку или памятку в SMS или WhatsApp и вернуться к ней после разговора.'],
    ['users', 'Живая поддержка', 'Обратиться к сотруднику, когда нужна дополнительная помощь или персональное решение.'],
  ].map(([i, title, description]) => `<article class="feature-card"><span class="feature-icon">${icon(i)}</span><h2>${title}</h2><p>${description}</p></article>`).join('')}</section>`;
}

function knowledgeCards() {
  const rows = fixture().questions.filter(([q, a]) => `${q} ${a}`.toLocaleLowerCase('ru').includes(state.knowledgeSearch.toLocaleLowerCase('ru')));
  return rows.map(([q, a, url], i) => `<details class="knowledge-card" ${i < 2 ? 'open' : ''}><summary>${esc(q)}</summary><div class="knowledge-meta">${icon('check-circle')}${url ? 'Публичная справка A Better Bid' : 'Вымышленный демо-статус'}</div><p>${esc(a)}</p>${url ? `<a class="knowledge-source" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Открыть официальный источник ${icon('arrow-up')}</a>` : ''}</details>`).join('') || '<div class="empty-state">Материалов по этому запросу нет. Попробуйте другое слово.</div>';
}

function knowledgeView() {
  return `${pageHeading('Точные ответы начинаются здесь.', 'Понятные источники и правила вместо догадок.', `<button class="button secondary" data-action="settings">${icon('settings')}Выбрать сценарий</button>`)}<section class="view-intro">${icon('book')}<div><h2>${esc(state.company)} · ${esc(fixture().name)}</h2><p>Так может выглядеть база знаний вашей компании: ответы покупателям, контекст лота и правила передачи специалистам. Правила ниже основаны на публичном центре помощи; статусы профилей и лотов вымышлены.</p></div></section><div class="filter-bar"><div class="search-field"><label class="sr-only" for="knowledge-search">Поиск по базе знаний</label>${icon('search')}<input id="knowledge-search" type="search" placeholder="Найти ответ или правило" value="${esc(state.knowledgeSearch)}"></div></div><section class="knowledge-grid" id="knowledge-results" aria-label="Материалы базы знаний" aria-live="polite">${knowledgeCards()}</section><div class="analytics-note">${icon('shield')}Перед пилотом загружаются ваши согласованные материалы. Интеграции и правила проверяются отдельно.</div>`;
}

function render() {
  document.querySelector('#breadcrumb').textContent = titles[state.view];
  document.querySelectorAll('[data-view]').forEach((el) => {
    const active = el.dataset.view === state.view;
    el.classList.toggle('active', active);
    if (active) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    el.setAttribute('aria-label', titles[el.dataset.view]);
  });
  const views = { overview, conversations: conversationView, agent: agentView, analytics: analyticsView, knowledge: knowledgeView };
  main.innerHTML = views[state.view]();
  hydrate(); updateStudio();
}

function route() {
  const view = location.hash.slice(1) || 'overview';
  const next = Object.hasOwn(titles, view) ? view : 'overview';
  stop(); state.view = next; render(); window.scrollTo({ top: 0, behavior: 'instant' });
}

function openDialog(id) {
  stop(); updateStudio();
  const dialog = document.querySelector(`#${id}`);
  hydrate(dialog); dialog.showModal();
}

function settings() {
  settingsOpener = document.activeElement;
  document.querySelector('#company-name').value = state.company;
  document.querySelector('#industry').value = state.industry;
  openDialog('settings-dialog');
}

function showDetail(id) {
  const row = conversations.find((item) => item.id === id);
  if (!row) return;
  const base = industries[row.industry];
  const ref = row.ref ?? base.ref;
  const scenario = {
    ...base, ...row,
    ref,
    source: base.source.replaceAll(base.ref, ref),
    messages: row.messages ?? base.messages.map(([role, content]) => [role, content.replaceAll(base.ref, ref)]),
  };
  const handed = row.status === 'handoff';
  // A handoff record has its own coherent transcript, not a resolved conversation.
  const messages = handed ? [
    ['agent', 'Здравствуйте! Я AI-ассистент компании «{company}». Чем могу помочь?'],
    ['client', `Пожалуйста, подключите специалиста. ${scenario.context}. Номер: ${scenario.ref}.`],
    ['agent', 'Подготовлю для сотрудника историю разговора и номер вашего демо-лота.'],
  ] : scenario.messages;
  document.querySelector('#detail-dialog').innerHTML = `<div class="dialog-top"><span class="eyebrow">ПРИМЕР ДИАЛОГА · ${row.id}</span><button class="icon-button" data-close aria-label="Закрыть диалог">${icon('close')}</button></div><h2 id="detail-title">${row.topic}</h2><div class="detail-meta"><span>${row.name}</span><span>${channels[row.channel]}</span><span>${row.duration}</span>${statusBadge(row.status)}</div><div class="transcript">${messages.map(([role, content], i) => bubble(role, content, i, scenario)).join('')}${handed ? handoffNote(scenario) : ''}</div><div class="detail-result"><strong>${handed ? 'Контекст подготовлен для сотрудника' : scenario.outcome}</strong>${esc(scenario.source)}. Вымышленный пример; сообщения не отправлялись.</div><div class="dialog-actions"><button class="button secondary" data-close>Закрыть</button><button class="button primary" data-action="load-scenario" data-industry="${row.industry}" data-channel="${row.channel}">Общий сценарий по теме ${icon('arrow')}</button></div>`;
  openDialog('detail-dialog');
}

function messagePreviewBody(channel) {
  return `<span class="message-recipient">${esc(fixture().client)} · ${esc(fixture().ref)}</span><p>${esc(followups[state.industry][channel])}</p><a href="${esc(fixture().sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(fixture().sourceLabel)} ${icon('arrow-up')}</a>`;
}

function messagePreviews() {
  return `<div class="message-preview-grid">${['whatsapp', 'sms'].map((channel) => `<article class="message-device channel-${channel}" aria-label="${channels[channel]}: пример сообщения"><div class="message-device-header">${icon('messages')}<h3>${channels[channel]}</h3><span>${channel === 'whatsapp' ? 'Подробности и ссылка' : 'Короткая памятка'}</span></div><div class="message-preview">${messagePreviewBody(channel)}</div><span class="message-device-footer">${icon('check-circle')}${channel === 'whatsapp' ? 'Можно вернуться к деталям после звонка' : 'Главное — в коротком сообщении'}</span></article>`).join('')}</div>`;
}

function followupCard() {
  return `<section class="followup-card" aria-label="Информация после звонка"><div class="followup-copy"><span class="eyebrow">ЗВОНОК → WHATSAPP И SMS</span><h2>WhatsApp и SMS —<br>информация под рукой.</h2><p>Развёрнутый итог со ссылкой в WhatsApp или короткая памятка в SMS. Клиент выбирает удобный канал.</p></div>${messagePreviews()}<span class="preview-disclaimer">Два готовых образца на вымышленных данных. Отправка отключена.</span></section>`;
}

function messageDialog() {
  document.querySelector('#message-dialog').innerHTML = `<div class="dialog-top"><span class="eyebrow">ПОСЛЕ РАЗГОВОРА</span><button class="icon-button" data-close aria-label="Закрыть примеры сообщений">${icon('close')}</button></div><h2 id="message-title">Итог в WhatsApp и SMS.</h2><p class="muted">Два образца одного разговора: подробности в WhatsApp и короткая памятка в SMS. Клиент выбирает удобный канал.</p>${messagePreviews()}<p class="preview-disclaimer">Это готовые образцы на вымышленных данных. Сообщения не отправляются, номер телефона не запрашивается.</p><div class="dialog-actions"><button class="button secondary" data-close>Вернуться к разговору</button></div>`;
  openDialog('message-dialog');
}

function presentation() {
  document.querySelector('#presentation-dialog').innerHTML = `<div class="dialog-top"><span class="eyebrow">A BETTER BID / КЛИЕНТСКИЙ AI-АССИСТЕНТ</span><button class="icon-button" data-close aria-label="Закрыть презентацию">${icon('close')}</button></div><div class="presentation-hero"><h2 id="presentation-title">Помощь — рядом.<br>Детали — под рукой.</h2><p class="presentation-lead">AI-ассистент для «${esc(state.company)}» помогает клиенту получить ответ в звонке, сохранить нужную информацию в SMS или WhatsApp и обратиться к сотруднику поддержки.</p></div><div class="flow" role="img" aria-label="Путь клиента: вопрос в звонке, ответ ассистента, информация в SMS или WhatsApp; сотрудник поддержки рядом"><div class="flow-node">${icon('phone')}Вопрос в звонке</div>${icon('arrow')}<div class="flow-node">${icon('sparkles')}Понятный ответ</div>${icon('arrow')}<div class="flow-node">${icon('messages')}Детали в SMS / WhatsApp</div>${icon('arrow')}<div class="flow-node">${icon('users')}Поддержка рядом</div></div><div class="presentation-grid"><article class="presentation-item"><span>01 / СПРОСИТЬ</span><h3>Ответ в разговоре</h3><p>Клиент задаёт вопрос о регистрации, доставке или документах и получает объяснение по доступным данным.</p></article><article class="presentation-item"><span>02 / СОХРАНИТЬ</span><h3>Информация с собой</h3><p>Инструкция, ссылка или итог разговора приходит в выбранный канал. Ничего не нужно записывать на слух.</p></article><article class="presentation-item"><span>03 / ОБРАТИТЬСЯ</span><h3>Сотрудник рядом</h3><p>Клиент может продолжить с живой поддержкой. Ассистент помогает передать вопрос и историю общения.</p></article></div><p class="presentation-foot"><strong>Что показываем сейчас:</strong> готовые русские диалоги и предпросмотр сообщений на вымышленных данных.<br><strong>Следующий шаг:</strong> согласовать источники, телефонию и каналы отправки, затем проверить клиентский путь на пилоте. Реальные звонки, CRM и отправка сообщений в этом демо отключены.</p><p class="presentation-document"><a href="./capabilities.md" download>Скачать Markdown: возможности и примеры данных ↗</a></p><div class="dialog-actions"><button class="button secondary" data-action="presentation-settings">Под мою компанию ${icon('settings')}</button><button class="button primary" data-action="presentation-start">Посмотреть сценарий ${icon('play')}</button></div>`;
  openDialog('presentation-dialog');
}

function setIndustry(value) {
  if (!Object.hasOwn(industries, value)) return;
  stop(); state.industry = value; state.count = 2; state.started = false; state.handoff = false; state.knowledgeSearch = '';
  persist(); render();
}

function persist() {
  try { localStorage.setItem('abb-ai-demo-v1', JSON.stringify({ company: state.company, industry: state.industry })); }
  catch { toast('Настройки применены на эту сессию. Хранилище браузера недоступно.'); }
}

function exportExamples() {
  const csvCell = (v) => `"${String(v).replaceAll('"', '""')}"`;
  const rows = [['ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ — вымышленные примеры'], ['Номер', 'Клиент', 'Канал', 'Тема', 'Результат', 'Длительность'], ...filteredConversations().map((r) => [r.id, r.name, channels[r.channel], r.topic, r.status === 'resolved' ? 'Ответ дан' : 'Поддержка', r.duration])];
  const blob = new Blob(['\uFEFF' + rows.map((row) => row.map(csvCell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'abetterbid-demo-conversations.csv'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Экспортировано примеров: ${filteredConversations().length}`);
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.classList.contains('skip-link')) { event.preventDefault(); main.focus(); main.scrollIntoView(); return; }
  if (target.hasAttribute('data-close')) { target.closest('dialog').close(); return; }
  if (target.dataset.open) { showDetail(target.dataset.open); return; }
  if (target.matches('.channel-tabs button[data-channel]')) {
    stop(); state.channel = target.dataset.channel;
    document.querySelectorAll('.channel-tabs [data-channel]').forEach((button) => {
      const active = button.dataset.channel === state.channel;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#session-description').textContent = channelDescription();
    updateStudio(); return;
  }
  const action = target.dataset.action;
  if (action === 'settings') settings();
  else if (action === 'presentation') presentation();
  else if (action === 'message-preview') messageDialog();
  else if (action === 'start') start();
  else if (action === 'next') {
    stop(); state.started = true; state.count = Math.min(state.count + 1, fixture().messages.length); updateStudio();
  } else if (action === 'finish') {
    if (state.handoff) return;
    stop(); state.started = true; state.count = fixture().messages.length; updateStudio();
  } else if (action === 'handoff') {
    stop(); state.handoff = true; updateStudio(); document.querySelector('.play-button').focus({ preventScroll: true });
  } else if (action === 'sound') {
    if (state.sound) { state.sound = false; window.speechSynthesis?.cancel(); }
    else {
      const voice = window.speechSynthesis?.getVoices().find((v) => /^ru/i.test(v.lang) && v.localService);
      if (!voice) { toast('Локальный русский голос недоступен. Сценарий можно прочитать в диалоге.'); return; }
      state.sound = true; toast('Включена локальная озвучка браузера. Это не голос рабочего агента.');
    }
    updateStudio();
  } else if (action === 'export') exportExamples();
  else if (action === 'load-scenario') {
    target.closest('dialog').close(); state.channel = target.dataset.channel;
    if (state.view !== 'agent') { history.pushState(null, '', '#agent'); state.view = 'agent'; }
    setIndustry(target.dataset.industry);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('#scenario')?.focus({ preventScroll: true });
  } else if (action === 'presentation-settings') {
    target.closest('dialog').close(); settings();
  } else if (action === 'presentation-start') {
    target.closest('dialog').close();
    if (state.view !== 'agent') { history.pushState(null, '', '#agent'); state.view = 'agent'; render(); window.scrollTo({ top: 0, behavior: 'instant' }); }
    state.count = 0; start();
  }
});

document.addEventListener('change', (event) => {
  const el = event.target;
  if (el.id === 'period') { state.period = el.value; render(); document.querySelector('#period')?.focus(); }
  else if (el.id === 'scenario') { setIndustry(el.value); document.querySelector('#scenario')?.focus(); }
  else if (el.id === 'channel-filter' || el.id === 'status-filter') {
    if (el.id === 'channel-filter') state.filter = el.value; else state.status = el.value;
    document.querySelector('#conversation-results').innerHTML = table(filteredConversations(), true);
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'conversation-search') {
    state.search = event.target.value;
    document.querySelector('#conversation-results').innerHTML = table(filteredConversations(), true);
  } else if (event.target.id === 'knowledge-search') {
    state.knowledgeSearch = event.target.value;
    document.querySelector('#knowledge-results').innerHTML = knowledgeCards();
  }
});

document.querySelector('#settings-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#company-name');
  if (!name.value.trim()) { name.setCustomValidity('Введите название компании'); name.reportValidity(); return; }
  state.company = name.value.trim().slice(0, 40);
  state.industry = document.querySelector('#industry').value;
  stop(); state.count = 2; state.started = false; state.handoff = false; state.knowledgeSearch = '';
  persist(); document.querySelector('#settings-dialog').close(); render();
  const focusTarget = [settingsOpener, main.querySelector('[data-action="settings"]'), ...document.querySelectorAll('[data-action="settings"], [data-action="presentation"]')]
    .find((el) => el?.isConnected && el.matches('button, a[href], input, select, textarea, [tabindex]') && !el.disabled && el.getClientRects().length);
  focusTarget?.focus({ preventScroll: true });
  toast('Демо настроено для вашей компании');
});
document.querySelector('#company-name').addEventListener('input', (e) => e.target.setCustomValidity(''));
document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}));
window.addEventListener('hashchange', route);
window.addEventListener('popstate', route);
window.addEventListener('pagehide', stop);
document.addEventListener('visibilitychange', () => { if (document.hidden) { stop(); updateStudio(); } });
route();
