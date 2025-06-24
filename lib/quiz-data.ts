// 퀴즈 질문 타입 정의
export interface Question {
    id: number
    text: string
    options: {
      id: string
      text: string
      scores: {
        category: string
        value: number
      }[]
    }[]
  }
  
  // 퀴즈 질문 데이터
  export const quizQuestions: Question[] = [
    {
      id: 1,
      text: "태어날 때 지정받은 성별이 나는...",
      options: [
        {
          id: "a",
          text: "별 생각 없는데? 그냥 이게 내 성별인 것 같아.",
          scores: [{ category: "gender_alignment", value: -1 }],
        },
        {
          id: "b",
          text: "가끔 이게 내 성별이 아닌 것 같다는 생각이 들 때가 있어.",
          scores: [{ category: "gender_alignment", value: 1 }],
        },
        {
          id: "c",
          text: "불편해. 이 몸과 성별은 내가 아닌 것 같을 때가 많아.",
          scores: [{ category: "gender_alignment", value: 2 }],
        },
      ],
    },
    {
      id: 2,
      text: "누군가 나를 지칭한다면, 나는 나를 \"______\"라고 지칭해주면 좋겠어.",
      options: [
        {
          id: "a",
          text: "그녀/She",
          scores: [{ category: "gender_alignment", value: -1 }],
        },
        {
          id: "b",
          text: "그/He",
          scores: [{ category: "gender_alignment", value: -1 }],
        },
        {
          id: "c",
          text: "그들/They 혹은 혼합형",
          scores: [{ category: "gender_alignment", value: 2 }],
        },
      ],
    },
    {
      id: 3,
      text: "내 성별을 내가 자유롭게 정할 수 있다면 나는...",
      options: [
        {
          id: "a",
          text: "그래도 그냥 이대로가 좋아.",
          scores: [{ category: "gender_alignment", value: -1 }],
        },
        {
          id: "b",
          text: "아마도 바꿀 수 있을 것 같아.",
          scores: [{ category: "gender_alignment", value: 2 }],
        },
      ],
    },
    {
      id: 4,
      text: "콩닥콩닥! 로맨틱한 끌림을 느끼는 정도를 표현하면 나는...",
      options: [
        {
          id: "a",
          text: "5",
          scores: [{ category: "romantic_attraction", value: 3 }],
        },
        {
          id: "b",
          text: "4",
          scores: [{ category: "romantic_attraction", value: 2 }],
        },
        {
          id: "c",
          text: "3",
          scores: [{ category: "romantic_attraction", value: 1 }],
        },
        {
            id: "d",
            text: "2",
            scores: [{ category: "romantic_attraction", value: -1 }],
        },
        {
            id: "e",
            text: "1",
            scores: [{ category: "romantic_attraction", value: -2 }],
        },
        {
            id: "f",
            text: "0",
            scores: [{ category: "romantic_attraction", value: -3 }],
        },
      ],
    },
    {
      id: 5,
      text: "어느날, 첫눈에 반한 상대가 나타났다. 그 상대는...",
      options: [
        {
          id: "a",
          text: "시원시원한 웃음이 매력적인 여성",
          scores: [{ category: "romantic_target", value: 1 }],
        },
        {
          id: "b",
          text: "따뜻한 배려가 몸에 벤 남성",
          scores: [{ category: "romantic_target", value: 2 }],
        },
        {
          id: "c",
          text: "내가 떨어뜨린 연필을 주워준... 누군가?",
          scores: [{ category: "romantic_target", value: 3 }],
        },
        {
            id: "d",
            text: "내 이상형에 딱 부합하는 외계인",
            scores: [{ category: "romantic_target", value: 4 }],
        },
        {
            id: "d",
            text: "그런것보다, 나는 내 취미가 더 좋아.",
            scores: [{ category: "romantic_target", value: 0 }],
        },
      ],
    },
    {
      id: 6,
      text: "성적 끌림을 나는...",
      options: [
        {
          id: "a",
          text: "자주 느낀다",
          scores: [{ category: "sexual_attraction", value: 2 }],
        },
        {
          id: "b",
          text: "가끔 느낀다",
          scores: [{ category: "sexual_attraction", value: 1 }],
        },
        {
          id: "c",
          text: "거의 느끼지 않는다",
          scores: [{ category: "sexual_attraction", value: -2 }],
        },
      ],
    },
    {
      id: 7,
      text: "왠지 얼굴이 뜨거워지게 만드는 누군가의 등장. 그 상대는...",
      options: [
        {
          id: "a",
          text: "향긋한 샴푸향을 남기고 간 여성",
          scores: [{ category: "romantic_target", value: 1 }],
        },
        {
          id: "b",
          text: "큰 키로 햇빛을 가려주는 남성",
          scores: [{ category: "romantic_target", value: 2 }],
        },
        {
          id: "c",
          text: "체육부의 에이스로 불리는 ... 누군가?",
          scores: [{ category: "romantic_target", value: 3 }],
        },
        {
            id: "d",
            text: "내 이상형에 딱 부합하는 외계인",
            scores: [{ category: "romantic_target", value: 4 }],
        },
        {
            id: "d",
            text: "그런것보다, 나는 내 취미가 더 좋아.",
            scores: [{ category: "romantic_target", value: 0 }],
        },
      ],
    },
    {
      id: 8,
      text: "일상에서 내가 즐겨 입는 옷은...",
      options: [
        {
          id: "a",
          text: "페미닌, 매니쉬 룩으로 불리는 옷들",
          scores: [{ category: "expression", value: -1 }],
        },
        {
          id: "b",
          text: "요즘은 유니섹스가 대세야! 중성적이고 펑퍼짐한 옷들",
          scores: [{ category: "expression", value: 2 }],
        },
      ],
    },
    {
      id: 9,
      text: "성별을 넘나드는 표현(예: 코스프레, 분장)에 대해...",
      options: [
        {
          id: "a",
          text: "흥미롭고 즐거워!",
          scores: [{ category: "expression", value: 2 }],
        },
        {
          id: "b",
          text: "그럴 수도 있지 뭐.",
          scores: [{ category: "expression", value: 0 }],
        },
        {
          id: "c",
          text: "나는 안입을래.",
          scores: [{ category: "expression", value: -1 }],
        },
      ],
    },
    {
        id: 10,
        text: "나는 동시에 여러 사람에게 호감이나 사랑을 느껴본 적이...",
        options: [
          {
            id: "a",
            text: "있다.",
            scores: [{ category: "relationship_openness", value: 1 }],
          },
          {
            id: "b",
            text: "없다.",
            scores: [{ category: "relationship_openness", value: 0 }],
          },
        ],
      },
  ]
  