import { NextResponse } from 'next/server'

export async function GET() {
    const adsContent = `# ads.txt for financas.neostream.com.br
# Google AdSense
google.com, pub-6189411019780384, DIRECT, f08c47fec0942fa0

# Este arquivo certifica que temos autorização para monetizar este site
# Última atualização: ${new Date().toISOString().split('T')[0]}
`

    return new NextResponse(adsContent, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400', // Cache por 24 horas
        },
    })
}