import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const asset = (folder: string, name: string) => `/assets/${folder}/${encodeURIComponent(name)}`;
const partnerAssets = ['한샘_로고_(2).png', 'KD_Navien_BI.png', '154756.png', '삼성_로고_(1).png', 'images.png', 'image 3ad0.png', 'image 31.png', 'img_logo_big.png'];
const projectImages = {
  apartment: ['KakaoTalk_20260916_175847564_02.jpg', 'KakaoTalk_20260916_175847564_01.jpg', 'KakaoTalk_20260916_175847564.jpg', 'KakaoTalk_20260923_214628190_01.jpg', 'KakaoTalk_20260923_214628190_02.jpg'],
  house: ['KakaoTalk_20260916_175847564_01.jpg', 'KakaoTalk_20260916_175847564.jpg', 'KakaoTalk_20260923_214628190_01.jpg', 'KakaoTalk_20260923_214628190_02.jpg', 'KakaoTalk_20260923_214628190_03.jpg'],
  villa: ['KakaoTalk_20260923_214628190_01.jpg', 'KakaoTalk_20260923_214628190_02.jpg', 'KakaoTalk_20260923_214628190_03.jpg', 'KakaoTalk_20260916_175847564_02.jpg', 'KakaoTalk_20260916_175847564_01.jpg'],
  shop: ['KakaoTalk_20260923_214628190_03.jpg', 'KakaoTalk_20260923_214628190_02.jpg', 'KakaoTalk_20260923_214628190_01.jpg', 'KakaoTalk_20260916_175847564.jpg', 'KakaoTalk_20260916_175847564_02.jpg'],
} as const;
const projectItems = [
  { label: '아파트', images: projectImages.apartment.map((name) => asset('projects', name)), title: '목동아파트 1단지 20평형', note: '아파트 · 2021' },
  { label: '주택', images: projectImages.house.map((name) => asset('projects', name)), title: '따뜻한 주택 인테리어', note: '주택 · 2021' },
  { label: '빌라', images: projectImages.villa.map((name) => asset('projects', name)), title: '생활을 담은 빌라', note: '빌라 · 2021' },
  { label: '상가', images: projectImages.shop.map((name) => asset('projects', name)), title: '작은 가게의 새로운 표정', note: '상가 · 2021' },
];
const serviceImages = [asset('services', 'KakaoTalk_20260916_175847564.jpg'), asset('services', 'KakaoTalk_20260916_175847564_02.jpg')];
const timeline = [
  ['2012', '(사)한국인테리어경영자협회 제5대 회장 취임'],
  ['2014', '(사)한국인테리어경영자협회 제6대 회장 연임'],
  ['2015', '모범소상공인 대통령표창 수상'],
];
const currentRoles = [
  '現  (사)한국인테리어경영자협회 회장',
  '現  양천구 ‘원전하나 줄이기’ 구민위원회 위원',
  '現  양천구 목5동 방위협의회 위원, 동장',
  '現  양천문화원 이사',
  '現  법무부복지시설 (사)열린낙원 고문위원',
  '現  서울대학교 농업생명과학대학 환경지도자고위과정',
  '      7기 동기회 수석부회장',
];
const newsItems = [
  { image: asset('news', 'image-38.png'), title: '사상철 한국인테리어경영자협회장, “대기 ...', excerpt: '사상철 한국인테리어경영자협회장은 인테리어업계가 어렵다고 못할 때도 맡은 업체가 늘어나고 있는 추세라며 인테리어에 대한 생각을 전했다.', url: 'https://www.nspna.com/news/?mode=view&newsid=349563' },
  { image: asset('news', 'image-39.png'), title: '대·중소 인테리어 업계, 상생 위한 첫 발 내 ...', excerpt: '사상철 한국인테리어경영자협회장은 오늘 협회로는 대·중소기업이 공동으로 연대해 산업의 동반성장을 도모할 수 있는 시대정신의 필요성을 강조했다.', url: 'https://news.mtn.co.kr/news-detail/2020111916410758826' },
];
const newsPages = [
  newsItems,
  [
    {
      image: 'https://file.nspna.com/news/2018/01/30/20180130175218_264689_1.jpg',
      title: '한국인테리어경영자협회·수리수리마하수리 티에스시스템, MOU 체결',
      excerpt: '한국인테리어경영자협회가 수리·설치 서비스 기업과 협약을 맺고 회원사 홍보와 사업 기회 확대에 나섰습니다.',
      url: 'https://www.nspna.com/news/?mode=view&newsid=264689',
    },
    {
      image: 'https://cdn.newsworks.co.kr/news/photo/202101/517461_405739_5951.jpg',
      title: '소상공인연합회 “중대재해법, 소상공인들 예비범법자 규정…장사 접으라는 것”',
      excerpt: '사상철 한국인테리어경영자협회장 등이 국회 앞 기자회견에서 중대재해법의 소상공인 적용에 반대했습니다.',
      url: 'https://www.newsworks.co.kr/news/articleView.html?idxno=517461',
    },
  ],
  [
    {
      image: 'https://cooknchefnews.com/news/data/20210902/p1065605865271012_414_thum.jpg',
      title: '소상공인연합회, 신임 회장 선출에 따른 임원진 구성·발표',
      excerpt: '소상공인연합회가 새 회장과 임원진을 발표했습니다. 사상철 한국인테리어경영자협회장은 부회장단에 이름을 올렸습니다.',
      url: 'https://cooknchefnews.com/news/view/1065605865271012',
    },
    {
      image: 'https://cdn.meconomynews.com/news/photo/201806/14418_13805_193.jpg',
      title: '[시경초대석] “간판장사” 대기업이 인테리어 민원의 주범',
      excerpt: '사상철 한국인테리어경영자협회장이 대기업 대리점 시공과 인테리어 민원 문제에 대한 생각을 전했습니다.',
      url: 'https://www.meconomynews.com/news/articleView.html?idxno=14418',
    },
  ],
];

