import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QrCode, PhoneCall, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const asset = (folder: string, name: string) =>
  `/assets/${folder}/${encodeURIComponent(name)}`;

const heroSlides = [
  asset('hero', 'image 30.png'),
  asset('hero', '2 21.png'),
  asset('hero', 'img_7600.jpg'),
];
const HERO_SLIDE_DURATION = 3000;
const HERO_LOOP_BRIDGE_DURATION = 750;

const partnerAssets = [
  '한샘_로고_(2).png',
  'KD_Navien_BI.png',
  '154756.png',
  '삼성_로고_(1).png',
  'images.png',
  'image 3ad0.png',
  'image 31.png',
  'img_logo_big.png',
];

const projectImages = {
  apartment: [
    'KakaoTalk_20260916_175847564_02.jpg',
    'KakaoTalk_20260916_175847564_01.jpg',
    'KakaoTalk_20260916_175847564.jpg',
    'KakaoTalk_20260923_214628190_01.jpg',
    'KakaoTalk_20260923_214628190_02.jpg',
  ],
  house: [
    'KakaoTalk_20260916_175847564_01.jpg',
    'KakaoTalk_20260916_175847564.jpg',
    'KakaoTalk_20260923_214628190_01.jpg',
    'KakaoTalk_20260923_214628190_02.jpg',
    'KakaoTalk_20260923_214628190_03.jpg',
  ],
  villa: [
    'KakaoTalk_20260923_214628190_01.jpg',
    'KakaoTalk_20260923_214628190_02.jpg',
    'KakaoTalk_20260923_214628190_03.jpg',
    'KakaoTalk_20260916_175847564_02.jpg',
    'KakaoTalk_20260916_175847564_01.jpg',
  ],
  shop: [
    'KakaoTalk_20260923_214628190_03.jpg',
    'KakaoTalk_20260923_214628190_02.jpg',
    'KakaoTalk_20260923_214628190_01.jpg',
    'KakaoTalk_20260916_175847564.jpg',
    'KakaoTalk_20260916_175847564_02.jpg',
  ],
} as const;

const projectItems = [
  {
    label: '아파트',
    images: projectImages.apartment.map((name) => asset('projects', name)),
    title: '목동아파트 1단지 20평형',
    note: '아파트 · 2021',
  },
  {
    label: '주택',
    images: projectImages.house.map((name) => asset('projects', name)),
    title: '주택 인테리어',
    note: '주택 · 2021',
  },
  {
    label: '빌라',
    images: projectImages.villa.map((name) => asset('projects', name)),
    title: '빌라 인테리어',
    note: '빌라 · 2021',
  },
  {
    label: '상가',
    images: projectImages.shop.map((name) => asset('projects', name)),
    title: '상가 인테리어',
    note: '상가 · 2021',
  },
];

const serviceImages = [
  asset('services', 'KakaoTalk_20260916_175847564.jpg'),
  asset('services', 'KakaoTalk_20260916_175847564_01.jpg'),
  asset('services', 'KakaoTalk_20260916_175847564_02.jpg'),
];

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

