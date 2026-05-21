export interface Artwork {
  id: string;
  title: string;
  medium: string;
  date: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
}

export interface TravelLog {
  id: string;
  title: string;
  destination: string;
  date: string;
  description: string;
  image: string;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export type Category = 'Daily Life' | 'Heritage' | 'Celebrations' | 'Holidays' | 'Travel';

export interface Moment {
  id: string;
  category: Category;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location?: string;
  details?: string;
  comments?: any[];
}

export const DESTINATION_MAP: Record<string, string> = {
  "SEOUL, KR": "SEOUL, KR / 서울, 대한민국",
  "JEJU, KR": "JEJU, KR / 제주도, 대한민국",
  "MANILA, PH": "MANILA, PH / 마닐라, 필리핀",
  "CEBU, PH": "CEBU, PH / 세부, 필리핀",
  "TOKYO, JP": "TOKYO, JP / 도쿄, 일본",
  "KYOTO, JP": "KYOTO, JP / 교토, 일본",
  "PARIS, FR": "PARIS, FR / 파리, 프랑스",
  "ROME, IT": "ROME, IT / 로마, 이탈리아",
  "NEW YORK, US": "NEW YORK, US / 뉴욕, 미국",
  "HAWAII, US": "HAWAII, US / 하와이, 미국",
  "LONDON, GB": "LONDON, GB / 런던, 영국",
  "BANGKOK, TH": "BANGKOK, TH / 방콕, 태국",
  "BALI, ID": "BALI, ID / 발리, 인도네시아",
  "SINGAPORE, SG": "SINGAPORE, SG / 싱가포르",
  "SYDNEY, AU": "SYDNEY, AU / 시드니, 호주",
  "BARCELONA, ES": "BARCELONA, ES / 바르셀로나, 스페인",
  "VIENNA, AT": "VIENNA, AT / 비엔나, 오스트리아",
  "VANCOUVER, CA": "VANCOUVER, CA / 밴쿠버, 캐나다",
  "HANOI, VN": "HANOI, VN / 하노이, 베트남",
  "DA NANG, VN": "DA NANG, VN / 다낭, 베트남",
  "TAIPEI, TW": "TAIPEI, TW / 타이베이, 대만",
  "REYKJAVIK, IS": "REYKJAVIK, IS / 레이캬비크, 아이슬란드",
  "ZURICH, CH": "ZURICH, CH / 취리히, 스위스"
};