function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <div className={`section-label${light ? ' section-label-light' : ''}`}><span>{number}</span><i aria-hidden="true" /><strong>{children}</strong></div>;
}

function Hero() {
  const [qrOpen, setQrOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!qrOpen) return undefined;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setQrOpen(false);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [qrOpen]);

  return (
    <section className="hero" id="hero" aria-label="새솔가 대표 이미지">
      <img className="hero-image" src={asset('hero', 'ssd.png')} alt="새솔가 대표 사상철" />
      <div className="hero-intro">
        <span>새솔가 인테리어</span>
        <small>대표</small>
        <strong>사상철</strong>
        <em>SA S.C.</em>
      </div>
      <div className="hero-contact" id="hero-contact">
        <div className="intro-actions">
          <a href="tel:01052572891" aria-label="010-5257-2891로 통화 연결">
            <img src={asset('icons', 'phone.png')} alt="" />
            통화 연결
          </a>
          <a href="sms:01052572891" aria-label="010-5257-2891로 문자 전송">
            <img src={asset('icons', 'mail.png')} alt="" />
            문자 전송
          </a>
        </div>

        <button className="intro-share" type="button" onClick={() => setQrOpen(true)} aria-haspopup="dialog">
          <img src={asset('icons', 'qr-code.png')} alt="" />
          QR 코드 공유
        </button>

        <div className="intro-details">
          <p>M. 010-5257-2891</p>
          <p>T. 02) 2642-3769, 02) 2644-5576</p>
          <p>A. 서울특별시 강서구 방화대로7가길 40</p>
        </div>
      </div>
      {qrOpen && createPortal(
        <div className="qr-overlay" role="presentation" onClick={() => setQrOpen(false)}>
          <div className="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-title" onClick={(event) => event.stopPropagation()}>
            <button ref={closeButtonRef} className="qr-close" type="button" aria-label="QR 코드 닫기" onClick={() => setQrOpen(false)}><X size={22} /></button>
            <h2 id="qr-title">새솔가 인테리어 QR 코드</h2>
            <img src={asset('icons', 'qr-share.png')} alt="새솔가 인테리어 QR 코드" />
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}

function About() {
  return (
    <section className="about section-paper" id="about">
      <SectionLabel number="01">인사말</SectionLabel>
      <img className="about-watermark" src={asset('logo', 'ㄱ.png')} alt="" aria-hidden="true" />
      <h2 className="about-title reveal reveal-left reveal-delay-1">처음과 끝이<br /><b>한결같아야 합니다.</b></h2>
      <div className="about-copy reveal reveal-down reveal-delay-2">
        <p><b>내 집을 고치는 마음으로</b> 수십년 넘게 작업해온 결과,<br />새솔가만의 기술과 품질력을 고객님들께 인정받아<br />지금까지 함께 해오고 있습니다.</p>
        <p>시작을 함께 했던 50년 목수 외길 인생을 걸어온<br />선친의 뜻에 따라 <b>집같은 집을 짓기 위해</b> 아직도<br />끊임없이 연구하고 공부하고 있습니다.</p>
        <p><b>편한 작업보다 고객의 편한 생활</b>을 고민합니다.<br />오랜 경력의 노하우, 고객들의 입소문, 그 명성의 가치는<br />모든 공간에 배어있습니다.</p>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section className="career section-grey" id="career">
      <SectionLabel number="02">활동 / 경력</SectionLabel>
      <div className="timeline">
        {timeline.map(([year, copy], index) => <div className="timeline-item" key={year}><span className={`timeline-dot reveal reveal-scale career-delay-${index + 1}`} aria-hidden="true" /><span className={`timeline-line reveal reveal-line career-delay-${index + 1}`} aria-hidden="true" /><div className={`timeline-card reveal reveal-down career-delay-${index + 1}`}><small>{year}</small><b>{copy}</b></div></div>)}
        <div className="timeline-item timeline-item-current"><span className="timeline-dot reveal reveal-scale career-delay-4" aria-hidden="true" /><div className="timeline-card reveal reveal-down career-delay-4"><small>2020 - NOW</small><b>(사)한국인테리어경영자협회 회장</b><div className="current-roles">{currentRoles.map((role) => <span key={role}>{role}</span>)}</div></div></div>
      </div>
    </section>
  );
}

function Certificate() {
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  const cards = [
    { image: asset('certificates', 'cer01.jpg'), detailImage: asset('certificates', 'cer01.jpg'), eyebrow: 'SERVICE MARK', title: '서비스표등록증', sub: '삼부자 상표등록' },
    { image: asset('awards', 'award-2015.png'), detailImage: asset('awards', 'award-2015-full.png'), eyebrow: 'PRESIDENTIAL CITATION', title: '대통령 표창', sub: '2015 모범소상공인' },
    { image: asset('awards', 'award-2022.png'), detailImage: asset('awards', 'award-2022-full.png'), eyebrow: 'PRESIDENTIAL CITATION', title: '대통령 표창', sub: '2022 모범소상공인' },
  ];
  return (
    <section className="certificate section-paper" id="certificate">
      <SectionLabel number="03">자격 / 증명</SectionLabel>
      <div className="certificate-list">{cards.map((card) => <article className="certificate-card" key={card.image}><img src={card.image} alt={card.title} /><div className="certificate-info"><small>{card.eyebrow}</small><strong>{card.title}</strong><em>{card.sub}</em><button type="button" onClick={() => setOpen(card.detailImage)}>자세히 보기 <span aria-hidden="true">↗</span></button></div></article>)}</div>
      {open && <div className="lightbox" role="dialog" aria-modal="true" aria-label="증명서 크게 보기" onClick={() => setOpen(null)}><div className="lightbox-card" onClick={(event) => event.stopPropagation()}><button type="button" className="lightbox-close" aria-label="닫기" onClick={() => setOpen(null)}><X size={22} /></button><img src={open} alt="증명서" /></div></div>}
    </section>
  );
}

function News() {
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const lastSwipeAt = useRef(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setSlide((current) => (current + 1) % newsPages.length), 3600);
    return () => window.clearTimeout(timer);
  }, [newsPages.length, slide]);
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current; touchStartX.current = null;
    const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined || Math.abs(end - start) < 40) return;
    lastSwipeAt.current = Date.now();
    setSlide((current) => end < start ? Math.min(current + 1, newsPages.length - 1) : Math.max(current - 1, 0));
  };
  return (
    <section className="news section-paper" id="news">
      <SectionLabel number="04">기사 / 인터뷰</SectionLabel>
      <div className="news-viewport">
        <div className="news-track" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ transform: `translateX(-${slide * 100}%)` }}>
          {newsPages.map((page, pageIndex) => (
            <div className="news-page" key={pageIndex}>
              {page.map((item) => (
                <a className="news-card" href={item.url} target="_blank" rel="noopener noreferrer" key={item.url} onClick={(event) => { if (Date.now() - lastSwipeAt.current < 500) event.preventDefault(); }}>
                  <img src={item.image} alt="" referrerPolicy="no-referrer" />
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="news-dots" role="group" aria-label="기사 페이지 선택">
        {newsPages.map((_, index) => <button className={slide === index ? 'is-active' : ''} type="button" aria-label={`기사 ${index + 1}페이지 보기`} aria-current={slide === index ? 'page' : undefined} onClick={() => setSlide(index)} key={index} />)}
      </div>
    </section>
  );
}

function Partners() {
  return <section className="partners section-paper" aria-label="파트너"><h3>PARTNER</h3><div className="partner-marquee">{[partnerAssets.slice(0, 4), partnerAssets.slice(4)].map((row, rowIndex) => <div className="partner-marquee-row" key={rowIndex}><div className="partner-marquee-track">{[...row, ...row].map((name, index) => <img key={`${name}-${index}`} src={asset('partners', name)} alt="" />)}</div></div>)}</div></section>;
}

function Projects() {
  const [selected, setSelected] = useState(0);
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const project = projectItems[selected];
  useEffect(() => { setIsTransitioning(false); setSlide(0); const frame = window.requestAnimationFrame(() => setIsTransitioning(true)); return () => window.cancelAnimationFrame(frame); }, [selected]);
  useEffect(() => { const timer = window.setTimeout(() => setSlide((current) => (current + 1) % project.images.length), 3600); return () => window.clearTimeout(timer); }, [project.images.length, selected, slide]);
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current; touchStartX.current = null; const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined || Math.abs(end - start) < 40) return;
    setIsTransitioning(true); setSlide((current) => end < start ? (current + 1) % project.images.length : (current - 1 + project.images.length) % project.images.length);
  };
  return (
    <section className="projects section-paper" id="projects">
      <SectionLabel number="05">프로젝트</SectionLabel>
      <div className="project-tabs" role="tablist" aria-label="프로젝트 카테고리">{projectItems.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={selected === index} className={selected === index ? 'is-active' : ''} onClick={() => setSelected(index)}>{item.label}</button>)}</div>
      <article className="project-card"><div className="project-image-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}><div className="project-image-track" style={{ transform: `translateX(-${slide * 100}%)`, transition: isTransitioning ? undefined : 'none' }}>{project.images.map((image) => <img className="project-image" src={image} alt={project.title} key={image} />)}</div></div><div className="project-overlay"><strong>{project.title}</strong><span>{project.note}</span></div></article>
      <div className="project-pager" aria-hidden="true">{project.images.map((image, index) => <i className={index === slide ? 'is-active' : ''} key={image} />)}</div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <SectionLabel number="06" light>서비스</SectionLabel>
      <h2 className="service-title reveal reveal-left reveal-delay-1">오랜 시간 증명해온<br />가치 있는 공간</h2>
      <div className="service-image-frame service-image-frame-1"><img className="service-image" src={serviceImages[0]} alt="햇살이 드는 거실 인테리어" /></div>
      <p className="service-copy reveal reveal-down reveal-delay-2">목동에서 오랜 시간 인테리어를 이어오며 많은 고객들의 입소문 속에서 성장해왔습니다. 한 번의 인연으로 끝나지 않고 다시 찾아주시는 고객들, 그리고 오랜 시간이 지나도 이어지는 신뢰. 그것이 새솔가가 공간에 담아내는 가치입니다.</p>
      <div className="service-image-frame service-image-frame-2"><img className="service-image" src={serviceImages[1]} alt="주방과 식탁 인테리어" /></div>
      <div className="principles"><div className="reveal reveal-down reveal-delay-3"><span>01</span><b>제대로 된 자재</b><p>공간의 용도와 특성을 고려해 좋은 자재를 선택합니다.</p></div><div className="reveal reveal-down reveal-delay-4"><span>02</span><b>오랜 경험의 노하우</b><p>오랜 현장 경험과 노하우를 담아 공간을 완성합니다.</p></div><div className="reveal reveal-down reveal-delay-5"><span>03</span><b>고객 맞춤 설계</b><p>고객의 공간에 필요한 부분을 세심하게 고민합니다.</p></div></div>
    </section>
  );
}

function Footer() {
  return <footer className="footer"><strong>새솔가 SAESOLGA</strong><p>대표 사상철<br />서울특별시 강서구 방화대로7가길 40<br />M. 010-5257-2891<br />T. 02) 2642-3769, 02) 2644-5576</p><small>© SAESOLGA ALL RIGHTS RESERVED</small></footer>;
}

function Home() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return undefined;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView(), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) { targets.forEach((target) => target.classList.add('is-visible')); return undefined; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12, rootMargin: '0px 0px -30px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return <main className="site"><Hero /><About /><Career /><Certificate /><News /><Partners /><Projects /><Services /><Footer /></main>;
}

function App() {
  return <TooltipProvider><ErrorBoundary resetKey="/"><Home /></ErrorBoundary><Toaster /></TooltipProvider>;
}

export default App;