import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL이 필요합니다.' },
        { status: 400 }
      )
    }

    // WebFetch 도구와 유사한 방식으로 URL에서 콘텐츠 가져오기
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error('페이지를 가져올 수 없습니다.')
    }

    const html = await response.text()
    
    // HTML 파싱을 위한 간단한 정규식 사용
    let title = ''
    let content = ''
    let author = ''
    let publishDate = ''

    // 제목 추출
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
    if (titleMatch) {
      title = titleMatch[1].replace(/&[^;]+;/g, '').trim()
      // 뉴스 사이트 이름 제거
      title = title.replace(/\s*-\s*[^-]*$/, '').trim()
    }

    // 기사 내용 추출 (여러 패턴 시도)
    const contentPatterns = [
      /<div[^>]*class="[^"]*article[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<div[^>]*class="[^"]*content[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<article[^>]*>(.*?)<\/article>/gis,
      /<p[^>]*>(.*?)<\/p>/gi
    ]

    for (const pattern of contentPatterns) {
      const matches = [...html.matchAll(pattern)]
      if (matches.length > 0) {
        content = matches
          .map(match => match[1])
          .join(' ')
          .replace(/<[^>]*>/g, '') // HTML 태그 제거
          .replace(/&[^;]+;/g, '') // HTML 엔티티 제거
          .replace(/\s+/g, ' ') // 연속 공백 정리
          .trim()
        
        if (content.length > 100) { // 충분한 내용이 있으면 중단
          break
        }
      }
    }

    // 작성자 추출
    const authorPatterns = [
      /기자\s*([가-힣]+)/,
      /작성자[:\s]*([가-힣]+)/,
      /By\s+([가-힣\s]+)/i,
      /<span[^>]*class="[^"]*author[^"]*"[^>]*>([^<]+)</i,
      /<div[^>]*class="[^"]*writer[^"]*"[^>]*>([^<]+)</i
    ]

    for (const pattern of authorPatterns) {
      const match = html.match(pattern)
      if (match) {
        author = match[1].trim()
        break
      }
    }

    // 날짜 추출
    const datePatterns = [
      /(\d{4})-(\d{2})-(\d{2})/,
      /(\d{4})\.(\d{2})\.(\d{2})/,
      /(\d{4})\/(\d{2})\/(\d{2})/,
      /<time[^>]*datetime="([^"]*)"[^>]*>/i,
      /<span[^>]*class="[^"]*date[^"]*"[^>]*>([^<]*)</i
    ]

    for (const pattern of datePatterns) {
      const match = html.match(pattern)
      if (match) {
        if (match[1] && match[2] && match[3]) {
          publishDate = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`
        } else if (match[1]) {
          const dateStr = match[1].split('T')[0] // datetime에서 날짜 부분만
          if (dateStr.match(/\d{4}-\d{2}-\d{2}/)) {
            publishDate = dateStr
          }
        }
        
        if (publishDate) break
      }
    }

    // 기본값 설정
    if (!title) title = '크롤링된 기사'
    if (!content) content = '기사 내용을 수동으로 입력해주세요.'
    if (!author) author = '뉴스 기사'
    if (!publishDate) publishDate = new Date().toISOString().split('T')[0]

    return NextResponse.json({
      success: true,
      title,
      content: content.substring(0, 2000), // 내용 길이 제한
      author,
      publishDate
    })

  } catch (error) {
    console.error('크롤링 오류:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '기사 정보를 가져오는데 실패했습니다.' 
      },
      { status: 500 }
    )
  }
}