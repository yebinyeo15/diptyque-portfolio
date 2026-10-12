# DIPTYQUE 랜딩페이지 디자인 시스템

출처: Figma 파일 `DaUzuGBSc95Y1SZMdQMfc0`, 프레임 `567:4726` (`디자인 최종`).

이 문서는 개별 레이어에서 확인된 값을 기록합니다. 반응형 동작을 추론하거나 누락된 스타일 가이드 값을 임의로 만들지 않습니다.

## 타이포그래피

### 폰트 종류

| 폰트 | 확인된 용도 | 사용 가능 여부 |
| --- | --- | --- |
| Libre Baskerville | 내비게이션, 섹션 제목, 라벨, 에디토리얼 문구 | 로컬 가변 폰트 `public/fonts/LibreBaskerville-Variable.ttf` 사용 가능; Figma에서는 Bold Italic도 사용 |
| Inter | 본문, 캡션, 메타데이터, 아코디언, Footer | Figma에서 폰트 파일 및 출처를 제공하지 않음; 로컬 사용 여부 미확인 |
| Pretendard | Main Visual/About의 한국어 및 보조 문구 | Figma에서 폰트 파일 및 출처를 제공하지 않음; 로컬 사용 여부 미확인 |
| HYSinMyeongJo | Main Visual 디스플레이 제목 | Figma에서 폰트 파일 및 출처를 제공하지 않음; 로컬 사용 여부 미확인 |
| Idiqlat | Hero 통계 숫자 | Figma에서 폰트 파일 및 출처를 제공하지 않음; 로컬 사용 여부 미확인 |

### 확인된 텍스트 스타일

| 역할 | 폰트 / 굵기 | 크기 | 행간 | 자간 |
| --- | --- | ---: | ---: | ---: |
| Header 내비게이션 | Libre Baskerville Medium 500 | 13px | normal | 1.3px |
| Main Visual 디스플레이 | HYSinMyeongJo Medium 400 | 62px | 69.3px | -4.5px |
| Main Visual 보조 문구 | Pretendard Regular 400 | 16px / 20px | normal | -0.4px / -0.56px |
| Hero 제목 | Libre Baskerville Medium 500 | 47px | 51.7px | -3.29px |
| Hero 본문 | Inter Regular 400 | 16px | 21.5px | -0.64px |
| Hero 통계 숫자 | Idiqlat Regular 400 | 60px | normal | -2.55px ~ -4.2px |
| About 디스플레이 | Libre Baskerville SemiBold 600 / Bold Italic 700 | 59.801px | 75px | -3.5px |
| About 보조 문구 | Pretendard Regular 400 | 20px | 28px | 0.2px |
| 섹션 제목 | Libre Baskerville Medium 500 | 48px | 51px | -3.84px |
| 프로세스 카드 제목 | Libre Baskerville Medium 500 | 40px | normal | -3.32px |
| 저널 카드 제목 | Libre Baskerville Medium 500 | 30px | normal | -1.74px |
| 공통 섹션 라벨 | Libre Baskerville Medium 500 | 13px | normal | -0.13px |
| 보조 본문 범위 | Inter Regular/Medium 400–500 | 14px / 15px / 16px / 20px / 22px / 24px / 27px | 18px / 19px / 20px / 21px / 22px / 24px / normal | 레이어별 상이 |
| 마지막 인용문 | Libre Baskerville Medium 500 | 64px | normal | -5.12px |

위의 반복 역할에 포함되지 않는 텍스트 크기도 개별 레이어에 존재하므로, 해당 섹션을 구현할 때 다시 확인해야 합니다.

## 컬러

| 토큰 | 값 | 확인된 용도 |
| --- | --- | --- |
| `--color-white` | `#ffffff` | 페이지 및 Header 배경 |
| `--color-black` | `#000000` | Header/내비게이션 및 일반 텍스트 |
| `--color-ink` | `#0e0d0c` | 어두운 본문/UI 텍스트 |
| `--color-ink-warm` | `#1b1916` | Hero 텍스트 |
| `--color-ink-cool` | `#1d2029` | Hero 제목 |
| `--color-ink-deep` | `#020202` | Collection 텍스트 |
| `--color-text-muted` | `#49505d` | 메타데이터 및 보조 텍스트 |
| `--color-text-quiet` | `#989490` | 마지막 인용문 |
| `--color-surface-cool` | `#f2f4f7` | About 섹션 표면 |
| `--color-surface-soft` | `#f4f4f4` | 프로세스 카드 |
| `--color-surface-quote` | `#f6f6f6` | 마지막 인용문 섹션 |
| `--color-surface-subtle` | `#fbfbfb` | 아코디언 섹션 |
| `--color-border-light` | `#e5e5e5` | 밝은 구분선/표면 |
| `--color-border-mid` | `#9e9e9e` | 필터 테두리 |
| `--color-surface-dark` | `#1f1d1b` | 어두운 스토리 카드 |
| `--color-overlay-neutral` | `rgba(212, 212, 212, 0.3)` | 반복되는 pill/플레이스홀더 표면 |
| `--color-overlay-cream` | `rgba(248, 245, 237, 0.92)` | 스토리 오버레이 |
| `--color-border-translucent` | `rgba(14, 13, 12, 0.16)` | 아코디언 테두리 |

