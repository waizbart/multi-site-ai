export interface Comment {
    id: string;
    name: string;
    initials: string;
    message: string;
    timeAgo: string;
}

// Base compacta de comentários - otimizada para performance
const compactComments = [
    ['Maria Silva', 'MS', 'Excelente artigo! Muito esclarecedor.', '2d'],
    ['João Santos', 'JS', 'Tópico relevante! Salvei nos favoritos.', '1d'],
    ['Ana Costa', 'AC', 'Perfeito! Era isso que procurava.', '12h'],
    ['Carlos Mendes', 'CM', 'Muito claro! Entendi perfeitamente.', '3d'],
    ['Fernanda Lima', 'FL', 'Adorei! Bem estruturado.', '1s'],
    ['Roberto Oliveira', 'RO', 'Interessante! Têm mais sobre isso?', '4h'],
    ['Juliana Pereira', 'JP', 'Ótimo conteúdo! Quero saber mais.', '2d'],
    ['Pedro Almeida', 'PA', 'Bom post! Aplica em outros casos?', '5d'],
    ['Camila Rodrigues', 'CR', 'Muito bom! Mais artigos assim?', '1d'],
    ['Lucas Ferreira', 'LF', 'Valioso! Onde encontro mais?', '3d'],
    ['Sandra Martins', 'SM', 'Útil! Tive situação similar.', '6h'],
    ['Thiago Souza', 'TS', 'Apliquei as dicas! Funcionou.', '2d'],
    ['Beatriz Cunha', 'BC', 'Confirmo a eficácia!', '1s'],
    ['Ricardo Barbosa', 'RB', 'Uso essas técnicas! Funcionam.', '4d'],
    ['Patrícia Neves', 'PN', 'Vou implementar no dia a dia.', '8h'],
    ['Marcos Ribeiro', 'MR', 'Obrigado! Faz diferença.', '1d'],
    ['Carla Dias', 'CD', 'Chegou na hora certa!', '3d'],
    ['Gustavo Moura', 'GM', 'Tornaram simples o complexo.', '2d'],
    ['Renata Torres', 'RT', 'Muito esclarecedor!', '5d'],
    ['Daniel Castro', 'DC', 'Exatamente o que procurava.', '1s'],
    ['Larissa Gomes', 'LG', 'Qualidade impecável!', '4h'],
    ['Felipe Cardoso', 'FC', 'Pesquisa impressionante!', '2d'],
    ['Vanessa Lopes', 'VL', 'Artigo fantástico!', '1d'],
    ['Anderson Silva', 'AS', 'Sempre informações valiosas.', '6d'],
    ['Cristina Araújo', 'CA', 'Análise impressionante!', '3d'],
    ['Rafael Campos', 'RC', 'Muito prático! Usando já.', '1d'],
    ['Aline Nascimento', 'AN', 'Posso aplicar no contexto.', '4d'],
    ['Bruno Machado', 'BM', 'Direto ao ponto!', '2d'],
    ['Isabela Freitas', 'IF', 'Vou usar imediatamente.', '5h'],
    ['Rodrigo Pinto', 'RP', 'Práticas que fazem diferença.', '1s'],
    ['Gabriela Ramos', 'GR', 'Timing perfeito!', '7h'],
    ['Leandro Correia', 'LC', 'Hora certa! Procurava isso.', '3d'],
    ['Mônica Reis', 'MR', 'Precisava dessa informação.', '1d'],
    ['Vinicius Lima', 'VL', 'Discutimos isso ontem!', '2d'],
    ['Priscila Andrade', 'PA', 'Momento ideal!', '4d'],
    ['Eduardo Monteiro', 'EM', 'Compartilhei com a equipe.', '1d'],
    ['Tatiana Farias', 'TF', 'Enviando para amigos.', '3d'],
    ['Marcelo Vieira', 'MV', 'Merece ser divulgado.', '2d'],
    ['Luciana Brito', 'LB', 'Salvei e compartilhei.', '5d'],
    ['Fábio Moreira', 'FM', 'Mandei para a família.', '1s'],
    ['Jéssica Teixeira', 'JT', 'Aprendi muito!', '6h'],
    ['Henrique Santos', 'HS', 'Nova perspectiva!', '2d'],
    ['Carolina Melo', 'CM', 'Sempre aprendo com vocês.', '4d'],
    ['Alexandre Costa', 'AC', 'Ampliou minha visão.', '1d'],
    ['Natália Rocha', 'NR', 'Lição valiosa!', '3d'],
    ['Diego Fernandes', 'DF', 'Explicação cristalina!', '1d'],
    ['Amanda Sousa', 'AS', 'Claro e objetivo!', '2d'],
    ['Claudio Pereira', 'CP', 'Linguagem acessível.', '5d'],
    ['Débora Nogueira', 'DN', 'Clareza total!', '4h'],
    ['Sérgio Cavalcanti', 'SC', 'Didático e completo.', '1s'],
    ['Raquel Duarte', 'RD', 'Sempre atualizados!', '3d']
];

// Função para expandir timestamp
const expandTime = (short: string): string => {
    const map: { [key: string]: string } = {
        '1d': 'há 1 dia', '2d': 'há 2 dias', '3d': 'há 3 dias',
        '4d': 'há 4 dias', '5d': 'há 5 dias', '6d': 'há 6 dias',
        '1s': 'há 1 semana', '4h': 'há 4 horas', '5h': 'há 5 horas',
        '6h': 'há 6 horas', '7h': 'há 7 horas', '8h': 'há 8 horas',
        '12h': 'há 12 horas'
    };
    return map[short] || 'há 1 dia';
};

// Gerar comentários no formato esperado
export const commentsDatabase: Comment[] = compactComments.map((c, i) => ({
    id: String(i + 1),
    name: c[0],
    initials: c[1],
    message: c[2],
    timeAgo: expandTime(c[3])
}));

// Função para gerar um número pseudoaleatório baseado em uma string (seed)
function seedRandom(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Converter para 32bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalizar para 0-1
}

// Função para embaralhar array usando algoritmo Fisher-Yates com seed
function shuffleArray<T>(array: T[], seed: string): T[] {
    const shuffled = [...array];
    let random = seedRandom(seed);

    for (let i = shuffled.length - 1; i > 0; i--) {
        // Gerar próximo número "aleatório" baseado no anterior
        random = (random * 9301 + 49297) % 233280;
        const j = Math.floor((random / 233280) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// Função principal para obter comentários aleatórios para um post (lazy loading)
export function getRandomCommentsForPost(postSlug: string): Comment[] {
    // Usar o slug como seed para garantir consistência
    const seed = postSlug;

    // Determinar quantidade de comentários (0-3)
    const random = seedRandom(seed + 'count');
    const commentCount = Math.floor(random * 4); // 0, 1, 2, ou 3

    if (commentCount === 0) {
        return [];
    }

    // Embaralhar comentários e pegar os primeiros N
    const shuffledComments = shuffleArray(commentsDatabase, seed);
    return shuffledComments.slice(0, commentCount);
} 