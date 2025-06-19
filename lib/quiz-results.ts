// 퀴즈 결과 타입 정의
export interface Result {
  id: string
  subtitle: string // 4개 알파벳 조합 (CAXM 등)
  title: string // romantic_target 기반 성적 지향
  description: string
  imageUrl: string
  details: string
  resources: {
    title: string
    url: string
  }[]
}

// 카테고리별 점수 매핑 함수들
export function getGenderAlignmentCode(score: number): string {
  return score <= 0 ? 'C' : 'F'
}

export function getRomanticAttractionCode(score: number): string {
  return score <= 0 ? 'A' : 'R'
}

export function getSexualAttractionCode(score: number): string {
  return score <= 0 ? 'X' : 'S'
}

export function getRelationshipOpennessCode(score: number): string {
  return score >= 1 ? 'P' : 'M'
}

// romantic_target 값에 따른 타이틀 매핑
export function getRomanticTargetTitle(score: number): string {
  switch(score) {
    case 1: return '레즈비언'
    case 2: return '게이'
    case 3: return '바이섹슈얼'
    case 4: return '팬섹슈얼'
    case 0: return '에이섹슈얼'
    default: return '퀘스쳐닝'
  }
}

// 퀴즈 결과 데이터
export const quizResults: Result[] = [
  {
    id: "CAXM_에이섹슈얼",
    subtitle: "CAXM",
    title: "에이섹슈얼",
    description: "당신은 다른 사람들에게 성적 끌림을 거의 또는 전혀 느끼지 않을 수 있습니다.",
    imageUrl: "/identity-quiz-character.png",
    details: "에이섹슈얼(무성애)은 다른 사람에게 성적 끌림을 거의 또는 전혀 느끼지 않는 성적 지향입니다. 에이섹슈얼 스펙트럼에는 다양한 정체성이 존재합니다. 에이섹슈얼이라고 해서 반드시 로맨틱한 끌림을 느끼지 않는 것은 아니며, 많은 에이섹슈얼 사람들은 친밀한 관계와 정서적 연결을 원합니다.",
    resources: [
      {
        title: "에이섹슈얼 정체성 이해하기",
        url: "/dictionary/asexual",
      },
      {
        title: "에이로맨틱 스펙트럼 알아보기",
        url: "/dictionary/aromantic-spectrum",
      },
    ],
  },
  {
    id: "CRSM_레즈비언",
    subtitle: "CRSM",
    title: "레즈비언",
    description: "당신은 여성으로서 다른 여성에게 끌림을 느끼는 경향이 있습니다.",
    imageUrl: "/abstract-gender-diversity.png",
    details: "레즈비언은 여성이 다른 여성에게 로맨틱하고 성적인 끌림을 느끼는 성적 지향입니다. 레즈비언 정체성은 개인의 경험과 감정에 따라 다양하게 표현될 수 있으며, 모든 형태의 사랑은 아름답고 존중받아야 합니다.",
    resources: [
      {
        title: "레즈비언 정체성 이해하기",
        url: "/dictionary/lesbian",
      },
      {
        title: "WLW(Women Loving Women) 커뮤니티",
        url: "/dictionary/wlw",
      },
    ],
  },
  {
    id: "CRSM_게이",
    subtitle: "CRSM",
    title: "게이",
    description: "당신은 남성으로서 다른 남성에게 끌림을 느끼는 경향이 있습니다.",
    imageUrl: "/abstract-gender-diversity.png",
    details: "게이는 남성이 다른 남성에게 로맨틱하고 성적인 끌림을 느끼는 성적 지향입니다. 게이 정체성은 개인마다 다르게 경험되며, 자신의 정체성을 받아들이고 표현하는 과정은 개인의 여정입니다.",
    resources: [
      {
        title: "게이 정체성 이해하기",
        url: "/dictionary/gay",
      },
      {
        title: "MLM(Men Loving Men) 커뮤니티",
        url: "/dictionary/mlm",
      },
    ],
  },
  {
    id: "FRSP_바이섹슈얼",
    subtitle: "FRSP",
    title: "바이섹슈얼",
    description: "당신은 여러 성별에게 끌림을 느낄 수 있습니다.",
    imageUrl: "/pride-hearts.png",
    details: "바이섹슈얼은 두 개 이상의 성별에게 끌림을 느끼는 성적 지향입니다. 바이섹슈얼 정체성은 각 개인마다 다르게 경험되며, 다양한 성별에 대한 끌림의 정도나 방식도 사람마다 다를 수 있습니다.",
    resources: [
      {
        title: "바이섹슈얼 정체성 이해하기",
        url: "/dictionary/bisexual",
      },
      {
        title: "바이섹슈얼 가시성의 중요성",
        url: "/dictionary/bi-visibility",
      },
    ],
  },
  {
    id: "FRSP_팬섹슈얼",
    subtitle: "FRSP",
    title: "팬섹슈얼",
    description: "당신은 성별에 상관없이 개인에게 끌림을 느낄 수 있습니다.",
    imageUrl: "/pansexual.png",
    details: "팬섹슈얼은 성별에 상관없이 개인의 성격, 특성, 에너지 등에 끌림을 느끼는 성적 지향입니다. 팬섹슈얼 사람들은 상대방의 성별이 끌림의 요소가 되지 않으며, 개인 자체에 집중합니다.",
    resources: [
      {
        title: "팬섹슈얼 정체성 이해하기",
        url: "/dictionary/pansexual",
      },
      {
        title: "성별을 초월한 사랑",
        url: "/dictionary/gender-blind-attraction",
      },
    ],
  },
  {
    id: "FAXP_팬섹슈얼",
    subtitle: "FAXP",
    title: "팬섹슈얼",
    description: "당신은 성별에 상관없이 개인에게 끌림을 느낄 수 있습니다.",
    imageUrl: "/pansexual.png",
    details: "팬섹슈얼은 성별에 상관없이 개인의 성격, 특성, 에너지 등에 끌림을 느끼는 성적 지향입니다. \n 팬섹슈얼인 사람들은 상대방의 성별이 끌림의 요소가 되지 않으며, 개인 자체에 집중합니다.\n\n당신의 정체성 조합 **FAXP**는 다음을 의미합니다:\n\n\• **F** (Gender-Fluid): 성별 정체성이 유동적일 수 있음\n• **A** (Aromantic): 로맨틱한 끌림을 거의 느끼지 않거나 다르게 경험함\n• **X** (Asexual): 성적 끌림을 거의 느끼지 않거나 다르게 경험함\n• **P** (Poly-amorous): 여러 사람과의 관계에 열려있을 수 있음",
    resources: [
      {
        title: "팬섹슈얼 이해하기",
        url: "/dictionary/pansexual",
      },
      {
        title: "에이로맨틱 이해하기",
        url: "/dictionary/aromantic",
      },
    ],
  },
  {
    id: "FAXP_퀘스쳐닝",
    subtitle: "FAXP",
    title: "퀘스쳐닝",
    description: "당신은 자신의 성 정체성이나 성적 지향에 대해 탐색하고 질문하는 과정에 있을 수 있습니다.",
    imageUrl: "/abstract-queer-minimalist.png",
    details: "퀘스쳐닝은 자신의 성 정체성이나 성적 지향에 대해 탐색하고 질문하는 과정을 의미합니다. 이는 많은 사람들이 경험하는 자연스러운 과정이며, 시간이 걸릴 수 있습니다. 자신을 탐색하는 여정에서 서두르지 않고 자신의 감정에 귀 기울이는 것이 중요합니다.",
    resources: [
      {
        title: "자신의 정체성 탐색하기",
        url: "/dictionary/questioning",
      },
      {
        title: "성 정체성과 성적 지향의 스펙트럼",
        url: "/dictionary/spectrum",
      },
    ],
  },
  {
    id: "FRSM_논바이너리",
    subtitle: "FRSM",
    title: "논바이너리",
    description: "당신은 이분법적인 성별 구분에 속하지 않는 정체성을 가질 수 있습니다.",
    imageUrl: "/abstract-gender-diversity.png",
    details: "논바이너리는 남성이나 여성이라는 이분법적 성별 구분에 속하지 않는 성 정체성을 의미합니다. 논바이너리 정체성을 가진 사람들은 자신을 남성과 여성 사이의 어딘가에 위치하거나, 두 성별을 모두 포함하거나, 성별이 없거나, 유동적인 성별을 가진 것으로 느낄 수 있습니다.",
    resources: [
      {
        title: "논바이너리 정체성 이해하기",
        url: "/dictionary/non-binary",
      },
      {
        title: "젠더 표현과 정체성",
        url: "/dictionary/gender-expression",
      },
    ],
  },
  {
    id: "FAXM_젠더플루이드",
    subtitle: "FAXM",
    title: "젠더플루이드",
    description: "당신의 성별 정체성은 시간에 따라 변할 수 있습니다.",
    imageUrl: "/abstract-gender-diversity.png",
    details: "젠더플루이드는 시간에 따라 변하는 성별 정체성을 의미합니다. 젠더플루이드 사람은 때로는 남성, 여성, 또는 다른 성별 정체성으로 자신을 인식하거나, 여러 정체성의 조합으로 느낄 수 있습니다.",
    resources: [
      {
        title: "젠더플루이드 정체성 이해하기",
        url: "/dictionary/gender-fluid",
      },
      {
        title: "성별 정체성과 표현",
        url: "/dictionary/gender-identity",
      },
    ],
  },
]

// 점수를 기반으로 결과 찾기 함수
export function calculateQuizResult(scores: {
  gender_alignment: number
  romantic_attraction: number
  sexual_attraction: number
  relationship_openness: number
  romantic_target: number
}): Result {
  const subtitle = 
    getGenderAlignmentCode(scores.gender_alignment) +
    getRomanticAttractionCode(scores.romantic_attraction) +
    getSexualAttractionCode(scores.sexual_attraction) +
    getRelationshipOpennessCode(scores.relationship_openness)
  
  const title = getRomanticTargetTitle(scores.romantic_target)
  const resultId = `${subtitle}_${title}`
  
  // 정확한 매치를 찾거나 가장 유사한 결과 반환
  const exactMatch = quizResults.find(result => result.id === resultId)
  if (exactMatch) return exactMatch
  
  // 부분 매치 또는 기본값 반환
  const partialMatch = quizResults.find(result => 
    result.subtitle === subtitle || result.title === title
  )
  
  return partialMatch || quizResults[quizResults.length - 1] // 기본값으로 마지막 결과 반환
} 