이미지 외부에서는 일관되게 사용된 독립적인 포인트 컬러가 확인되지 않았습니다. 이미지에서 추출되는 색상은 토큰으로 지정하지 않습니다.

## 레이아웃

- 데스크톱 프레임: 너비 `1920px`.
- 공통 콘텐츠 컨테이너: 너비 `1442px`.
- 공통 데스크톱 좌우 여백: 각 `239px`.
- Header: 높이 `78px`.
- 2열 Collection 그리드: `709px + 24px + 709px`.
- 3열 저널 그리드: `465–466px` 열과 `22–23px` 간격.
- Hero 미디어 영역: `1298px × 646px`, 공통 컨테이너에서 `72px` 안쪽 배치.
- 프로세스 레이아웃: 이미지 `566px`, 텍스트는 x `599px`에서 시작; 반복 카드 높이 `525px`.
- Ritual 아코디언: 너비 `700px`; 열린 행 `145px`, 닫힌 행 `90px`.

반응형 중단점과 모바일/태블릿 레이아웃은 확인한 프레임에 존재하지 않아 미확인 상태입니다.

## 간격

반복적으로 확인된 값:

- 일반 레이어 내부 여백: `10px`.
- 섹션 라벨/버튼 내부 여백: `11px 6px`.
- 태그 내부 여백: `15–20px 7px`.
- Header 내비게이션 간격: `30px`.
- Header 유틸리티 아이콘 배치: `137px` 그룹 안에 30px, 29px, 28×29px 에셋.
- 상품 그리드 간격: `24px`.
- 저널 그리드 간격: `22–23px`.
- 소셜 아이콘 간격: `10px`; 아이콘 터치 영역 `54px`, 내부 여백 `14px`.
- 반복 프로세스 카드 세로 이동 간격: `556px`.

큰 단위의 섹션 여백은 섹션마다 다르므로, 섣불리 공통화하지 않고 해당 Figma 프레임에서 가져와야 합니다.

## 컴포넌트

### 섹션 라벨 pill

- Libre Baskerville Medium, `13px`, 자간 `-0.13px`.
- 일반적인 내부 여백: `6px 11px`.
- 반복되는 radius: `50px`.
- 공통 표면: `rgba(212, 212, 212, 0.3)`.

### 태그 pill

- 레이어에 따라 Inter Regular/SemiBold, 일반적으로 `16px`.
- 높이: `36px`.
- 가로 내부 여백: `15px` 또는 `20px`; 세로 내부 여백: `7px`.
- Radius: `30px`.

### 텍스트 내비게이션 링크

- 텍스트 프레임은 `10px` 내부 여백 사용.
- 별도 밑줄 마커는 `31px × 3px`이며, 25px 선과 3px 정사각형으로 구성.
- 대각선 화살표 에셋은 약 `43.8px` 정사각형.

### 콘텐츠 카드

- 상품 이미지 카드: `709px × 709px`, 하단에 33px 텍스트 행 배치.
- 저널 이미지 카드: 약 `465px × 562px`, 이후 에디토리얼 메타데이터와 제목 배치.
- 스토리 카드는 `6px` radius, 프로세스 이미지는 `20px`; 그 밖의 미디어에는 레이어에 따라 `10px`, `12px`, `13px`, `18px`가 주로 사용됨.

### 아코디언

- 너비: `700px`.
- 열린 항목: `145px`; 닫힌 항목: `90px`.
- 번호 내부 여백: `20px`; 콘텐츠는 `72px`에서 시작; 토글은 `650px`에서 시작.
- 테두리: `rgba(14, 13, 12, 0.16)`.

## 미확인 항목

- 반응형 레이아웃, 중단점 및 유동형 타이포그래피 동작.
- Inter, Pretendard, HYSinMyeongJo, Idiqlat의 폰트 파일 및 라이선스/출처 경로.
- 이름이 지정된 Figma 컬러, 텍스트, 효과 또는 그리드 스타일; 해당 파일은 레이어별 값을 사용함.
- Hover, focus, active 및 transition 상태.
- 내비게이션 목적지와 인터랙션 동작.
- 범용 간격 체계: 반복 값은 문서화했지만 등록된 체계는 확인되지 않음.