function SectionLabel({ number, children, light = false }: {
  number: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label${light ? ' section-label-light' : ''}`}>
      <span>{number}</span>
      <i aria-hidden="true" />
      <strong>{children}</strong>
    </div>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const loopedRef = useRef(false);

  useEffect(() => {
    if (slide === heroSlides.length) {
      loopedRef.current = true;
      const resetTimer = window.setTimeout(() => {
        setIsTransitioning(false);
        setSlide(0);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setIsTransitioning(true));
        });
      }, HERO_LOOP_BRIDGE_DURATION);
      return () => window.clearTimeout(resetTimer);
    }

    const isLoopStart = slide === 0 && loopedRef.current;
    loopedRef.current = false;
    const timer = window.setTimeout(() => {
      setSlide((current) => current + 1);
    }, isLoopStart ? HERO_SLIDE_DURATION - HERO_LOOP_BRIDGE_DURATION : HERO_SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [slide]);

  const visibleSlide = slide % heroSlides.length;
  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;

    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 40) return;

    setIsTransitioning(true);
    if (deltaX < 0 && slide < heroSlides.length) {
      setSlide((current) => current + 1);
    } else if (deltaX > 0) {
      setSlide((current) =>
        current === 0 ? heroSlides.length - 1 : current - 1
      );
    }
  };

  return (
    <section
      className="hero"
      id="hero"
      aria-label="새솔가 대표 이미지"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="hero-track"
        style={{
          transform: `translateX(-${slide * 100}%)`,
          transition: isTransitioning ? undefined : 'none',
        }}
      >
        {[...heroSlides, ...heroSlides].map((image, index) => (
          <img
            className="hero-image"
            src={image}
            alt=""
            key={`${image}-${index}`}
          />
        ))}
      </div>
      <img className="hero-mark" src={asset('logo', 'ㄱ.png')} alt="" />
      <div className="hero-controls">
        <div className="hero-dots" aria-label="대표 이미지 선택">
          {heroSlides.map((image, index) => (
            <button
              key={image}
              className={`hero-dot${visibleSlide === index ? ' is-active' : ''}`}
              type="button"
              aria-label={`${index + 1}번째 대표 이미지`}
              aria-pressed={visibleSlide === index}
              onClick={() => {
                setIsTransitioning(true);
                setSlide(index);
              }}
            />
          ))}
        </div>
        <span>{String(visibleSlide + 1).padStart(2, '0')} / 03</span>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro" id="intro" aria-label="새솔가의 뜻">
      <div className="intro-image" aria-hidden="true" />
      <div className="intro-copy reveal reveal-down">
        <h1>
          새솔 <span className="intro-symbol">+</span> 家 <span className="intro-symbol">=</span> 새솔가
        </h1>
        <p>: 소나무처럼 한결같은, 새로 난 솔처럼 푸르른 집</p>
      </div>
      <div className="intro-band">INTERIOR DESIGN SAESOLGA</div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-paper" id="about">
      <SectionLabel number="01">ABOUT</SectionLabel>
      <h2 className="about-title reveal reveal-left reveal-delay-1">
        처음과 끝이
        <br />
        <b>한결같아야 합니다.</b>
      </h2>
      <div className="profile-card">
        <img
          className="profile-image"
          src={asset('profile', 'ChatGPT Image 2026년 9월 22일 오후 06_23_38 2.png')}
          alt="대표 사상철"
        />
        <a className="phone-badge" href="tel:01052572891" aria-label="010-5257-2891로 전화하기">
          <PhoneCall size={25} strokeWidth={2.4} />
        </a>
       <img
          className="profile-qr reveal reveal-right reveal-delay-2"
          src="/qr_white_transparent.png"
          alt=""
        />
        <div className="profile-signature reveal reveal-right reveal-delay-3">
          <small>대표</small>
          <span>사상철</span>
        </div>
      </div>
      <div className="about-copy reveal reveal-down reveal-delay-4">
        <p>
          <b>내 집을 고치는 마음으로</b> 수십년 넘게 작업해온 결과,
          <br />
          새솔가만의 기술과 품질력을 고객님들께 인정받아
          <br />
          지금까지 함께 해오고 있습니다.
        </p>
        <p>
          시작을 함께 했던 50년 목수 외길 인생을 걸어온
          <br />
          선친의 뜻에 따라 <b>집같은 집을 짓기 위해</b> 아직도
          <br />
          끊임없이 연구하고 공부하고 있습니다.
        </p>
        <p>
          <b>편한 작업보다 고객의 편한 생활</b>을 고민합니다.
          <br />
          오랜 경력의 노하우, 고객들의 입소문, 그 명성의 가치는
          <br />
          모든 공간에 배어있습니다.
        </p>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section className="career section-grey" id="career">
      <SectionLabel number="02">CAREER</SectionLabel>
      <div className="timeline">
        {timeline.map(([year, copy], index) => (
          <div className="timeline-item" key={year}>
            <span className={`timeline-dot reveal reveal-scale career-delay-${index + 1}`} aria-hidden="true" />
            <span className={`timeline-line reveal reveal-line career-delay-${index + 1}`} aria-hidden="true" />
            <div className={`timeline-card reveal reveal-down career-delay-${index + 1}`}>
              <small>{year}</small>
              <b>{copy}</b>
            </div>
          </div>
        ))}
        <div className="timeline-item timeline-item-current">
          <span className="timeline-dot reveal reveal-scale career-delay-4" aria-hidden="true" />
          <div className="timeline-card reveal reveal-down career-delay-4">
            <small>2020 - NOW</small>
            <b>(사)한국인테리어경영자협회 회장</b>
            <div className="current-roles">{currentRoles.map((role) => <span key={role}>{role}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certificate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <section className="certificate section-paper" id="certificate">
      <SectionLabel number="03">CERTIFICATE</SectionLabel>
      <div className="certificate-list">
        {[0, 1, 2].map((item) => (
          <article className="certificate-card" key={item}>
            <img src={asset('certificates', 'cer01.jpg')} alt="서비스표등록증" />
            <div className="certificate-info">
              <small>SERVICE MARK</small>
              <strong>서비스표등록증</strong>
              <button type="button" onClick={() => setOpen(true)}>
                자세히 보기 <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="partners">
        <h3>PARTNER</h3>
        <div className="partner-marquee">
          {[partnerAssets.slice(0, 4), partnerAssets.slice(4)].map((row, rowIndex) => (
            <div className="partner-marquee-row" key={rowIndex}>
              <div className="partner-marquee-track">
                {[...row, ...row].map((name, index) => (
                  <img key={`${name}-${index}`} src={asset('partners', name)} alt="" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="서비스표등록증 크게 보기">
          <div className="lightbox-card">
            <button type="button" className="lightbox-close" aria-label="닫기" onClick={() => setOpen(false)}>
              <X size={22} />
            </button>
            <img src={asset('certificates', 'cer01.jpg')} alt="서비스표등록증" />
          </div>
        </div>
      )}
    </section>
  );
}

function Projects() {
  const [selected, setSelected] = useState(0);
  const [slide, setSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const project = projectItems[selected];
  const visibleSlide = slide % project.images.length;

  useEffect(() => {
    setIsTransitioning(false);
    setSlide(0);
    const frame = window.requestAnimationFrame(() => setIsTransitioning(true));
    return () => window.cancelAnimationFrame(frame);
  }, [selected]);

  useEffect(() => {
    if (slide === project.images.length) {
      const resetTimer = window.setTimeout(() => {
        setIsTransitioning(false);
        setSlide(0);
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => setIsTransitioning(true));
        });
      }, 750);
      return () => window.clearTimeout(resetTimer);
    }

    const timer = window.setTimeout(() => {
      setSlide((current) => current + 1);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [project.images.length, selected, slide]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;

    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 40) return;

    setIsTransitioning(true);
    if (deltaX < 0 && slide < project.images.length) {
      setSlide((current) => current + 1);
    } else if (deltaX > 0) {
      setSlide((current) =>
        current === 0 ? heroSlides.length - 1 : current - 1
      );
    }
  };

  return (
    <section className="projects section-paper" id="projects">
      <SectionLabel number="04">PROJECT</SectionLabel>
      <div className="project-tabs" role="tablist" aria-label="프로젝트 카테고리">
        {projectItems.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={selected === index}
            className={selected === index ? 'is-active' : ''}
            onClick={() => {
              setSelected(index);
              setSlide(0);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="project-pager" aria-hidden="true">
        {project.images.map((image, index) => (
          <i className={index === visibleSlide ? 'is-active' : ''} key={image} />
        ))}
      </div>
      <article className="project-card">
        <div
          className="project-image-viewport"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="project-image-track"
            style={{
              transform: `translateX(-${slide * 100}%)`,
              transition: isTransitioning ? undefined : 'none',
            }}
          >
            {[...project.images, ...project.images].map((image, index) => (
              <img
                className="project-image"
                src={image}
                alt={project.title}
                key={`${image}-${index}`}
              />
            ))}
          </div>
        </div>
        <div className="project-overlay">
          <strong>{project.title} ({visibleSlide + 1})</strong>
          <span>{project.note}</span>
        </div>
      </article>
    </section>
  );
}

function Services() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % serviceImages.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="services" id="services">
      <SectionLabel number="05" light>SERVICE</SectionLabel>
      <h2 className="service-title reveal reveal-left reveal-delay-1">
        오랜 시간 증명해온
        <br />
        가치 있는 공간
      </h2>
      <div className="service-gallery">
        {serviceImages.map((image, index) => (
          <div
            className={`service-image-frame service-image-frame-${index + 1}${activeImage === index ? ' is-zoomed' : ''}`}
            key={image}
          >
            <img className="service-image" src={image} alt="" />
          </div>
        ))}
      </div>
      <p className="service-copy reveal reveal-down reveal-delay-2">
        목동에서 오랜 시간 인테리어를 이어오며 많은 고객들
        <br />
        의 입소문 속에서 성장해왔습니다. 한 번의 인연으로
        <br />
        끝나지 않고 다시 찾아주시는 고객들, 그리고 오랜 시
        <br />
        간이 지나도 이어지는 신뢰. 그것이 새솔가가 공간에
        <br />
        담아내는 가치입니다.
      </p>
      <div className="principles">
        <div className="reveal reveal-down reveal-delay-3"><span>01</span><b>제대로 된 자재</b><p>공간의 용도와 특성을 고려해 좋은 자재를 선택합니다.</p></div>
        <div className="reveal reveal-down reveal-delay-4"><span>02</span><b>오랜 경험의 노하우</b><p>오랜 현장 경험과 노하우를 담아 공간을 완성합니다.</p></div>
        <div className="reveal reveal-down reveal-delay-5"><span>03</span><b>고객 맞춤 설계</b><p>고객의 공간에 필요한 부분을 세심하게 고민합니다.</p></div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-paper" id="contact">
      <SectionLabel number="06">CONTACT</SectionLabel>
      <h2>
        <span className="reveal reveal-left reveal-delay-1">새로운 공간,</span>
        <br />
        <span className="reveal reveal-left reveal-delay-2">한결같은 마음으로</span>
      </h2>
      <div className="contact-brand">
        <img className="reveal reveal-down reveal-delay-3" src={asset('logo', 'w.png')} alt="" />
        <span className="reveal reveal-down reveal-delay-4">인테리어 디자인 <b>새솔가</b></span>
      </div>
      <div className="contact-buttons">
        <a className="primary" href="tel:0226423769">전화 상담</a>
        <a href="sms:01052572891">문자 상담</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <strong>새솔가 SAESOLGA</strong>
      <p>
        대표 사상철
        <br />
        서울특별시 강서구 방화대로7가길 40
        <br />
        T. 02-2642-3769, 02-2644-5576
      </p>
      <small>© SAESOLGA ALL RIGHTS RESERVED</small>
    </footer>
  );
}

function Home() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const intro = document.getElementById('intro');
    if (!hero || !intro) return undefined;

    let touchStartY: number | null = null;
    let touchStartX: number | null = null;
    let touchStartSection: 'hero' | 'intro' | null = null;
    let isSnapping = false;
    let unlockTimer: number | undefined;

    const getSectionTop = (section: HTMLElement) =>
      section.getBoundingClientRect().top + window.scrollY;
    const isAtSectionTop = (section: HTMLElement) =>
      Math.abs(window.scrollY - getSectionTop(section)) <= 24;
    const snapTo = (section: HTMLElement) => {
      isSnapping = true;
      window.scrollTo({ top: getSectionTop(section), behavior: 'smooth' });
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        isSnapping = false;
      }, 700);
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        isSnapping ||
        Math.abs(event.deltaY) < 3 ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX)
      ) {
        return;
      }

      if (event.deltaY > 0 && isAtSectionTop(hero)) {
        event.preventDefault();
        snapTo(intro);
      } else if (event.deltaY < 0 && isAtSectionTop(intro)) {
        event.preventDefault();
        snapTo(hero);
      }
    };

    const handleTouchStart = (event: globalThis.TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchStartX = event.touches[0]?.clientX ?? null;
      if (touchStartY === null) {
        touchStartSection = null;
        return;
      }

      if (isAtSectionTop(hero)) touchStartSection = 'hero';
      else if (isAtSectionTop(intro)) touchStartSection = 'intro';
      else touchStartSection = null;
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      if (touchStartY === null || !touchStartSection || isSnapping) return;
      const currentY = event.touches[0]?.clientY;
      const currentX = event.touches[0]?.clientX;
      if (currentY === undefined || currentX === undefined || touchStartX === null) return;

      const deltaY = currentY - touchStartY;
      const deltaX = currentX - touchStartX;
      if (Math.abs(deltaY) < 8 || Math.abs(deltaY) <= Math.abs(deltaX)) return;

      const isLeavingHero = touchStartSection === 'hero' && deltaY < 0;
      const isReturningToHero = touchStartSection === 'intro' && deltaY > 0;
      if (isLeavingHero || isReturningToHero) event.preventDefault();
    };

    const handleTouchEnd = (event: globalThis.TouchEvent) => {
      if (touchStartY === null || !touchStartSection || isSnapping) return;
      const endY = event.changedTouches[0]?.clientY;
      if (endY === undefined) return;

      const deltaY = endY - touchStartY;
      touchStartY = null;
      touchStartX = null;
      const section = touchStartSection;
      touchStartSection = null;
      if (Math.abs(deltaY) < 40) return;

      if (section === 'hero' && deltaY < 0) {
        event.preventDefault();
        snapTo(intro);
      } else if (section === 'intro' && deltaY > 0) {
        event.preventDefault();
        snapTo(hero);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.clearTimeout(unlockTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <main className="site">
      <Hero />
      <Intro />
      <About />
      <Career />
      <Certificate />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary resetKey="/">
          <Home />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;